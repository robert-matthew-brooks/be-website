const projectData = [
  {
    created_at: '2023-06-30T18:11:01.487Z',
    title: 'NC-News Backend API',
    slug: 'backend-nc-news',
    live_link: 'https://be-nc-news-nvms.onrender.com/api',
    github_link: 'https://github.com/robert-matthew-brooks/be-nc-news',
    img_url: 'https://i.ibb.co/t2vHVnC/backend-nc-news.png',
    img_alt: 'JSON object in Insomnia',
    body: `
    <h>Intro</h>

    <note>
      (This api is hosted by a free provider - please wait a minute for live version
      to spin up, or try refreshing if it doesn't load)
    </note>
    
    <p>
      This api was built as part of the
      <b>Northcoders software development bootcamp</b> I attended. The project was
      to build an api which mimics a real world backend service for a news/blog
      website, which could then be used to provide information to frontend
      architecture.
    </p>
    
    <p>
      The design brief called for, amongst others, the following important endpoints
      to be created:
    </p>
    
    <ul>
      <li>
        <f>/api/article/:article_id</f> - responds with full details of the
        <b>requested article</b> from the articles table so a frontend can render
        it.
      </li>
    
      <li>
        <f>/api/articles</f> - returns a <b>list of articles</b> omitting the
        article body, so a frontend can display a list of links to articles. It
        accepts queries enabling it to <b>filter</b>, <b>sort</b> and
        <b>paginate</b> the results.
      </li>
    
      <li>
        <f>api/article/:article_id/comments</f> - provides a
        <b>list of comments</b> for a specific article. The comments have further
        endpoints for all <b>CRUD</b> actions, so a frontend may allow a user to
        manipulate their comments.
      </li>
    </ul>
    
    <p>
      Other endpoints exist for topic filtering and user profiles - a full list of
      endpoints can be found on the
      <a href="https://be-nc-news-nvms.onrender.com/api">/api endpoint</a>.
    </p>
    
    <p>
      The server response is in a <l>text/json</l> format. For example
      <f>/api/articles/1</f>:
    </p>
    
    <!--code
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
    code-->
    <caption>
      Example response from
      <c>api/article/:article_id</c>
      endpoint
    </caption>
    
    <h>Tech Stack</h>
    
    <p>
      The project was built primarily using <l>Node.js/JavaScript</l>, and it
      focussed on some key backend topics from the bootcamp:
    </p>
    
    <ul>
      <li>
        <b>Test Driven Development</b> - the design of the api was centred around
        testing. Using the <l>Jest</l> npm package, a test suite describing the
        required behaviours of the endpoints was created. The api code was then
        written to satisfy these expected behaviours.
      </li>
    
      <li>
        <l>Express.js</l> - the project makes use of the express npm package. This
        framework allows the api to responds to different urls as well as easily
        processing parametric endpoints and url queries.
      </li>
    
      <li>
        <l>PostgreSQL</l> - the test data is stored in a PSQL database. The data can
        be manipulated for testing with jest, or manually with requests from an api
        tool like Insomnia.
      </li>
    
      <li>
        <b>GitHub</b> - the different endpoints of this api were completed as
        separate branches on GitHub, which were added to the main project branch via
        pull requests. This allowed different sections of the project to be worked
        on and reviewed a different times and in a different order to the provided
        tickets.
      </li>
    </ul>
    
    <h>Relational Databases</h>
    
    <p>
      The database structure uses <b>one-to-many</b> relationships. For example,
      <b>one user</b> may have <b>many comments</b>, and their name would be stored
      with the comment data:
    </p>
    
    <img
      src="https://i.ibb.co/93c7wh3/backend-nc-news-1.jpg"
      alt="Hardcoded username"
    />
    <caption>
      User details stored as string
    </caption>
    
    <p>
      If we choose to later change the user's display name, we don't want to change
      that name in every single comment. Instead, the user's details have a
      reference, such as an id or slug, that we can store. That way we aren't hard
      coding any of the user's data, only a reference to where it is stored:
    </p>
    
    <img
      src="https://i.ibb.co/J5JhTG1/backend-nc-news-2.jpg"
      alt="Referenced username"
    />
    <caption>
      User details stored as reference to record
    </caption>
    
    <p>
      <l>PostgreSQL</l> is a good choice for this kind of database structure, as
      <l>SQL</l> facilitates the joining of tables by relationships to filter the
      required data.
    </p>
    
    <h>MVC Model</h>
    
    <p>
      To keep the server easy to update and maintain, it uses the
      <b>Model-View-Controller</b> model. Alongside <b>endpoint routing</b>, this
      help to keep a <b>separation of concerns</b>, where specific components of the
      server perform specific tasks. In the
      <a href="https://github.com/robert-matthew-brooks/be-nc-news"
        >GitHub project</a
      >, these components can be found in the <f>/controller</f> and
      <f>/model</f> folders.
    </p>
    
    <img
      src="https://i.ibb.co/G7rsy4f/backend-nc-news-3.png"
      alt="MVC model diagram"
    />
    <caption>
      MVC model diagram
    </caption>
    
    <ul>
      <li>
        The <b>model</b> processes the request, and queries the database to fetch,
        filter and sort any required data. It then passes the fetched data to the
        controller. The npm package <l>pg</l> is used to provide a worker pool to
        get data from the <l>PostgreSQL</l> database.
      </li>
    
      <li>
        The <b>controller</b> interacts with the model and the view - it processes
        the incoming request and passes the relevant information to the model, and
        then serves the model response to the client. <l>Express.js</l> is used as
        the server in this project.
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
    
    <p>The project uses test, development and production databases:</p>
    
    <ul>
      <li>
        The <b>test database</b> simply needs to store the correct properties of the
        correct data type, which is primarily what the <b>unit tests</b> for each
        endpoint look for.
      </li>
      <li>
        The <b>development database</b> needs to be more substantial, and it
        simulates real looking data. In this project, I used <l>Insomnia</l> to test
        the endpoints of my server and observe the dev data.
      </li>
      <li>
        The <b>production database</b> stores real user data. Although this project
        was a proof of concept without 'real' users, tutors and friends interacted
        with the POST and PATCH message endpoints to interact and manipulate data on
        the prod database.
      </li>
    </ul>
    
    <p>
      I used the <l>dotenv</l> npm package as part of my
      <a
        href="https://github.com/robert-matthew-brooks/be-nc-news/blob/main/db/connection.js"
        >db connection script</a
      >. The <f>process.env.NODE_ENV</f> variable it is able to inform us which
      environment we are in and hence what database we require.
    </p>
    
    <p>
      The project also utilises <l>Husky</l>, which is another safeguard to ensure
      any pushed changes do not fail anything in the test suites.
    </p>
    
    <h>Outro</h>
    
    <p>
      During this project, I learned and applied a lot of interesting concepts, most
      notably <b>test/dev data seeding</b>, <b>database architecture</b> and the
      <b>MVC server model</b>.
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
    created_at: '2023-07-21T13:51:04.186Z',
    title: 'NC-News Frontend Website',
    slug: 'frontend-nc-news',
    live_link: 'https://frontend-nc-news.netlify.app/',
    github_link: 'https://github.com/robert-matthew-brooks/fe-nc-news',
    img_url: 'https://i.ibb.co/FBBwGy7/frontend-nc-news.jpg',
    img_alt: 'NC-News website',
    body: `
    <h>Intro</h>

    <note>
      (The backend api is hosted by a free provider - please wait a minute for live
      version to spin up, or try refreshing if it doesn't load)
    </note>
    
    <p>
      This website was built as part of the
      <b>Northcoders software development bootcamp</b> I attended. The project aimed
      to recreate a Reddit style <b>social news hub</b>. The main features of the
      site are articles which can be <b>organised by topic</b>, with each article
      having user-curated <b>ratings</b> and a <b>comments</b> section.
    </p>
    
    <p>
      Feel free to interact with rating and commenting functionality of the
      <a href="https://frontend-nc-news.netlify.app/">live site</a>.
    </p>
    
    <h>Planning</h>
    
    <p>
      The website was built using <l>React</l>, and the first step was to
      <a
        href="https://github.com/robert-matthew-brooks/fe-nc-news/tree/main/planning"
        >plan all the routes</a
      >
      with wireframe models and component trees. Not only does this help solidify
      the layout and visual design, but considering <b>React state</b> variables and
      their location will while coding.
    </p>
    
    <p>
      For example, the following wireframe for displaying an article shows the
      <b>article content</b> and <b>comments</b> as two different sections (or
      <l>React</l> components), but both will need access to the
      <c>article_id</c> value so they can make requests to the data api. This means
      the <c>article_id</c> state variable should be stored in parent of these two
      sections (the &lt;main&gt; component) and passed down.
    </p>
    
    <img
      src="https://i.ibb.co/R7SytZ0/frontend-nc-news-1.png"
      alt="Wireframe and component tree"
    />
    <caption>
      Wireframe and component tree for /api/article/:article_id
    </caption>
    
    <h>Responsive Layout</h>
    
    <p>
      While designing the site, I aimed to make sure all the core features could be
      displayed on a small viewport, by using a <b>mobile first</b> approach. As the
      screen gets larger, I used <l>CSS</l> to render additional components in the
      available space, for example an additional content sidebar.
    </p>
    
    <p>
      You can use test this by using the device emulator in Chrome's F12 developer
      tools, or mobile testing sites such as
      <a
        href="http://www.responsinator.com/?url=https%3A%2F%2Ffrontend-nc-news.netlify.app%2Farticles"
        >Responsinator.com</a
      >. One feature I addressed with the mobile layout is the menu, which is
      operated by a hamburger icon on small screens.
    </p>
    
    <img
      src="https://i.ibb.co/h9jcpQy/frontend-nc-news-2.gif"
      alt="Hamburger menu opening and closing"
    />
    <caption>
      Hamburger menu on small viewports
    </caption>
    
    <h>Accessibility</h>
    
    <p>
      While building the website, there were several accessibility considerations I
      made:
    </p>
    
    <ul>
      <li>
        <b>High contrast colours</b> were used to make the text easier to read
      </li>
      <li>
        <b>Form labels</b> were used, so that input boxes such as for creating a
        comment could be easily interpreted by a screen reader
      </li>
      <li>
        <b>Landmark tags</b> were used wherever possible, for example &lt;nav&gt;
        instead of &lt;div class="nav"&gt;, which again easier for screen reader
        users to navigate a site
      </li>
      <li>
        <b>Alt tags</b> were used on images, so their meaning could be understood
        even if the image couldn't be seen
      </li>
    </ul>
    
    <h>Optimistic Data</h>
    
    <p>
      A lot of the <b>interactive elements</b>, such as voting and commenting,
      involve <b>patching data</b> via the api. One of the problems with this is
      that when the user performs an action, let's say upvoting an article, the api
      needs to patch the data, request the updated data again, and display it on the
      frontend. This can cause a <b>noticeable delay</b>, and is not a smooth
      experience.
    </p>
    
    <img
      src="https://i.ibb.co/nch2LgJ/frontend-nc-news-3.png"
      alt="Updating api with no optimistic data"
    />
    <caption>
      Waiting for the api causes a feedback delay
    </caption>
    
    <p>
      A solution is to use <b>optimistic data</b>. We can have a local state in
      <l>React</l> called <c>optimisticVotes</c>, which is initiall set to the value
      fetched from the api. When the user makes a vote, we can increment/decrement
      this number locally and display it (which is much faster), and send a patch
      request in the background. If the patch request fails, we can display an error
      message which will be delayed, but overall the user experience will be more
      responsive.
    </p>
    
    <img
      src="https://i.ibb.co/fY8XRn7/frontend-nc-news-4.png"
      alt="Updating api with optimistic data"
    />
    <caption>
      Using local data causes no delay
    </caption>
    
    <p>
      In this project, I used optimistic data for <b>article voting</b>,
      <b>comment voting</b> and <b>posting a comment</b> - the new comment was
      pushed into a local <c>optimisticComments</c> array.
    </p>
    
    <h>Loading And Error States</h>
    
    <p>
      In this project I made sure to provide feedback to the user when the site was
      waiting for a response from the api. The following extract shows how a loading
      state can be used to control a loading wheel:
    </p>
    
    <!--code
      const [article, setArticle] = useState({});
      const [isLoading, setIsLoading] = useState(true);
    
      useEffect(() => {
        (async () => {
            setIsLoading(true);
    
            try {
                const { article } = await fetchArticle(articleId); // request this data from api
                setArticle(article);
            }
            catch(err) {
                console.log(err);
            }
            
            setIsLoading(false);
        })()
      }, []);
    
      return (
        <main>
          <Loading isLoading={isLoading}>
            <article>
              article.content
            </article>
          </Loading>
        </main>
      );
    code-->
    <caption>
      Article.jsx extract
    </caption>
    
    <p>
      While the api is fetching the data, the <c>isLoading</c> state is set to true.
      This state is passed to the returned <c>Loading</c> component, which is
      defined as:
    </p>
    
    <!--code
      export default Loading({isLoading, children}) {
        return (
          <>
            {children}
            <div className="loading" style={{visibility: isLoading ? visible : hidden }}>
              <img src={LoadingImg} alt="Loading content" />
            </div>
          </>
        );
      };
    code-->
    <caption>
      Loading.jsx
    </caption>
    
    <p>
      The <c>&lt;div className="loading"&gt;</c> tag is always present inside the
      <c>Loading</c> component, but it is only visible when the
      <c>isLoading</c> state is true. We can use <l>CSS</l> to make the div cover
      the parent, place a loading wheel image in the middle and have a translucent
      background:
    </p>
    
    <img
      src="https://i.ibb.co/JQzDw1w/frontend-nc-news-5.png"
      alt="Loading wheels"
    />
    <caption>
      Don't adjust your set - example of loading wheels during an api request
    </caption>
    
    <p>
      The catch block can be expanded upon to allow different content to be rendered
      if there was an error while fetching data from the api:
    </p>
    
    <!--code
      const [isError, setIsError] = useState(false);
    
      ...
    
      catch(err) {
        console.log(err);
        setIsError(true);
      }
    
      ...
    
      if (isError) {
        return <p>There was an error...</p>
      }
      else {
        return <p>{article.content}</p>
      }
    code-->
    <caption>
      Article.jsx extract
    </caption>
    
    <h>Outro</h>
    
    <p>
      I learned a lot during this project, particularly about the advantages and
      disadvantages of using <l>React</l> as a frontend framework. Unfortunately I
      didn't completely finish this project, and one area I'd improve given more
      time is the <b>user login</b>. Currently this is hard coded, but issues arise
      with making multiple votes, as these are not tracked per when the browser is
      refreshed.
    </p>

    <p>
      Another point to consider is the slow server spin up times when using a
      <l>SQL</l> server on Render. Although this is a backend api issue, but the
      <b>response time is very noticeable</b> in the frontend experience. If I was
      to make a similar project again, I would consider migrating the server to a
      different platform (eg <l>Supabase</l>).
    </p>

    <p>
      As a learning experience this has definetely been worthwhile, but rather than
      continue this project, I am going to start a similar project of building a
      <b>portfolio website</b> using the knowledge I've acquired about this tech
      stack.
    </p>
`,
    language_ids: [5, 6, 7],
  },
];

module.exports = { projectData };
