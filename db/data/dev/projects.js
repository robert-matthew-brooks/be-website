const fs = require('fs');
const path = require('path');

const projectData = [
  {
    slug: 'carbon-intensity-data',
    created_at: '2023-07-11T12:13:46.836Z',
    title: 'Carbon Intensity Data',
    description:
      'A webpage that fetches data from an external api, and displays the results using a third party graph rendering module',
    img_url: 'https://i.ibb.co/HXndgdh/carbon-intensity-data.png',
    img_alt: 'Bar graph of actual and forecast carbon levels in the UK',
    live_link: 'https://carbon-intensity-data.netlify.app/',
    github_link:
      'https://github.com/robert-matthew-brooks/carbon-intensity-data',
    language_ids: [5, 6, 7],
    votes: [{ ip: '192.168.1.1', value: 1 }],
  },
  {
    slug: 'backend-nc-news',
    created_at: '2023-06-30T18:11:01.487Z',
    title: 'NC-News Backend API',
    description:
      'An api which mimics a real world backend service for a news/blog website, which provides information to frontend architecture',
    img_url: 'https://i.ibb.co/t2vHVnC/backend-nc-news.png',
    img_alt: 'JSON object in Insomnia',
    live_link: 'https://be-nc-news-nvms.onrender.com/api',
    github_link: 'https://github.com/robert-matthew-brooks/be-nc-news',
    language_ids: [1, 2, 3, 4],
    votes: [
      { ip: '192.168.1.1', value: 1 },
      { ip: '192.168.1.2', value: 1 },
      { ip: '192.168.1.3', value: 1 },
      { ip: '192.168.1.4', value: 1 },
    ],
  },
  {
    slug: 'frontend-nc-news',
    created_at: '2023-07-21T13:51:04.186Z',
    title: 'NC-News Frontend Website',
    description:
      'A Reddit style social news hub featuring user-curated ratings and a comments',
    img_url: 'https://i.ibb.co/FBBwGy7/frontend-nc-news.jpg',
    img_alt: 'NC-News website',
    live_link: 'https://frontend-nc-news.netlify.app/',
    github_link: 'https://github.com/robert-matthew-brooks/fe-nc-news',
    language_ids: [5, 6, 7],
    votes: [
      { ip: '192.168.1.1', value: 1 },
      { ip: '192.168.1.2', value: 1 },
      { ip: '192.168.1.3', value: 1 },
      { ip: '192.168.1.4', value: 1 },
      { ip: '192.168.1.5', value: 1 },
    ],
  },
  {
    slug: 'sum-consecutive-duplicates',
    created_at: '2023-09-12T20:28:09.186Z',
    title: 'Kata: Sum Consecutive Duplicates',
    description:
      'A solution to an array manipulation problem featuring an animated CSS gui',
    img_url: 'https://i.ibb.co/7bysbQF/sum-consecutive-duplicates.jpg',
    img_alt: 'VS code on screen',
    live_link: 'https://sum-consecutive-duplicates.onrender.com/frontend/',
    github_link:
      'https://github.com/robert-matthew-brooks/sum-consecutive-duplicates',
    language_ids: [1, 6, 7, 4],
    votes: [
      { ip: '192.168.1.1', value: 1 },
      { ip: '192.168.1.2', value: 1 },
      { ip: '192.168.1.3', value: 1 },
    ],
  },
  {
    slug: 'counter-intelligence',
    created_at: '2023-10-04T15:44:38.598Z',
    title: 'Kata: Counter Intelligence',
    description:
      'A text processing algorithm that interprets encoded strings with an animated interface',
    img_url: 'https://i.ibb.co/d2ynHWw/counter-intelligence.png',
    img_alt: 'Secret text being decoded',
    live_link:
      'https://htmlpreview.github.io/?https://github.com/robert-matthew-brooks/counter-intelligence/blob/main/frontend/index.html',
    github_link:
      'https://github.com/robert-matthew-brooks/counter-intelligence',
    language_ids: [1, 6, 7, 4],
    votes: [
      { ip: '192.168.1.1', value: 1 },
      { ip: '192.168.1.2', value: 1 },
    ],
  },
  {
    slug: 'supermarket-queue',
    created_at: '2023-10-05T21:31:39.704Z',
    title: 'Kata: Supermarket Queue',
    description:
      'A simulation of customers being served at tills, with the aim of calculating the total waiting time for a given state',
    img_url: 'https://i.ibb.co/ZmLCJWQ/supermarket-queue.png',
    img_alt: 'CLI output of Python3 script',
    live_link: 'https://replit.com/@robertmatthewbrooks/supermarket-queue',
    github_link: 'https://github.com/robert-matthew-brooks/supermarket-queue',
    language_ids: [8],
    votes: [{ ip: '192.168.1.1', value: 1 }],
  },
  {
    slug: 'cypress-login-test',
    created_at: '2023-10-10T14:24:50.297Z',
    title: 'Login Page Automation Test',
    description:
      'A test framework for a frontend login page, which performs a series of positive and negative tests to ensure the login page provides the desired user experience.',
    img_url: 'https://i.ibb.co/Z82hXmD/cypress-login-test.png',
    img_alt: 'Cypress running an automated test framework',
    github_link: 'https://github.com/robert-matthew-brooks/cypress-login-test',
    language_ids: [9],
    votes: [],
  },
];

for (const project of projectData) {
  project.body = fs
    .readFileSync(path.resolve(__dirname, `./projects/${project.slug}-body`))
    .toString();
}

module.exports = { projectData };
