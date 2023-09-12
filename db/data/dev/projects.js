const projectData = [
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
    <h3>Intro</h3>
    <p>Given an array of integers, <strong>sum any consecutive numbers</strong> into a single element. For example, if the input is [ 1, 2, 2, 2, 3 ], the output would be [ 1, 6, 3 ], because the twos would add together.</p>
    <p>I set out to solve this <span class="language">JavaScript</span> kata, but with a twist - I wanted to develop my frontend presentation and animation skills with <span class="language">CSS</span> by showing the algorithm solving the problem in real time.</p>
    
    <h3>The Kata</h3>
    <p class="quote">Implement a function <span class="hl-yellow">sumConsecutiveDuplicates()</span> which adds together all the consecutive numbers in an array and pushes them into a new array. For extra credit, write a function reduceConsecutives() which recursively uses your sumConsecutiveDuplicates() function to reduce the array down until there are no more consecutive duplicate numbers.</p>
    <p>See the original kata <a href="https://l2c.northcoders.com/courses/be/be-katas-week-2#sectionId=sumConsecutiveDuplicates">here</a>.</p>
    
    <h3>The Solution</h3>
    <p>The solution function starts by iterating through the input array. For each element, the function then keeps looking ahead in the array for similar numbers. It then sums those duplicate numbers to get a subtotal. A cleaner solution would be to push this subtotal to a new array. However, because I want to visualise a single array on the screen, I chose to mutate the array . This means splicing the duplicate elements out and inserting the subtotal.</p>
    <p>Of course, the output array could itself contain consecutive duplicate numbers. For example, [2, 2, 2, 3, 3] will reduce to [6, 6]. I implemented a second function which recursively runs the solution algorithm until the <strong>base case</strong> is met: there are no consecutive duplicate numbers.</p>
    <p>I also built a test suite while working on the script, so I could follow TDD principles. This was important, as it ensured that when I expanded on the script to manipulate the DOM HTML object, I didn't inadvertantly break any functionality of the solution. The finished test suite also gave me confidence the code would work correctly with some of the trickier concepts, such as recursion.</p>
    <p>See the solution script <a href="https://github.com/robert-matthew-brooks/sum-consecutive-duplicates/blob/main/sumConsecutiveDuplicates.js">here</a>, and the test suite <a href="https://github.com/robert-matthew-brooks/sum-consecutive-duplicates/blob/main/__tests__/sumConsecutiveDuplicates.test.js">here</a>.</p>
    
    <h3>Frontend Features</h3>
    <p>Learning to create an intuitive and easy to understand animation was part of my motivation for this project, and I wanted to practise using vanilla CSS to achieve this. The element being scanned will blink, then turn green or red to indicate if a duplicate is found. If there are duplicates, they will move to visually combine into one element.</p>
    <p>The user can control the script with a "Run" button, and toggle whether it runs recursively or not. There are preset input arrays to select from, as well as a random input array option. It's not entirely random though - I tipped the scales so there is at least one pair of consecutive duplicate numbers!</p>
    <p>Although the layout is fairly simple, I had an opportunity to make a responsive layout. I started by getting all the important design elements on a small mobile screen, then expanding the styling for larger screens with more space.</p>
    <p>es6 mix node/js</p>
    
    <h3>Outro</h3>
    <p>Thanks for looking at my project, I hope the process was as interesting for you as it was for me. Its been great to practise not only solving a kata, but also documenting the process. You can find the link to the github repo on the live version. There are still many more katas to solve and frontends to design! See you next time!</p>
  `,
    language_ids: [1, 2, 3, 4],
  },
];

module.exports = { projectData };
