import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  // track length of password
  const [length, setLength] = useState(6)
  // state for tracking password
  const [password, setPassword] = useState('')
  // state to track numberAllowed or not
  const [numberAllowed, setNumberAllowed] = useState(false)
  // state to track special character allowed or not
  const [charAllowed, setCharAllowed] = useState(false)

  // state to change button text
  const [copied,setCopied] = useState(false);

  const passwordRef = useRef(null);

  // method that runs on "copy" button onClick event
  const copyPasswordToClipboard = () => {
    // copy password to clipboard function
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    // passwordRef.current.setSelectionRange(0,4)

    // set button text to copied
    setCopied(true)

    // set text back to copy after a fixed amount of time
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  
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
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            id=""
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            {copied?'Copied!':'Copy'}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              id=""
            />
            <label htmlFor="Number">Number</label>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                name=""
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
                id=""
              />
              <label htmlFor="charInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
