### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - Promises
  - Async/Await
  - Callbacks
  - Promises.all
  - Promises.race

- What is a Promise?
  - A Promise is an object that represents an operation that hasn't completed yet, but is expected in the future.

- What are the differences between an async function and a regular function?
  - Async functions return a Promise but a Regular functions don't.

- What is the difference between Node.js and Express.js?
  - Node.js is a server-side JavaScript runtime environment
  - Express.js is a web application framework for Node.js

- What is the error-first callback pattern?
  - The callback gets the error as the first argument
  - The callback gets the result as the second argument

- What is middleware?
  - Middleware is a function that runs between the request and response cycles

- What does the `next` function do?
  - The `next` function is used to pass control to the next middleware in the stack.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  - The code fetches data for each user sequentially rather than in parallel. We can use `Promise.all` to fetch all user data concurrently, significantly reducing the overall time to fetch all data.
  - The variables `elie`, `joel`, and `matt` are named after specific GitHub users. We can use more generic names like user1, user2, user3, or even better, structure the code in such a way that specific variable names for each user aren't necessary.
  - Usernames are hardcoded into the function, making the function less flexible and reusable for fetching data for different users.
  - There's no try/catch block or error handling mechanism in place.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

- Example of improved code

```js
async function fetchUsers(usernames) {
  try {
    const userPromises = usernames.map(username =>
      $.getJSON(`https://api.github.com/users/${username}`)
    );
    const users = await Promise.all(userPromises);
    return users;
  } catch (error) {
    console.error("Error fetching user daata:", error);
    return [];
  }
}

```