# useCallback() hook
- useCallback() is a React hook that lets you **cache a function definition between re-renders**.
```
const cachedFunction = useCallback(fn, dependencies);
```
- Majority of the function remains same (except for some true/false values), so under the hood it uses some techniques known as **MEMOIZATION**.
- Memoization - storing the functions in a faster memory(stack/cache)

```
const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+'
    // generating a random string for password
    for (let i = 0; i < length; i++) {
      // generate a random number between 0 and given range and push it to pass variable
      const index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }
    // change password state variable
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])
```
- useCallback(()=>{ callback to this function },[dependency array]) - takes in a callback function as well as a dependency array same as **useEffect**

## useRef() hook
- This hook is used to store the reference of the variable
- Think of ref as state but unlike state, ref doesnt trigger the re-render of a component
- It is not used in return part of component i.e. it is not used for rendering. **It is used for values that are not required for rendering**
```
import { useRef, useState } from 'react'

const UseRefuseState = () => {
  const [count, setCount] = useState(0)
  // store reference of count
  const countRef = useRef(0)

  const handleIncrement = () => {
    setCount(count + 1)
    countRef.current++

    console.log('State is ' + count)
    console.log('Ref is ' + countRef.current)
  }

  return (
    <div className="text-xl">
      Count: {count}
      <button
        className="bg-blue-400 p-4 m-4 rounded-lg"
        onClick={handleIncrement}
      >
        Increment
      </button>
    </div>
  )
}
export default UseRefuseState
```

- We see count: 1 on the screen
- State is 0 in console
- Ref is 1 in console
- This is because React increments the count in setCount first and then proceeds further to increment the reference but the new state is not accessible yet before the re-render hence state:0 but on screen the render has triggered hence count:1

- useRef allows you to read updated value instantly instead of waiting for a re-render
- The reason being useRef doesnt trigger a re-render
- useRef might be used for accessing data in the background not for re-rendering

- for ex:- 
if we do
```

  const handleIncrement = () => {
   
    countRef.current++

    <!-- console.log('State is ' + count) -->
    console.log('Ref is ' + countRef.current)
  }
return (
    <div className="text-xl">
      Count: {countRef.current}
      <button
        className="bg-blue-500 p-3 m-4 rounded-lg hover:bg-blue-400 hover:scale-105"
        onClick={handleIncrement}
      >
        Increment
      </button>
      {/* {console.log(count)} */}
    </div>
  )
```
- The value of count on screen will not change as the component doesnt re-render although the Ref in console keeps changing (after removing the setCount)
- If we add back setCount(count+1), it will  trigger a re-render and the component starts working normally