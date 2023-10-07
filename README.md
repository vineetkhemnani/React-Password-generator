# useCallback() hook
- useCallback() is a React hook that lets you **cache a function definition between re-renders**.
```
const cachedFunction = useCallback(fn, dependencies);
```
- Majority of the function remains same (except for some true/false values), so under the hood it uses some techniques known as **MEMOIZATION**.
- Memoization - storing the functions in a faster memory(stack/cache)