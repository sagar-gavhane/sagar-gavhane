---
title: Three dots ( … ) in JavaScript
slug: "three-dots-in-javascript"
date: "2018-09-18"
description: "In this article, we are going to discuss a feature introduced in ES6 that is spread operator and rest operator. 🔥 🔥 🔥 I've become a big fan of the three dots that may change your style of solving the problem within JavaScript. We can use three dots … in two different ways as spread operator and rest operator."
---

Hey! I'm Sagar. I love to write tutorials and articles to help developers better understand the magic of JavaScript. If you have any questions about the article, leave a comment and I'll get back to you, or find me on twitter [@sagar_dev44](https://twitter.com/sagar_dev44).

In this article, we are going to discuss a feature introduced in ES6 that is spread operator and rest operator. 🔥 🔥 🔥

I've become a big fan of the three dots that may change your style of solving the problem within JavaScript. We can use three dots … in two different ways as spread operator and rest operator.

## Rest Parameters 😴

With rest parameters, we can gather any number of arguments into an array and do what we want with them. Rest parameters have been introduced to reduce the boilerplate code that was induced by the arguments. 🙌

```javascript
function myFunc(a, b, ...args) {
  console.log(a) // 22
  console.log(b) // 98
  console.log(args) // [43, 3, 26]
}
myFunc(22, 98, 43, 3, 26)
```

In myFunc's last parameter prefixed with … which will cause to all remaining arguments placed within the javascript array.

The rest parameters gather all remaining arguments so there is no sense 😕 to add rest parameters before the last parameter. Rest parameter must be the last formal parameter.

```javascript
function myFunc(arg1, ...rest, arg2) {
  // arg2 ?
}
```

Rest parameters can be destructured (arrays only), that means that their data can be unpacked into distinct variables.

```javascript
function myFunc(...[x, y, z]) {
  return x * y * z
}

myFunc(1) // NaN
myFunc(1, 2, 3) // 6
myFunc(1, 2, 3, 4) // 6 (fourth parameter is not destructured)
```

## Spread Operators ✨

The spread operator is used to expand elements of an iterable (like an array) into places where multiple elements can fit.

```javascript
function myFunc(x, y, ...params) {
  // used rest operator here
  console.log(x)
  console.log(y)
  console.log(params)
}

var inputs = ["a", "b", "c", "d", "e", "f"]
myFunc(...inputs) // used spread operator here
// "a"
// "b"
// ["c", "d", "e", "f"]
```

There have always been a variety of ways to combine arrays, but the spread operator gives use a new method for combining arrays:

```javascript
const featured = ["Deep Dish", "Pepperoni", "Hawaiian"]
const specialty = ["Meatzza", "Spicy Mama", "Margherita"]

const pizzas = [...featured, "veg pizza", ...specialty]

console.log(pizzas) // 'Deep Dish', 'Pepperoni', 'Hawaiian', 'veg pizza', 'Meatzza', 'Spicy Mama', 'Margherita'
```

With spread operator, Shallow-cloning (excluding prototype) or merging of objects is now possible using a shorter syntax than Object.assign().

```javascript
var obj1 = { foo: "bar", x: 42 }
var obj2 = { foo: "baz", y: 13 }

var clonedObj = { ...obj1 }
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 }
// Object { foo: "baz", x: 42, y: 13 }
```

## 👉 Conclusion

When we see three dots (…) in the code, it's either rest parameters or the spread operator.

There's an easy way to distinguish between them:

1. When three dots (…) is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.

2. When three dots (…) occurs in a function call or alike, it's called a "spread operator" and expands an array into a list.

Thanks for reading. I hope you like this article feel free to like, comment or share this article with your friends.

😄 Happy Coding…
