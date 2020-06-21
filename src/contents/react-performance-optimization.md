---
title: React Performance Optimization
slug: "react-performance-optimization"
date: "2020-04-26"
description: "After a long time break, I'm again focusing on writing articles on dev.to. In this article, I want to cover a way to avoid re-renders of react components."
---

Hey folks, I hope you' all doing well.

After a long time break, I'm again focusing on writing articles on dev.to. In this article, I want to cover a way to avoid re-renders of react components.

### #1 Avoid passing unnecessary props to children components

Component with limited props is always performed better than component having many props. This is always a good way to drop props that are not used inside children components. Here is an example that shows a clear picture of it.

```jsx
import React from "react"
import { render } from "react-dom"

function Avatar(props) {
  return (
    <div className="avatar-wrapper">
      <img className="avatar-img" alt="avatar" src={props.user.image} />
      <div className="avatar-name">{props.user.name}</div>
    </div>
  )
}

const user = {
  id: 1,
  name: "Leanne Graham",
  image: "https://i.picsum.photos/id/237/200/300.jpg",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    city: "Gwenborough",
    zipcode: "92998-3874",
  },
}

render(<Avatar user={user} />, document.getElementById("root"))
```

In this example, `<Avatar />` component only needs `image` and `name` props. So whenever other props like `username`, `email`, or `address` get updated then `<Avatar />` component re-renders. That's leading to a performance issue in the long term. There are many ways to drop props and this is up to you how you want to drop passing props. Here is the way I do.

```jsx
import React from "react"
import { render } from "react-dom"

function Avatar(props) {
  return (
    <div className="avatar-wrapper">
      <img className="avatar-img" alt="avatar" src={props.image} />
      <div className="avatar-name">{props.name}</div>
    </div>
  )
}

const user = {
  id: 1,
  name: "Leanne Graham",
  image: "https://i.picsum.photos/id/237/200/300.jpg",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    city: "Gwenborough",
    zipcode: "92998-3874",
  },
}

render(
  <Avatar name={user.name} image={user.image} />,
  document.getElementById("root")
)
```

### #2 Common fixing scenarios for object & function props

`React` is one-way data flow down the component hierarch. So sometimes we may need to pass a function to the child component. When we're passing object and functional props to children component then we've to do one more step to avoid re-creating objects and function during re-renders. Here is an example that will better explain this concept.

```jsx
import React from "react"
import { render } from "react-dom"

function Alert(props) {
  return (
    <div
      className="alert-wrapper"
      style={{ display: props.showAlert ? "block" : "none" }}
    >
      <div className="alert-close" onClick={props.handleCloseAlert}>
        X
      </div>
      <div className="alert-title">{props.alertData.title}</div>
      <div className="alert-description">{props.alertData.description}</div>
    </div>
  )
}

function App() {
  const [showAlert, setShowAlert] = React.useState(false)
  const [counter, setCounter] = React.useState(0)

  const alertData = {
    title: "There was an error processing your request",
    description: "Please try again...",
  }

  const handleShowAlert = () => {
    setShowAlert(true)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const handleIncrementCounter = () => {
    setCounter(counter + 1)
  }

  return (
    <div>
      <button onClick={handleIncrementCounter}>counter: {counter}</button>
      <button onClick={handleShowAlert}>Show Me Alert</button>
      <Alert
        showAlert={showAlert}
        alertData={alertData}
        handleCloseAlert={handleCloseAlert}
      />
    </div>
  )
}

render(<App />, document.getElementById("root"))
```

In this example, we've created two components `<App />` and `<Alert />`. `<App/>` is a parent component where we've defined stateful logic for handling `<Alert />` component. Here are some `ReactDevTool` profiler images for understanding whats going on.

![profiler-app-0](https://dev-to-uploads.s3.amazonaws.com/i/kk0sg83ty65zapfrwqsr.png)

![profiler-alert-0](https://dev-to-uploads.s3.amazonaws.com/i/zgjronr8uwe0dluar0oa.png)

Whenever parent component state gets updated then children also get re-rendered and we can avoid re-renders of children component by using `memo`, `PureComponent`, or `shouldComponentUpdate()` method. But this is will not help you for comparing object and functional props because every time it will create a new reference for object and function. There are a couple of ways to prevent re-creating it.

For object, you need to wrap object inside `React.useMemo()` like below.

```jsx
const alertData.= React.useMemo(() => {
 title: 'There was an error processing your request',
 description: 'Please try again...'
}, [])
```

For functions, you need to wrap function inside `React.useCallback()` like below.

```jsx
const handleCloseAlert = React.useCallback(() => {
  setShowAlert(false)
}, [])
```

Second argument for `React.useMemo()` and `React.useCallback()` is array dependencies. Empty array of dependencies specific that we don't want to re recompute value for `React.useMemo()` and memoized callback for `React.useCallback()`. There may be a circumstance where we've to recompute values and memoized callbacks and that's up to you.

Here is an improved version of the above example.

```jsx
import React from "react"
import { render } from "react-dom"

function Alert(props) {
  return (
    <div
      className="alert-wrapper"
      style={{ display: props.showAlert ? "block" : "none" }}
    >
      <div className="alert-close" onClick={props.handleCloseAlert}>
        X
      </div>
      <div className="alert-title">{props.alertData.title}</div>
      <div className="alert-description">{props.alertData.description}</div>
    </div>
  )
}

function App() {
  const [showAlert, setShowAlert] = React.useState(false)
  const [counter, setCounter] = React.useState(0)

  const alertData = React.useMemo(
    () => ({
      title: "There was an error processing your request",
      description: "Please try again...",
    }),
    []
  )

  const handleShowAlert = React.useCallback(() => {
    setShowAlert(true)
  }, [])

  const handleCloseAlert = React.useCallback(() => {
    setShowAlert(false)
  }, [])

  const handleIncrementCounter = React.useCallback(() => {
    setCounter(counter + 1)
  }, [counter])

  return (
    <div>
      <button onClick={handleIncrementCounter}>counter: {counter}</button>
      <button onClick={handleShowAlert}>Show Me Alert</button>
      <Alert
        showAlert={showAlert}
        alertData={alertData}
        handleCloseAlert={handleCloseAlert}
      />
    </div>
  )
}

render(<App />, document.getElementById("root"))
```

![profiler-app-1](https://dev-to-uploads.s3.amazonaws.com/i/7hyh81guip63hmsxsi3l.png)
![profiler-alert-1](https://dev-to-uploads.s3.amazonaws.com/i/0fmfks6dpmkoqx6lay9p.png)

### #3 React.memo with react-fast-compare

Using `React.memo()` for every component is risky because it explicitly caches the function, which means that it stores the result in memory. If you do this with too many or too big components this leads to more memory consumption. That's why you should be careful when memoizing large components.

{% twitter 1083897065263034368 %}

Mostly, we can avoid re-rendering by passing limited props. if you still want to use `React.memo()` then firstly see if default `React.memo` will works for you. If it won't then understand and identify the bottleneck in your component by using `ReactDevTools` profiler. After all, you determined that this problem could be resolved by using deep equality checks between `prevProps` and `nextProps`.

Let's see in the example,

```jsx
import React from "react"
import { render } from "react-dom"
import isEqual from "react-fast-compare"

function Input(props) {
  return <input value={props.value} onChange={props.handleOnChange} />
}

const MemoizedInput = React.memo(Input, isEqual)

function App() {
  const [username, setUsername] = React.useState("")

  const handleOnChange = React.useCallback(e => {
    setUsername(e.target.value)
  }, [])

  return <MemoizedInput value={username} handleOnChange={handleOnChange} />
}

render(<App />, document.getElementById("root"))
```

Thanks for reading. I hope you like this article feel free to like, comment, or share this article with your friends.
