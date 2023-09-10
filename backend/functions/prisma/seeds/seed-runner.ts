import { default as productsRunner } from './products';

(async () => {
  try {
    await Promise.all([productsRunner()]);
  } catch (error) {
    console.log('error occured', error);
  }
})();
