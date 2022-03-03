# use-actual-callback

## Installation

```sh
$ yarn add use-actual-callback
```

## Why?

`useCallback` is over complicated and useless in some cases:

- When your function depends on many external variables and props, the reference returned from `useCallback` changes often and triggers undesired renders and effects.
- You always need to pass dependencies. Sometimes it can be a really big array. Of course, you need to avoid such situations, but in some cases it's hard to do.

`useActualCallback` is the better version of useCallback:

- When you're accessing the external variables inside the callback, you always get the actual value. It's possible because `useActualCallback` wraps your function in the other one. Your function is always the last passed inside, but the wrapper has the stable reference, that doesn't change at all.
- The returned function is always the same.
- You don't need to pass dependencies array. Never.

## Usage

```tsx
import { useActualCallback } from 'use-actual-callback'

const MyComponent = () => {
  const [one, setOne] = useState(/* ... */)
  const [two, setTwo] = useState(/* ... */)
  const [three, setThree] = useState(/* ... */)

  const doSomething = useActualCallback(() => {
    // one, two and three are always actual
    console.log({ one, two, three })
  })
}
```
