import cheerio from 'cheerio';
import chalk   from 'chalk';

import { getPageContent } from '../helpers/puppeteer';
import { formatPeriod }   from '../helpers/common';
import { formatPrice }    from '../helpers/common';
import saveData           from './saver';

export default async function listItemsHandler(data) {
  try {
    for (const initialData of data) {
      console.log(chalk.green('Getting data from: ') + chalk.green.bold(initialData.url));
      
      const detailContent = await getPageContent(initialData.url);
      const $ = cheerio.load(detailContent);
      
      let period = $('.catalog-generation-summary__desc_period')
       .clone()
       .children()
       .remove()
       .end()
       .text();
      
      const priceNewStr = $(
       '.catalog-generation-summary__info .catalog-generation-summary__desc:nth-of-type(2)',
      ).text();
      
      const priceWithMileageStr = $(
       '.catalog-generation-summary__info .catalog-generation-summary__desc:nth-of-type(3)',
      ).text();
      
      let priceNew = priceNewStr ? formatPrice(priceNewStr) : null;
      let priceWithMileage = priceWithMileageStr ? formatPrice(priceWithMileageStr) : null;
      period = formatPeriod(period);
      
      if (!priceWithMileageStr && priceNewStr) {
        priceWithMileage = priceNew;
        priceNew = null;
      }
      
      await saveData({
        ...initialData,
        priceNew,
        priceWithMileage,
        period,
      });
      
    }
  } catch (err) {
    throw err;
  }
}
