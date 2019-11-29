import cheerio            from 'cheerio';
import { getPageContent } from '../helpers/puppeteer';

const SITE = `https://vk.com/hidemy_name_keys`;

export const getVPNKeys = async () => {
  try {
    const pageContent = await getPageContent(SITE);
    const $ = cheerio.load(pageContent);
    const firstPost = $('#page_wall_posts div:first-of-type');
    
    const date = firstPost
      .find('.post_date')
      .first()
      .text();
    
    const keys = firstPost
      .find('.wall_post_text')
      .first()
      .text()
      .match(/\d{14}/g);
    
    console.log(date);
    console.log(keys);
    
  } catch (err) {
    throw err;
  }
};
