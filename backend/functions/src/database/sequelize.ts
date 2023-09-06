import type { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  database: process.env.DB_NAME as string,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USER as string,
  pool: {
    max: 1,
  },
  password: process.env.DB_PASS as string,
  models: ['./models/*.ts'],
});

connection
  .authenticate()
  .then(() => console.log(`connected to db...`))
  .catch((err) => console.log('db connection err...', err));
