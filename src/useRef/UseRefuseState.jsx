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
        className="bg-blue-500 p-3 m-4 rounded-lg hover:bg-blue-400 hover:scale-105"
        onClick={handleIncrement}
      >
        Increment
      </button>
      {/* {console.log(count)} */}
    </div>
  )
}
export default UseRefuseState
