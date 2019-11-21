import cheerio            from 'cheerio';
import { getPageContent } from '../helpers/puppeteer';
import { getTar }         from '../helpers/common';
import saver              from './saver';
import chalk              from 'chalk';


export const getTariffs = async (site) => {
  try {
    const pageContent = await getPageContent(site);
    let $ = cheerio.load(pageContent);
    const powTbl = $('.table-responsive-wrapp:nth-of-type(4)');
    const watTbl = $('.table-responsive-wrapp:nth-of-type(2)');
    
    let tariffs;
    let power = {};
    let water;
    
    for (let i = 11, j = 1; i <= 13; ++i, ++j) {
      const t = getTar(powTbl, i, 4);
      power = { ...power, [`t${ j }`]: t };
    }
    
    let hw = {};
    let cw = {};
    let drainage = {};
    
    hw.min = getTar(watTbl, 9, 3);
    hw.max = getTar(watTbl, 9, 4);
    
    cw.min = getTar(watTbl, 28, 3);
    cw.max = getTar(watTbl, 28, 4);
    
    drainage.min = getTar(watTbl, 29, 3);
    drainage.max = getTar(watTbl, 29, 4);
    
    water = { hw, cw, drainage };
    
    tariffs = { code: 'tariffs', power, water };
    
    await saver(tariffs);
    
  } catch (err) {
    console.log(chalk.red('An error has occurred \n'));
    console.log(err);
  }
};
