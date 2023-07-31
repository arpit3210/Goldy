

// Example 1: Delayed function call
function sayHello() {
    console.log('Hello, world!');
  }
  
  // Call the sayHello() function after a 2-second delay
  setTimeout(sayHello, 2000);
  
  // Example 2: Delayed function call with parameters
  function greetUser(name) {
    console.log(`Hello, ${name}!`);
  }
  
  const userName = 'John';
  
  // Call the greetUser() function with the userName parameter after a 3-second delay
  setTimeout(greetUser, 3000, userName);
  
  // Example 3: Delayed code block
  const delayInMilliseconds = 5000;
  
  setTimeout(() => {
    console.log('This code is executed after a 500ms delay.');
  }, delayInMilliseconds);
  