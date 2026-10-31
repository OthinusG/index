import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import siteConfig from '../data/site-config.ts';
import { sortItemsByDateDesc } from '../utils/data-utils.ts';
import { withBase } from '../utils/path-utils.ts';

export async function GET(context) {
    const posts = (await getCollection('blog')).sort(sortItemsByDateDesc);
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: new URL(withBase('/'), context.site),
        items: posts.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: withBase(`/blog/${item.id}/`),
            pubDate: item.data.publishDate
        }))
    });
}
