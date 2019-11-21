import cheerio     from 'cheerio';
import chalk       from 'chalk';
import { slugify } from 'transliteration';

import { arrayFromLength } from './helpers/common';
import { getPageContent }  from './helpers/puppeteer';
import listItemsHandler    from './handlers/listItemsHandler';
import { getTariffs }      from './handlers/tariffsHandler';

const SITE_1 = 'https://www.mos.ru/depr/function/tarifnaya-politika/tarify-na-zhilishno-kommunalnye-uslugi-dlya-zhitelei-moskvy-na-2019-god/';
const SITE_2 = 'https://auto.ru/catalog/cars/all/?page_num=';
const pages = 1;


const getCars = async () => {
  try {
    for (const page of arrayFromLength(pages)) {
      const url = `${ SITE_2 }${ page }`;
      const pageContent = await getPageContent(url);
      const $ = cheerio.load(pageContent);
      const carsItems = [];
      
      $('.mosaic__title').each((i, header) => {
        const url = $(header).attr('href');
        const title = $(header).text();
        
        carsItems.push({
          url,
          title,
          code: slugify(title),
        });
      });
      await listItemsHandler(carsItems);
      
    }
  } catch (err) {
    console.log(chalk.red('An error has occurred \n'));
    console.log(err);
  }
};


getTariffs(SITE_1);
