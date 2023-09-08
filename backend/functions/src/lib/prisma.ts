import { PrismaClient } from '@prisma/client';

class Prisma {
  private static _prisma: Prisma;
  private _app;

  private constructor() {
    this._app = new PrismaClient();
  }

  public static get Instance() {
    return this._prisma || new Prisma();
  }

  public get db() {
    return this._app;
  }
}

export default Prisma;
