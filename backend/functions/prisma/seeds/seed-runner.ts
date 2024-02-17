import { default as productSeeder } from './products';
import { default as scheduleSeeder } from './schedules';

(async () => {
  try {
    await Promise.all([productSeeder(), scheduleSeeder()]);
  } catch (error) {
    console.log('error occured', error);
  }
})();
