import { data } from './data/oxiaire-products.json';
import Prisma from '../../src/lib/prisma';

const main = async () => {
  try {
    await Prisma.Instance.db.products.deleteMany({ where: {} });

    await Prisma.Instance.db.products.createMany({ data });
  } catch (error) {
    console.log('error occured in products', error);
  } finally {
    console.log('product seed successful...');
    await Prisma.Instance.db.$disconnect();
  }
};

export default main;
