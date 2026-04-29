1. What is the difference between var, let, and const?
=>JavaScript provides three ways to declare variables: var, let, and const, but they differ in scope, hoisting behaviour, and re-assignment rules.

var: Declares variables with function or global scope and allows re-declaration and updates within the same scope.
let: Declares variables with block scope, allowing updates but not re-declaration within the same block.
const: Declares block-scoped variables that cannot be reassigned after their initial assignment.

2. What is the spread operator (...)?
=> The spread operator (...) is a JavaScript syntax introduced in ES6 that allows an iterable (such as an array, string, or object) to be expanded or "unpacked" into individual elements.

3. What is the difference between map(), filter(), and forEach()?

=> map(): Creates a new array by transforming every element in the original array. It is ideal for data transformation without mutating the original data.filter(): Creates a new array containing only elements that pass a specific condition (predicate). It is used to remove unwanted items.forEach(): Executes a provided function once for each array element. It does not return a new array (returns undefined) and is typically used for side effects like logging, saving to a database, or updating DOM elements.

4. What is an arrow function?

=>An arrow function is a concise way to write function expressions in JavaScript

5. What are template literals?
=> Template literals, introduced in ES6, are string literals that use backticks (`) instead of quotes, allowing for embedded expressions (${expression}), multiline strings, and string interpolation. They simplify string concatenation and variable insertion, often referred to as "template strings".