---
title: "Reactive Programming in JavaScript with RxJS."
slug: "reactive-programming-in-javascript-with-rxjs"
date: "2018-09-30"
description: "RxJS is JavaScript library for transforming, composing and querying asynchronous streams of data. RxJS can be used both in the browser or in the server-side using Node.js."
---

RxJS is JavaScript library for transforming, composing and querying asynchronous streams of data. RxJS can be used both in the browser or in the server-side using Node.js.

I took a challenge to explain RxJS to developers in a simplistic way. The hardest part of the learning RxJS is **“Thinking in Reactively"**.

> Think of RxJS as “LoDash” for handling asynchronous events.

**So, What Exactly, Reactive Programming is?**

![Reactive programming](https://thepracticaldev.s3.amazonaws.com/i/pgszjn5110pixunu5uw4.jpg)

Reactive programming is a programming paradigm for writing code, mainly concerned with **asynchronous data streams.** Just a different way of building software applications which will "react" to changes that happen instead of the typical way of writing software where we explicitly write code (aka "imperative" programming) to handle those changes.

### Stream

![stream](https://thepracticaldev.s3.amazonaws.com/i/u5tiqri5aefo9imzdm7i.jpg)

A stream is a sequence of ongoing events ordered in time. It can be anything like user inputs, button clicks or data structures. You can listen to a stream and react to it accordingly. You can use functions to combine, filter or map streams.

Stream emit three things during its timeline, a value, an error, and complete signal. We have to catch this asynchronous event and execute functions accordingly.

Both promise and observables are built to solve problems around async (to avoid “callback hell”).

**Types of async operations in modern web applications**

- DOM Events- (mouse events, touch events, keyboard events, form events etc)
- Animations - (CSS Transitions and Animations, requestAnimationFrame etc)
- [AJAX](https://www.thoughtco.com/use-asynchronous-or-synchronous-ajax-2037228)
- [WebSockets](https://pusher.com/websockets)
- [SSE - Server-Sent Events](https://en.wikipedia.org/wiki/Server-sent_events)
- Alternative inputs (voice, joystick etc)

If you're still confused, don't worry, this normally doesn't make much sense at this point. Let's dive in step by step.

### Observable

![observable](https://thepracticaldev.s3.amazonaws.com/i/fe7a7rcqoj3zib8szr4h.jpg)

- An Observable is just a function, with a few special characteristics. It takes in an “observer” (an object with “next”, “error” and “complete” methods on it), and returns cancellation logic.
- Observables provide support for passing messages between publishers and subscribers in your application.
- Observables offer significant benefits over other techniques for event handling, asynchronous programming, and handling multiple values.
- Observables are lazy. It doesn't start producing data untill you subscribe to it.
- `subscribe()` returns a subscription, on which a consumer can be call `unsubscribe()` to cancel the subscription and tear donw the producer.
- RxJS offers a number of functions that can be used to create new observables. These functions can simplify the process of creating observables from things such as events, timers, promises, and so on.
  For example:

  ```javascript
  const button = document.querySelector("button")
  const observer = {
    next: function (value) {
      console.log(value)
    },
    error: function (err) {
      console.error(err)
    },
    complete: function () {
      console.log("Completed")
    },
  }

  // Create an Observable from event
  const observable = Rx.Observable.fromEvent(button, "click")
  // Subscribe to begin listening for async result
  observable.subscribe(observer)
  ```

### Subscription

![subscription](https://thepracticaldev.s3.amazonaws.com/i/7hevybycq37g57jgugx6.jpg)

- An Observable instance begins publishing values only when someone subscribes to it. You subscribe by calling the `subscribe()` method of the instance, passing an `observer` object to receive the notifications.
- A Subscription has one important method, `unsubscribe()`, that takes no argument and just disposes of the resource held by the subscription.

  ```javascript
  const button = document.querySelector("button")
  const observable = Rx.Observable.fromEvent(button, "click")
  const subscription = observable.subscribe(event => console.log(event))
  // Later:
  // This cancels the ongoing Observable execution which
  // was started by calling subscribe with an Observer.
  subscription.unsubscribe()
  ```

### Observer

![observer](https://thepracticaldev.s3.amazonaws.com/i/iy4ya5tq9indrx8zuee5.jpg)

- An `observer` is object literal with `next()`, `error()` and `complete()` functions. In the above example, the observer is the object literal we pass into our `.subscribe()` method.
- When an Observable produces values, it then informs the observer, by calling `.next()` method when a new value was successfully captured and `.error()` when an error occurred.
- When we subscribe to an Observable, it will keep passing values to an observer until the complete signal.
- Example of an observer.

  ```javascript
  // observer is just object literal with next(), error() and complete() functions
  // Howerver, next() function is required, remaining error() and complete() functions are optional
  const observer = {
    next: function (value) {
      console.log(value)
    },
    error: function (err) {
      console.error(err)
    },
    complete: function () {
      console.log("Completed")
    },
  }
  ```

### Operators

![operator](https://thepracticaldev.s3.amazonaws.com/i/egbbrtsok7k4pfyo8tjq.png)

- Operators are functions that build on the Observables foundation to enable sophisticated manipulation of collections.
- An Operator is essentially a pure function which takes one Observable as input and generates another Observable as output.
- There are operators for different purposes, and they may be categorized as creation, transformation, filtering, combination, multicasting, error handling, utility etc.
- Operators pass each value from one operator to the next before proceeding to the next value in the set. This is different from array operators (map and filter) which will process the entire array at each step.
- For example,

  ```javascript
  const observable = Rx.Observable.of(1, 2, 3).map(value => value * value)

  observable.subscribe(x => console.log(x))
  // Output:
  // 1
  // 4
  // 9
  ```

- RxJS provides many operators, but only a handful are used frequently. For a list of operators and usage samples, visit the [RxJS API Documentation](http://reactivex.io/rxjs/manual/overview.html#operators).

  ![common operator list](https://thepracticaldev.s3.amazonaws.com/i/dvnx7lgy02cseedxscno.png)

### Subject

![subject](https://thepracticaldev.s3.amazonaws.com/i/2c54wvzfvr7c7b2bxor1.jpg)

- RxJS Subject is a special type of Observable that allows values to be **multicasted to many Observers**. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), **Subjects are multicast**.
- A subject in RxJS is a special hybrid that can act as both an Observable and an Observer at the same time.
- In the example below, we have two Observers attached to a Subject, and we feed some values to the Subject:

  ```javascript
  const subject = new Rx.Subject()

  subject.subscribe({
    next: v => console.log("observerA: " + v),
  })
  subject.subscribe({
    next: v => console.log("observerB: " + v),
  })

  subject.next(1)
  subject.next(2)

  // output
  // observerA: 1
  // observerB: 1
  // observerA: 2
  // observerB: 2
  ```

### Observable vs Promise

![Observable vs Promise](https://thepracticaldev.s3.amazonaws.com/i/43c9w4p1dw99m0uvcrqs.jpg)

For better understanding, we're going to compare and contrast the ES6 Promise API to the Observable library RxJS. We will see how similar Promises and Observables are as well as how they differ and why we would want to use Observables over promises in certain situations.

**Single value vs multiple values**

- If you make a request through the promise and wait for a response. You can be sure that there won’t be multiple responses to the same request. You can create a Promise, which resolves with some value.
- Promise is always resolved with the first value passed to the resolve function and ignores further calls to it.
- On the contrary, Observables allow you to resolve multiple values until we call `observer.complete()` function.
- Example of Promise and Observable.

  ```javascript
  // creating demoPromise using ES6 Promise API
  const demoPromise = new Promise((resolve, reject) => {
    asyncOperation((err, value) => {
      if (err) {
        reject(err) // error occured. We will catch error inside chain .catch()
      } else {
        resolve(value) // value received. we will get value inside .then() chain method
      }
    })
  })

  // creating a demoObservable using Rxjs.Observable API
  const demoObservable = Rx.Observable.create(observer => {
    asyncOperation((err, value) => {
      if (err) {
        observer.error(err) // instead of reject(err)
      } else {
        observer.next(value) // instead of resolve(value)
        observer.complete() // optional. once your async task finished then call observer.complete()
      }
    })
  })
  ```

````

**Eager vs lazy**
* Promises are eager by design meaning that a promise will start doing whatever task you give it as soon as the promise constructor is invoked.
* Observables are lazy. Observable constructor gets called only when someone actually subscribes to an Observable means nothing happens until you subscribe to it.
* Examples,
```javascript
  // demoPromise started emmiting values but still we have not call .then() method on promise
  const demoPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('emmit value');
      resolve(100);
    }, 3000);
  });

  // demoObservable not started emmiting values unitll we subscribe to it.
  const demoObservable = new Observable(observer => {
    setInterval(() => {
      if (err) {
        observer.error('DemoError throw'); // instead of reject(err)
      } else {
        observer.next('value'); // instead of resolve(value)
        observer.complete(); // optional. once your async task finished then call observer.complete()
      }
    });
  });
````

**Not cancellable vs cancellable**

- One of the first things new promise users often wonder about is how to cancel a promise. ES6 promises do not support cancellation yet. It is, the reality of the matter is cancellation is really an important scenario in client-side programming.
- Use a third party library like a `bluebird` or `axios` they offer promise cancellation feature.
- Observable support cancellation of asynchronous task by calling `unsubscribe()` method on Observable.
- When you subscribe to an Observable, you get back a Subscription, which represents the ongoing execution. Just call `unsubscribe()` to cancel the execution.
- Example of cancellable observable

  ```javascript
  const observable = Rx.Observable.from([10, 20, 30])
  const subscription = observable.subscribe(x => console.log(x))
  // Later:
  subscription.unsubscribe() // its will stop ongoing execution
  ```

### Practical Examples

**Creating observables from values**

```javascript
const observable = Rx.Observable.of("foo", 98, false, ["john", "doe"], {
  age: 19,
  gender: "male",
})

observable.subscribe(val => console.log(val))
```

**Creating Observables from stream of values**

```javascript
const observable = Rx.Observable.create(observer => {
  observer.next("Hello")
  observer.next("Its monday morning!!")
})

observable.subscribe(value => console.log(value))
// output:
// Hello
// It's monday morning
```

**Observable from DOM Events**

```javascript
const button = document.querySelector("button")
const observable = Rx.Observable.fromEvent(button, "click")
observable.subscribe(event => console.log(event))
```

**Observable from Promise**

```javascript
const promise = new Promise((resolve, reject) => {
  asyncOperation((err, value) => {
    if (err) {
      reject(err)
    } else {
      resolve(value)
    }
  })
})

const Observable = Rx.Observable.fromPromise(promise)

Observable.subscribe(value => console.log(value))
```

**Observable from Timer method**

```javascript
const timer = Rx.Observable.timer(3000)

timer.subscribe(() => console.log("timeout!!"))
```

**Observable from Interval**

```javascript
const interval = Rx.Observable.interval(3000)

interval.subscribe(tick => console.log(`${tick} tick`))
```

**Map operator**

```javascript
const observable = Rx.Observable.from(2, 4, 6, 8)

observable.map(value => value * value).subscribe(result => console.log(result))
```

**Do Operator**

```javascript
const dogs = Rx.Observable.of("Buddy", "Charlie", "Cooper", "Rocky")

// do operator used for debugging purpose
dogs
  .do(dog => console.log(dog))
  .filter(dog => dog === "Cooper")
  .do(dog => console.log(dog))
  .subscribe(dog => console.log(dog))
```

**Debounce and Throttle**

- Debounce - Wait X time, then give me the last value.
- Throttle - Give me the first value, then wait X time.

```javascript
const input = document.querySelector("input")
const observable = Rx.Observable.fromEvent(input, "keyup")

observable.debounceTime(3000).subscribe(event => console.log(event))

observable.throttleTime(1000).subscribe(event => console.log(event))
```

**bufferTime** - Collects values from the past as an array, and emits those arrays periodically in time.

```javascript
const clicks = Rx.Observable.fromEvent(document, "click")
const buffered = clicks.bufferTime(1000)
buffered.subscribe(x => console.log(x))
```

**Conclusion**

The promise is the best fit for AJAX operations where Observables are extremely powerful for handling asynchronous tasks. Observables provide a bunch of operators for creating, transforming, filtering and multicasting asynchronous events. Sounds great, doesn’t it? :D

**Closing Note**

Thanks for reading. I hope you like this article feel free to like, comment or share this article with your friends. For more depth understanding of RxJS checkout provided reference links.

**References**

1. [RxJS official website](http://reactivex.io/rxjs/)
2. [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
3. [LearnRxJS](https://www.learnrxjs.io/)
4. [What is RxJS?](https://egghead.io/lessons/rxjs-what-is-rxjs)
5. [RxJS Quick Start With 20 Practical Examples](https://angularfirebase.com/lessons/rxjs-quickstart-with-20-examples/)
6. [Angular official website](https://angular.io/guide/rx-library)
7. [RxJS: Observables, Observers and Operators Introduction](https://toddmotto.com/rxjs-observables-observers-operators)
8. [Promises vs Observables](https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13)
