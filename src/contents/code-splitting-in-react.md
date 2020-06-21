---
title: Code splitting in React
slug: "code-splitting-in-react"
date: "2018-10-07"
description: "In the JavaScript eco-system, there are excellent libraries and framework available on the package manager registry and in day to day life we are importing it into our project. That's okay when you have just started your project but as soon as your project grows your facing a lot of performance related issues."
---

Hi, I'm Sagar working as a senior software engineer. I love to write articles which will help developers to **understand the magic of JavaScript**. If you have any questions about the article, leave a comment and I'll get back to you, or find me on twitter [@sagar_dev44](https://twitter.com/sagar_dev44).

In the JavaScript eco-system, there are excellent libraries and framework available on the package manager registry and in day to day life we are importing it into our project. That's okay when you have just started your project but as soon as your project grows your facing a lot of performance related issues.

In this article, we are going to focusing on common issues like a large bundle size slow startup and resolving it simply implement code splitting in React app.

## Bundling

Mostly modern apps are "bundled" down to single file by using [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/). Bundling codebase is the excellent way until your app is pretty small with limited dependencies. As soon as your codebase grows, your bundle size will grow too and then problems happening started like a large bundle size, slow startup, and slow hot module replacement etc.

If your curious about how bundling works, I strongly recommanded you to read official documentation of webpack.

## Code Splitting

The perfect solution for handling a large bundle size and slow startup is to implement code splitting in you're app i.e. split your code into smaller chunks which can then be loaded on demand or in parallel.

Best practice is to keep your chunks size under 150KB, so that the app becomes more interactive within 3–5 seconds, even on poor networks.

The significant benefit of creating apps with [Create React App](https://github.com/facebook/create-react-app), [Next.js](https://nextjs.org/), or [Gatsby](https://gatsbyjs.org/), because they provide code splitting setup out of the box or you can set up by yourself.

If you want to setup code splitting by yourself see the [Installation](https://webpack.js.org/guides/installation/) and [Getting Started](https://webpack.js.org/guides/getting-started/) guides on the Webpack docs.

## `import()` – dynamically import ES modules

The best way to start introducing code splitting into your app is through the dynamic import(). It enables us to dynamic loading of ES modules. By default, ES modules are completely static. You must specify what you import and export at compile-time and you can’t change it at runtime.

```jsx
import CONSTANTS from "./constants/someFile.js" // importing CONSTANTS from someFile.js by using es import
```

ES modules have few limitations like es module should only appear at the top level of a file means if we mention any statement above es module import it will throw an error and another is that a module path is fixed we can't compute or dynamically alter it.

For example,

```jsx
const double = x => x * x
import CONSTANTS from "./constants/someFile.js" // it will throw an error because we created double function above es import module
```

On the other side, both es module limitations have overcome by dynamic import() es module and also provides asynchronous module importing feature.

```jsx
const modulePath = "./someFile.js" // path of module
// dynamic import() module
import(modulePath).then(module => {
  return module.default // return default function of es module
})
```

With dynamic `import()` we can specify the es module path or we can alter path in runtime and it returns a promise and we have to handle this promise in `.then()` method or `.catch()` method if it throws an error.

Note that, the dynamic `import()` syntax is an ECMAScript (JavaScript) proposal not currently part of the language standard. It is expected to be accepted in the near future.

There is two way of implementing code splitting in your app as `route-based` or `component-based` code splitting. You have to decide where in your app to introduce code splitting can be a bit tricky.

## Route based code splitting

A good place to start code splitting is with app routes. Break down an application into chunks per route, and then load that chunk when user navigate that route. Under the hood, webpack takes care of creating chunks and serve chunks to the user on demand.

We have to just create asyncComponent and import the desired component by using dynamic `import()` function.

Let's create an `asyncComponent` component which takes the desired component through dynamic `import()` return a promise for a component. After component promise has been successfully resolved then it returns the desired component. In simple word, dynamic `import()` imports component asynchronously.

```jsx
// filename: asyncComponent.jsx
import React, { Component } from "react"

const asyncComponent = getComponent => {
  // return AsyncComponent class component
  return class AsyncComponent extends Component {
    static Component = null
    state = {
      Component: AsyncComponent.Component, // first time similar to static Component = null
    }

    componentWillMount() {
      if (!this.state.Component) {
        // if this.state.Component is true value then getComponent promise resolve with .then() method
        // For simplicity, I haven't caught an error, but you can catch any errors or show loading bar or animation to user etc.
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component
          this.setState({ Component }) // update this.state.Component
        })
      }
    }

    render() {
      const { Component } = this.state // destructing Component from this.state
      if (Component) {
        // if Component is truthy value then return Component with props
        return <Component {...this.props} />
      }
      return null
    }
  }
}

export default asyncComponent
```

We are doing a few things here:

1. The `asyncComponent` function takes `getComponent` as an argument that when called will dynamically `import()` function a given component.
2. On `componentWillMount`, we simply resolve promise with `.then()` method and then mutate `this.state.Component` state to the dynamically loaded component.
3. Finally, In `render()` method we are returning loaded component from `this.state.Component` with `props`.

Now, it's time to use `asyncComponent`. Start with separating routes of an app with react-router-app.

```jsx
// filename: index.js
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import asyncComponent from "./asyncComponent"

// import components with asyncComponent (indirectly using dynamic import() function)
const App = asyncComponent(() => import("./App"))
const About = asyncComponent(() => import("./About"))
const PageNotFound = asyncComponent(() => import("./PageNotFound"))

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/about" component={About} exact />
      <Route component={PageNotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
)
```

If you run `yarn run build` with an app created by `Create React App`, you’ll see our app has been split into several chunks.

```bash
# Before implementing code splitting

File sizes after gzip:

  38.35 KB  build/static/js/1.3122c931.chunk.js
  797 B     build/static/js/main.70854436.chunk.js
  763 B     build/static/js/runtime~main.229c360f.js
  511 B     build/static/css/main.a5142c58.chunk.css

# After implementing code splitting

File sizes after gzip:

  38.33 KB  build/static/js/5.51b1e576.chunk.js
  1.42 KB   build/static/js/runtime~main.572d9e91.js
  799 B     build/static/js/main.3dd161f3.chunk.js
  518 B     build/static/js/1.5f724402.chunk.js
  327 B     build/static/css/1.f90c729a.chunk.css
  275 B     build/static/css/main.6a5df30c.chunk.css
  224 B     build/static/js/2.4a4c0b1e.chunk.js
  224 B     build/static/js/3.76306a45.chunk.js
```

If you clearly observed chunks size, except two or three chunks remaining all chunks size are below than 100KB.

Don't overthink about `asyncComponent` coding stuff later we will introduce a `React-Loadable` library which gives us a flexible apis for achieving code splitting.

## Component-based code splitting

As we saw earlier, route based code splitting is pretty straightforward where we break down chunks as app route.

If your specific route is too complex where the massive use of UI components, models, tabs etc. and has chunk size goes bigger then standard chunk size like 150KB. In such a scenario we have to move one step forward for splitting code on basis of components also called as **component based code splitting**.

```jsx
// filename: App.jsx
import React, { Component } from "react"
import asyncComponent from "./asyncComponent" // imported asyncComponent

// simple class based App component
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Greeting: null, // <== initially set to null
    }
  }

  // handle button clicks
  handleButtonClick = () => {
    if (!this.state.Greeting) {
      // load Greeting component with dynamic import
      const Greeting = asyncComponent(() => import("./Greeting"))
      this.setState(prevState => {
        return {
          Greeting,
        }
      })
    }
  }

  render() {
    const { Greeting } = this.state // grab Greeting component from state
    return (
      <React.Fragment>
        <button onClick={this.handleButtonClick}>Click me</button>
        {Greeting && <Greeting message="lorem ipsum dummy message" />}
      </React.Fragment>
    )
  }
}

export default App
```

We are doing a few things here:

1. We have created a simple `<App />` class component with a `button`.
2. In `<App />` component, on button click we are dynamically importing `<Greeting/>` component and stored inside `this.state.Greeting` state.
3. In render() method, firstly we destructuring `Greeting` from `this.state` and stored in a `Greeting` constant. Later with logical `&&` (AND) operator, we cross-checking that it's not `null` value. Once Greeting is truth value then we are utilizing `<Greeting />` component directly into `jsx`.
4. Behind the scene, Webpack create separate chunk for `<Greeting />` component and serve to the user on demand.

## React Loadable

`React Loadable` is a small library designed by [@jamiebuilds](https://twitter.com/jamiebuilds), that makes extremely easy to implement code splitting in React apps. It accomplishes code splitting by using dynamic `import()` and Webpack.

`React Loadable` provides `Loadable` higher order component which lets you dynamically load any module before rendering it into your app.

Install react-loadable package into your app by using npm or yarn.

```bash
yarn add react-loadable # I'm sticking with yarn for this article.
```

**Implement router based code splitting using React Loadable**

`React Loadable` is pretty straightforward, you haven't required to make any asynchronous component or not required to write complicated setup. Just import `Loadable` component and provide `loader`.

```jsx
// filename: index.js
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Loadable from "react-loadable"

const Loading = () => <h1>Loading...</h1> // loading component

// dynamic loading <App />, <About /> and <PageNotFound /> components
// Loadable is higher order components. it takes loader which dynamic import() of desired component
// and loading which component shows during successfully resolving dyanmic import()
const App = Loadable({
  loader: () => import("./App"),
  loading: Loading,
})

const About = Loadable({
  loader: () => import("./About"),
  loading: Loading,
})

const PageNotFound = Loadable({
  loader: () => import("./PageNotFound"),
  loading: Loading,
})

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/about" component={About} exact />
      <Route component={PageNotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
)
```

**Implement component based code splitting using React Loadable**

Component based code splitting is as simple as we have already seen in the previous section.

```jsx
import React, { Component } from "react"
import Loadable from "react-loadable"

const Loading = () => <h1>Loading...</h1> // loading component

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Greeting: null,
    }
  }

  handleButtonClick = () => {
    if (!this.state.Greeting) {
      // load Greeting component with Loadable component
      const Greeting = Loadable({
        loader: () => import("./Greeting"),
        loading: Loading,
      })
      this.setState(prevState => {
        return {
          Greeting,
        }
      })
    }
  }

  render() {
    const { Greeting } = this.state // grab Greeting component from state
    return (
      <React.Fragment>
        <button onClick={this.handleButtonClick}>Click me</button>
        {Greeting && <Greeting message="lorem ipsum dummy message" />}
      </React.Fragment>
    )
  }
}

export default App
```

I hope you have enjoyed this article. If your curious or want to explore more in code splitting I have provided great references for you.

You have done code splitting in React. Now, It's party time.

![party time](https://media.giphy.com/media/s2qXK8wAvkHTO/giphy.gif)

## References

1. <https://reactjs.org/docs/code-splitting.html>
2. <https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/>
3. <https://hackernoon.com/effective-code-splitting-in-react-a-practical-guide-2195359d5d49>
4. <https://alligator.io/react/react-loadable/>
5. <https://webpack.js.org/guides/code-splitting/>
