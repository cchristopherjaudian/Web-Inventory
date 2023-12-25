import { OrderStatuses, PaymentMethods, PaymentStatuses } from '@prisma/client';
import {
  BadRequestError,
  NotFoundError,
  ResourceConflictError,
} from '../lib/custom-errors/class-errors';
import {
  TOrderPayload,
  TOrderStatus,
  TOrderWithoutItems,
} from '../lib/types/order-types';
import moment from 'moment-timezone';
import { getStockIndicator } from '../helpers/stock-indicator';
import { TPrismaClient } from '../lib/prisma';

class OrderService {
  private _db: TPrismaClient;
  private _defaultOrderStatus = {
    orderStatus: {
      create: {
        status: OrderStatuses.PREPARING,
        isCurrent: true,
      },
    },
  };
  private _defaultOrderParams = {
    include: {
      orderItems: {
        include: {
          products: true,
        },
      },
      orderStatus: {
        include: {
          profile: {
            include: {
              account: true,
            },
          },
        },
      },
      profile: {
        include: {
          account: true,
        },
      },
    },
  };

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async createOrder(payload: TOrderPayload) {
    let paymentStatus = PaymentStatuses.PROCESSING as PaymentStatuses;
    if (
      [PaymentMethods.BANK_TRANSFER, PaymentMethods.GCASH].includes(
        payload.paymentMethod as 'GCASH' | 'BANK_TRANSFER'
      )
    ) {
      paymentStatus = PaymentStatuses.PENDING;
    }

    let paymentDeadline = null;
    if (payload.paymentMethod === PaymentMethods.PAY_LATER) {
      paymentDeadline = moment(new Date())
        .tz('Asia/Manila')
        .add(30, 'days')
        .format();
    }

    const mappedItems = await Promise.all(
      payload.items.map(async (item) => {
        const cart = await this._db.cart.findUnique({
          where: { id: item.cartId },
        });
        if (!cart) throw new NotFoundError('Cart does not exists.');

        const inventories = await this._db.inventory.findMany({
          where: {
            productId: item.productId,
          },
          orderBy: [
            {
              expiration: 'asc',
            },
          ],
        });

        if (inventories.length === 0) {
          throw new BadRequestError('Insufficient stock.');
        }

        const stockTotal = inventories.reduce(
          (acc, curr) => acc + curr.stock,
          0
        );
        if (cart.quantity > stockTotal) {
          throw new BadRequestError('Insufficient stock.');
        }
        let currentQuantity = cart.quantity;
        inventories.every(async (inventory) => {
          const currentStock = Math.max(inventory.stock - currentQuantity, 0);
          currentQuantity = Math.max(currentQuantity - inventory.stock, 0);

          inventory.stock = currentStock;
          inventory.stockIndicator = getStockIndicator(currentStock);
          await this._db.inventory.update({
            where: {
              id: inventory.id,
            },
            data: { ...inventory },
          });

          if (currentQuantity === 0) {
            return false;
          }

          return true;
        });

        // deletes cart if not flagged as save
        !cart.saved && (await this._db.cart.delete({ where: { id: cart.id } }));

        return {
          productId: item.productId,
          quantity: cart.quantity,
        };
      })
    );

    console.log('payload', payload);
    return this._db.orders.create({
      data: {
        profile: {
          connect: {
            id: payload.profileId as string,
          },
        },
        paymentMethod: payload.paymentMethod,
        paymentUrl: payload.paymentUrl || null,
        refNo: payload.refNo || null,
        status: paymentStatus,
        paymentDeadline,
        quotationUrl: payload.quotationUrl || null,
        orderItems: {
          createMany: {
            data: mappedItems,
          },
        },
        ...(paymentStatus !== PaymentStatuses.PENDING &&
          this._defaultOrderStatus),
      },
    });
  }

  public async cancelOrder(id: string) {
    const hasOrder = await this._db.orders.findUnique({
      where: { id },
    });
    if (!hasOrder) {
      throw new NotFoundError('Order does not exists.');
    }

    if (hasOrder.status !== PaymentStatuses.PENDING) {
      throw new BadRequestError('error on cancellation.');
    }

    return this._db.orders.update({
      where: { id },
      data: { status: PaymentStatuses.CANCELLED },
    });
  }

  public async createOrderStatus(
    payload: TOrderStatus & { createdAt: Date; orderStatusId?: string }
  ) {
    const hasOrder = await this._db.orders.findFirst({
      where: { id: payload.orderId },
    });
    if (!hasOrder) {
      throw new NotFoundError('Order does not exists.');
    }
    const hasOrderStatus = await this._db.orderStatus.findFirst({
      where: {
        orders: {
          id: payload.orderId,
        },
        status: payload.status,
      },
    });
    if (hasOrderStatus) {
      throw new ResourceConflictError('Order status already exists.');
    }

    payload.createdAt = moment(payload.createdAt).tz('Asia/Manila').toDate();

    if (payload.orderStatusId) {
      await this._db.orderStatus.update({
        where: {
          id: payload.orderStatusId,
        } as any,
        data: { isCurrent: false },
      });
    }
    if (payload?.orderStatusId) {
      delete payload.orderStatusId;
    }
    return this._db.orderStatus.create({
      data: { ...payload, isCurrent: true },
    });
  }

  public async updateOrder(id: string, payload: Partial<TOrderWithoutItems>) {
    const hasOrder = await this._db.orders.findFirst({
      where: { id },
    });
    if (!hasOrder) {
      throw new NotFoundError('Order does not exists.');
    }

    return this._db.orders.update({
      where: { id },
      data: payload,
    });
  }

  public async endUserOrders(profileId?: string) {
    const params = {
      where: { profileId },
      ...this._defaultOrderParams,
    };
    return this._db.orders.findMany(params);
  }

  public async adminOrders() {
    const params = {
      ...this._defaultOrderParams,
    };
    return this._db.orders.findMany(params);
  }

  public async getOrder(id: string) {
    return this._db.orders.findFirst({
      where: { id },
      ...this._defaultOrderParams,
    });
  }

  public async ordersTxn() {
    const transactions = await this._db.orders.findMany({
      where: {
        status: PaymentStatuses.PAID,
      },
      include: {
        orderItems: {
          include: {
            products: true,
          },
        },
        orderStatus: true,
      },
    });

    if (transactions.length === 0) return [];

    const mappedTransactions = transactions.map((txn) => {
      const sumProducts = txn.orderItems.reduce(
        (acc, item) => {
          acc.amount = <any>item.products?.price * item.quantity;
          acc.quantity = acc.quantity + item.quantity;
          return acc;
        },
        { amount: 0, quantity: 0 }
      );

      const dispatchedDate = txn.orderStatus.find(
        (order) => order.status === OrderStatuses.DISPATCHED
      );
      const dateDelivered = txn.orderStatus.find(
        (order) => order.status === OrderStatuses.DELIVERED
      );
      return {
        orderId: txn.id,
        dateOrdered: txn.createdAt,
        paymentMethod: txn.paymentMethod,
        itemsCount: sumProducts.quantity,
        totalPrice: sumProducts.amount,
        dispatchedDate: dispatchedDate?.createdAt || null,
        dateDelivered: dateDelivered?.createdAt || null,
      };
    });

    return mappedTransactions;
  }
}

export default OrderService;
