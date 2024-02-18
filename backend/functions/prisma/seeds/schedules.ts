import { data } from './data/schedules.json';
import Prisma from '../../src/lib/prisma';

const main = async () => {
  try {
    await Prisma.Instance.db.routes.deleteMany({ where: {} });

    await Prisma.Instance.db.routes.createMany({ data: data as any });
  } catch (error) {
    console.log('error occured in schedules', error);
  } finally {
    console.log('product schedules successful...');
    await Prisma.Instance.db.$disconnect();
  }
};

export default main;
