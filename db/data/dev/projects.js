const projectData = [
  {
    created_at: '2023-06-30T18:11:01.487Z',
    title: 'NC-News Backend API',
    slug: 'nc-news-backend',
    live_link: 'https://be-nc-news-nvms.onrender.com/api',
    github_link: 'https://github.com/robert-matthew-brooks/be-nc-news',
    img_url: 'https://i.ibb.co/KWpdHmd/nc-news-backend.jpg',
    img_alt: 'JSON object on screen',
    body: `
    <p>
    <note>This api is hosted by a free provider - please wait a minute for live
      version to spin up, or try refreshing if it doesn't load</note>
  </p>
  
  <h>Intro</h>
  
  <p>
    This api was built as part of the
    <b>Northcoders software development bootcamp</b> I attended. The project was
    to build an api which mimics a real world backend service for a news/blog
    website, which could then be used to provide information to frontend
    architecture.
  </p>
  <p>The response is in a <l>text/json</l> format:</p>
  <code>
{
  "article": {
    "article_id": 1,
    "title": "Running a Node App",
    "topic": "coding",
    "author": "jessjelly",
    "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
    "created_at": "2020-11-07T06:03:00.000Z",
    "votes": 1,
    "article_img_url": "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
    "comment_count": 8
  }
}
  </code>
  <p>
    The focus of the api is serving data for a single news article, but the table
    of article data also needs to be manipulated provide a list of articles for a
    client frontend to generate a news feed. The endpoint for this list
    <b>allows queries</b>, so that the results can be sorted or filtered by
    different properties such as date or topic. It also supports
    <b>pagination</b> to allow a client frontend to be laid out properly and load
    quickly. Other data includes user comments, and the api provides
    <b>CRUD</b> functions to support this.
  </p>
  
  <h>Tech Stack</h>
  
  <p>
    The project was built using <l>Node.js/JavaScript</l>, and it focussed
    on some key backend topics from the bootcamp:
  </p>
  <ul>
    <li>
      <b>Test Driven Development</b> - the design of the api was centred around
      testing. Using the <l>Jest</l> npm package, a test suite describing
      the required behaviours of the endpoints was created. The api code was then
      written to satisfy these expected behaviours.
    </li>
  
    <li>
      <l>Express.js</l> - the project makes use of the express npm package.
      This framework allows the api to responds to different urls as well as
      processing parameters and queries in the urls.
    </li>
  
    <li>
      <l>PostgreSQL</l> - the test data is stored in a PSQL database. The
      data can be manipulated for testing with jest, or manually with requests
      from an api tool like Insomnia.
    </li>
  
    <li>
      <b>GitHub</b> - the different endpoints of this api were completed as
      separate branches on github, which were added to the main project branch via
      pull requests. This allowed different sections of the project to be worked
      on and reviewed a different times and in a different order to the provided
      tickets.
    </li>
  </ul>
  
  <h>Relational Databases</h>
  
  <p>
    The database structure uses <b>one-to-many</b> relationships. For example,
    <b>one user</b> may have <b>many comments</b>, and their name would be stored
    with the comment data.
  </p>
  <img
    src="https://i.ibb.co/93c7wh3/nc-news-backend-1.jpg"
    alt="Hardcoded username"
  />
  <p>
    If we choose to later change the user's display name, we don't want to change
    that name in every single comment. Instead, the user's details have a
    reference, such as an id or slug, that we can store. That way we aren't hard
    coding any of the user's data, only a reference to where it is stored.
  </p>
  <img
    src="https://i.ibb.co/J5JhTG1/nc-news-backend-2.jpg"
    alt="Referenced username"
  />
  <p>
    <l>PostgreSQL</l> is a good choice for this kind of database structure,
    as <l>SQL</l> facilitates the joining of tables by relationships to
    filter the required data.
  </p>
  
  <h>MVC Model</h>
  
  <p>
    To keep the server easy to update and maintain, it uses the
    <b>Model-View-Controller</b> model. Alongside <b>endpoint routing</b>, this
    help to keep a <b>separation of concerns</b>, where specific components of the
    server perform specific tasks. In the
    <a href="https://github.com/robert-matthew-brooks/be-nc-news"
      >GitHub project</a
    >, these components can be found in the <b>/controller</b> and
    <b>/model</b> folders.
  </p>
  
  <ul>
    <li>
      The <b>model</b> processes the request, and queries the database to fetch,
      filter and sort any required data. It then passes the fetched data to the
      controller. The npm package <l>pg</l> is used to provide a worker pool
      to get data from the <l>PostgreSQL</l> database.
    </li>
  
    <li>
      The <b>controller</b> interacts with the model and the view - it processes
      the incoming request and passes the relevant information to the model, and
      then serves the model response to the client. <l>Express.js</l> is
      used as the server in this project.
    </li>
  
    <li>
      The <b>view</b> isn't part of this project - it will be the frontend of the
      external client that uses this api!
    </li>
  </ul>
  
  <h>Testing</h>
  
  <p>
    I built a
    <a
      href="https://github.com/robert-matthew-brooks/be-nc-news/blob/main/__tests__/app.test.js"
      >test suite</a
    >
    using <l>Jest</l> while programming the server. The tests are important,
    because they ensure any changes to the project do not inadvertently break any
    required functionality of the code.
  </p>
  <p>
    The project also uses <l>Husky</l>, which is another safeguard to ensure
    any pushed changes pass the test suites.
  </p>
  
  <h>Outro</h>
  
  <p>
    During this project, I learned and applied a lot of interesting concepts, most
    notably <b>test/dev data seeding</b>, <b>database architecture</b> and the
    <b>MVC server model</b>
  </p>
  <p>
    I found the project also insightful into how apis provide data that can be
    shared to external clients. The next project in the course will be to build a
    frontend to handle user requests to the api and present the data!
  </p>
  
    `,
    language_ids: [1, 2, 3, 4],
  },
  {
    created_at: '2023-09-12T20:28:09.186Z',
    title: 'Kata: Sum Consecutive Duplicates',
    slug: 'sum-consecutive-duplicates',
    live_link: 'https://sum-consecutive-duplicates.onrender.com/frontend/',
    github_link:
      'https://github.com/robert-matthew-brooks/sum-consecutive-duplicates',
    img_url: 'https://i.ibb.co/5K19c4w/sum-consecutive-duplicates.png',
    img_alt: 'VS code on screen',
    video_url: '',
    body: `
    <h>Intro</h>

    <p>
      Given an array of integers,
      <b>sum any consecutive numbers</b> into a single element. For example, if the
      input is <c>[ 1, 2, 2, 2, 3 ]</c>, the output would be <c>[ 1, 6, 3 ]</c>,
      because the twos would add together.
    </p>
    <p>
      I set out to solve this <l>JavaScript</l> kata, but with a twist - I wanted to
      develop my frontend presentation and animation skills with <l>CSS</l> by
      showing the algorithm solving the problem in real time.
    </p>
    
    <h>The Kata</h>
    <quote>
      Implement a function
      <f>sumConsecutiveDuplicates()</f> which adds together all the consecutive
      numbers in an array and pushes them into a new array. For extra credit, write
      a function <f>reduceConsecutives()</f> which recursively uses your
      <f>sumConsecutiveDuplicates()</f> function to reduce the array down until
      there are no more consecutive duplicate numbers.
    </quote>
    
    <p>
      See the original kata
      <a
        href="https://l2c.northcoders.com/courses/be/be-katas-week-2#sectionId=sumConsecutiveDuplicates"
        >here</a
      >.
    </p>
    
    <h>The Solution</h>
    
    <p>
      The solution function starts by iterating through the input array. For each
      element, the function then keeps looking ahead in the array for similar
      numbers. It then sums those duplicate numbers to get a subtotal. A cleaner
      solution would be to push this subtotal to a new array. However, because I
      want to visualise a single array on the screen, I chose to
      <b>mutate the array</b>. This means splicing the duplicate elements out and
      inserting the subtotal.
    </p>
    <p>
      Of course, the output array could itself contain consecutive duplicate
      numbers. For example, <c>[2, 2, 2, 3, 3]</c> will reduce to <c>[6, 6]</c>. I
      implemented a second function which recursively runs the solution algorithm
      until the <b>base case</b> is met: there are no consecutive duplicate numbers.
    </p>
    <p>
      I also built a test suite while working on the script, so I could follow
      <b>test-driven development</b> principles. This was important, as it ensured
      that when I expanded on the script to manipulate the DOM <l>HTML</l> object, I
      didn't inadvertantly break any functionality of the solution. The finished
      test suite also gave me confidence the code would work correctly with some of
      the trickier concepts, such as recursion.
    </p>
    <p>
      See the solution script
      <a
        href="https://github.com/robert-matthew-brooks/sum-consecutive-duplicates/blob/main/sumConsecutiveDuplicates.js"
        >here</a
      >, and the test suite
      <a
        href="https://github.com/robert-matthew-brooks/sum-consecutive-duplicates/blob/main/__tests__/sumConsecutiveDuplicates.test.js"
        >here</a
      >.
    </p>
    
    <h>Frontend Features</h>
    
    <p>
      Learning to create an intuitive and easy to understand animation was part of
      my motivation for this project, and I wanted to practise using vanilla
      <l>CSS</l> to achieve this. The element being scanned will blink, then turn
      green or red to indicate if a duplicate is found. If there are duplicates,
      they will move to <b>visually combine</b> into one element.
    </p>
    <p>
      The user can control the script with a "Run" button, and toggle whether it
      runs recursively or not. There are preset input arrays to select from, as well
      as a random input array option. It's not entirely random though - I tipped the
      scales so there is at least one pair of consecutive duplicate numbers!
    </p>
    <p>
      Although the layout is fairly simple, I had an opportunity to make a
      <b>responsive layout</b>. I started by getting all the important design
      elements on a small mobile screen, then expanding the styling for larger
      screens with more space.
    </p>
    
    <h>Outro</h>
    
    <p>
      Thanks for looking at my project, I hope the process was as interesting for
      you as it was for me. Its been great to practise not only solving a kata, but
      also <b>documenting the process</b>. There are still many more katas to solve
      and frontends to design! See you next time!
    </p>
    
`,
    language_ids: [1, 6, 7, 4],
  },
];

module.exports = { projectData };
