# Broken App

## App Issues

- the axios.get method returns a promise, and when using map with async functions, it creates an array of promises.
- within the map function, r.data doesn't exist because r is a promise, not the resolved data.

## Solution

- Utilized `Promise.all` to handle multiple asynchronous operations concurrently.
- Added `async` keyword to the function to allow the use of `await` for asynchronous operations.
- Implemented a route directory structure for better organization and separation of concerns.
- Enhanced error handling to properly handle and propagate errors.
- Implemented input validation to ensure data integrity and prevent potential errors.
- Used descriptive variable names for improved code readability and maintainability.
- Added comments to explain the purpose and functionality of various sections of the code.
- Implemented test cases to verify the correctness and reliability of the application.