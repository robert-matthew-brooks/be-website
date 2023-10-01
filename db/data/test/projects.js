const projectData = [
  {
    slug: 'proj-1',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 1',
    description: 'description of project 1',
    video_url: 'some_url.com/video_1',
    live_link: 'some_url.com/project_1',
    github_link: 'github.com/project_1',
    body: 'some text describing project 1',
    language_ids: [1, 2, 3],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-2',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 2',
    description: 'description of project 2',
    img_url: 'some_image_2.jpg',
    img_alt: 'some image 2',
    live_link: 'some_url.com/project_2',
    body: 'some text describing project 2',
    language_ids: [4, 5, 6],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-3',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 3',
    description: 'description of project 3',
    img_url: 'some_image_3.jpg',
    img_alt: 'some image 3',
    video_url: 'some_url.com/video_3',
    live_link: 'some_url.com/project_3',
    body: 'some text describing project 3',
    language_ids: [7, 8, 9],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-4',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 4',
    description: 'description of project 4',
    live_link: 'some_url.com/project_4',
    body: 'some text describing project 4',
    language_ids: [10, 1, 2],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-5',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 5',
    description: 'description of project 5',
    img_url: 'some_image_5.jpg',
    img_alt: 'some image 5',
    video_url: 'some_url.com/video_5',
    live_link: 'some_url.com/project_5',
    github_link: 'github.com/project_5',
    body: 'some text describing project 5',
    language_ids: [3, 4, 5],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-6',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 6',
    description: 'description of project 6',
    live_link: 'some_url.com/project_6',
    body: 'some text describing project 6',
    language_ids: [6, 7, 8],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-7',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 7',
    description: 'description of project 7',
    img_url: 'some_image_7.jpg',
    img_alt: 'some image 7',
    video_url: 'some_url.com/video_7',
    live_link: 'some_url.com/project_7',
    body: 'some text describing project 7',
    language_ids: [9, 10, 1],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-8',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 8',
    description: 'description of project 8',
    img_url: 'some_image_8.jpg',
    img_alt: 'some image 8',
    live_link: 'some_url.com/project_8',
    github_link: 'github.com/project_8',
    body: 'some text describing project 8',
    language_ids: [2, 3, 4],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-9',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 9',
    description: 'description of project 9',
    img_url: 'some_image_9.jpg',
    img_alt: 'some image 9',
    video_url: 'some_url.com/video_9',
    live_link: 'some_url.com/project_9',
    body: 'some text describing project 9',
    language_ids: [5, 6, 7],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-10',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 10',
    description: 'description of project 10',
    live_link: 'some_url.com/project_10',
    body: 'some text describing project 10',
    language_ids: [8, 9, 10],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-11',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 11',
    description: 'description of project 11',
    img_url: 'some_image_11.jpg',
    img_alt: 'some image 11',
    video_url: 'some_url.com/video_11',
    live_link: 'some_url.com/project_11',
    github_link: 'github.com/project_11',
    body: 'some text describing project 11',
    language_ids: [1, 2, 3],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-12',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 12',
    description: 'description of project 12',
    img_url: 'some_image_12.jpg',
    img_alt: 'some image 12',
    live_link: 'some_url.com/project_12',
    github_link: 'github.com/project_12',
    body: 'some text describing project 12',
    language_ids: [4, 5, 6],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-13',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 13',
    description: 'description of project 13',
    img_url: 'some_image_13.jpg',
    img_alt: 'some image 13',
    video_url: 'some_url.com/video_13',
    live_link: 'some_url.com/project_13',
    body: 'some text describing project 13',
    language_ids: [7, 8, 9],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-14',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 14',
    description: 'description of project 14',
    img_url: 'some_image_14.jpg',
    img_alt: 'some image 14',
    live_link: 'some_url.com/project_14',
    github_link: 'github.com/project_4',
    body: 'some text describing project 14',
    language_ids: [10, 1, 2],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-15',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 15',
    description: 'description of project 15',
    img_url: 'some_image_15.jpg',
    img_alt: 'some image 15',
    video_url: 'some_url.com/video_15',
    live_link: 'some_url.com/project_15',
    body: 'some text describing project 15',
    language_ids: [3, 4, 5],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-16',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 16',
    description: 'description of project 16',
    live_link: 'some_url.com/project_16',
    body: 'some text describing project 16',
    language_ids: [6, 7, 8],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-17',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 17',
    description: 'description of project 17',
    img_url: 'some_image_17.jpg',
    img_alt: 'some image 17',
    video_url: 'some_url.com/video_17',
    live_link: 'some_url.com/project_17',
    body: 'some text describing project 17',
    language_ids: [9, 10, 1],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-18',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 18',
    description: 'description of project 18',
    img_url: 'some_image_18.jpg',
    img_alt: 'some image 18',
    live_link: 'some_url.com/project_18',
    body: 'some text describing project 18',
    language_ids: [2, 3, 4],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-19',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 19',
    description: 'description of project 19',
    video_url: 'some_url.com/video_19',
    live_link: 'some_url.com/project_19',
    github_link: 'github.com/project_19',
    body: 'some text describing project 19',
    language_ids: [5, 6, 7],
    liked_ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3'],
  },
  {
    slug: 'proj-20',
    created_at: new Date(Date.now()).toUTCString(),
    title: 'project 20',
    description: 'description of project 20',
    img_url: 'some_image_20.jpg',
    img_alt: 'some image 20',
    live_link: 'some_url.com/project_20',
    body: 'some text describing project 20',
    language_ids: [],
    liked_ips: [],
  },
];

module.exports = { projectData };
