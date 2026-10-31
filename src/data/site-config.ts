import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://othinusg.github.io',
    title: 'OthinusG',
    subtitle: 'Notes on research, code, and building things',
    description: 'Personal blog and project notebook by OthinusG.',
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'GitHub',
            href: 'https://github.com/OthinusG'
        }
    ],
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/OthinusG'
        }
    ],
    hero: {
        title: "Hi, I'm OthinusG.",
        text: 'I write about **materials chemistry**, **machine learning**, and **software development**, along with notes from the things I build.\n\nThis is my corner of the web for research notes, project updates, and experiments.',
        actions: [
            {
                text: 'Read the blog',
                href: '/blog'
            },
            {
                text: 'About me',
                href: '/about'
            }
        ]
    },
    subscribe: {
        enabled: false
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
