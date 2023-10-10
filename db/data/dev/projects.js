const fs = require('fs');
const path = require('path');

const projectData = [
  {
    slug: 'carbon-intensity-data',
    createdAt: '2023-07-11T12:13:46.836Z',
    isFeatured: false,
    title: 'Carbon Intensity Data',
    description:
      'A webpage that fetches data from an external api, and displays the results using a third party graph rendering module',
    imgUrl: 'https://i.ibb.co/HXndgdh/carbon-intensity-data.png',
    imgAlt: 'Bar graph of actual and forecast carbon levels in the UK',
    liveLink: 'https://carbon-intensity-data.netlify.app/',
    githubLink:
      'https://github.com/robert-matthew-brooks/carbon-intensity-data',
    languageIds: [5, 6, 7],
    votes: [{ ip: '192.168.1.1', value: 1 }],
  },
  {
    slug: 'backend-nc-news',
    createdAt: '2023-06-30T18:11:01.487Z',
    isFeatured: true,
    title: 'NC-News Backend API',
    description:
      'An api which mimics a real world backend service for a news/blog website, which provides information to frontend architecture',
    imgUrl: 'https://i.ibb.co/t2vHVnC/backend-nc-news.png',
    imgAlt: 'JSON object in Insomnia',
    liveLink: 'https://be-nc-news-nvms.onrender.com/api',
    githubLink: 'https://github.com/robert-matthew-brooks/be-nc-news',
    languageIds: [1, 2, 3, 4],
    votes: [
      { ip: '192.168.1.1', value: 1 },
      { ip: '192.168.1.2', value: 1 },
      { ip: '192.168.1.3', value: 1 },
      { ip: '192.168.1.4', value: 1 },
    ],
  },
  {
    slug: 'frontend-nc-news',
    createdAt: '2023-07-21T13:51:04.186Z',
    isFeatured: true,
    title: 'NC-News Frontend Website',
    description:
      'A Reddit style social news hub featuring user-curated ratings and a comments',
    imgUrl: 'https://i.ibb.co/FBBwGy7/frontend-nc-news.jpg',
    imgAlt: 'NC-News website',
    liveLink: 'https://frontend-nc-news.netlify.app/',
    githubLink: 'https://github.com/robert-matthew-brooks/fe-nc-news',
    languageIds: [5, 6, 7],
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
    createdAt: '2023-09-12T20:28:09.186Z',
    isFeatured: false,
    title: 'Kata: Sum Consecutive Duplicates',
    description:
      'A solution to an array manipulation problem featuring an animated CSS gui',
    imgUrl: 'https://i.ibb.co/7bysbQF/sum-consecutive-duplicates.jpg',
    imgAlt: 'VS code on screen',
    liveLink: 'https://sum-consecutive-duplicates.onrender.com/frontend/',
    githubLink:
      'https://github.com/robert-matthew-brooks/sum-consecutive-duplicates',
    languageIds: [1, 6, 7, 4],
    votes: [
      { ip: '192.168.1.1', value: 1 },
      { ip: '192.168.1.2', value: 1 },
      { ip: '192.168.1.3', value: 1 },
    ],
  },
  {
    slug: 'counter-intelligence',
    createdAt: '2023-10-04T15:44:38.598Z',
    isFeatured: false,
    title: 'Kata: Counter Intelligence',
    description:
      'A text processing algorithm that interprets encoded strings with an animated interface',
    imgUrl: 'https://i.ibb.co/d2ynHWw/counter-intelligence.png',
    imgAlt: 'Secret text being decoded',
    liveLink:
      'https://htmlpreview.github.io/?https://github.com/robert-matthew-brooks/counter-intelligence/blob/main/frontend/index.html',
    githubLink: 'https://github.com/robert-matthew-brooks/counter-intelligence',
    languageIds: [1, 6, 7, 4],
    votes: [
      { ip: '192.168.1.1', value: 1 },
      { ip: '192.168.1.2', value: 1 },
    ],
  },
  {
    slug: 'supermarket-queue',
    createdAt: '2023-10-05T21:31:39.704Z',
    isFeatured: false,
    title: 'Kata: Supermarket Queue',
    description:
      'A simulation of customers being served at tills, with the aim of calculating the total waiting time for a given state',
    imgUrl: 'https://i.ibb.co/ZmLCJWQ/supermarket-queue.png',
    imgAlt: 'CLI output of Python3 script',
    liveLink: 'https://replit.com/@robertmatthewbrooks/supermarket-queue',
    githubLink: 'https://github.com/robert-matthew-brooks/supermarket-queue',
    languageIds: [8],
    votes: [{ ip: '192.168.1.1', value: 1 }],
  },
  {
    slug: 'cypress-login-test',
    createdAt: '2023-10-10T14:24:50.297Z',
    isFeatured: false,
    title: 'Login Page Automation Test',
    description:
      'A test framework for a frontend login page, which performs a series of positive and negative tests to ensure the login page provides the desired user experience.',
    imgUrl: 'https://i.ibb.co/Z82hXmD/cypress-login-test.png',
    imgAlt: 'Cypress running an automated test framework',
    githubLink: 'https://github.com/robert-matthew-brooks/cypress-login-test',
    languageIds: [9],
    votes: [],
  },
];

for (const project of projectData) {
  project.body = fs
    .readFileSync(path.resolve(__dirname, `./projects/${project.slug}-body`))
    .toString();
}

module.exports = { projectData };
