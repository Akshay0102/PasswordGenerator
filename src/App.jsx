import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*()_+{}:"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, charallowed, numberallowed, setPassword])

  const copypasswordtoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }, [password])

  //ref hook
  const passwordRef = useRef(null)

  useEffect(() => {
    passwordgenerator()
  }, [length, numberallowed, charallowed, passwordgenerator])

  return (

    <div className='w-full h- max-w-md  mx-auto shadow-md rounded-lg px-10 py-3 my-8 text-orange-500 bg-gray-800 '>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        {<input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          ref={passwordRef}
          readOnly
        />}
        <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copypasswordtoclipboard}
        >
          copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            id="numberInput"
            onChange={() => {
              setnumberallowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charallowed}
            id="characterInput"
            onChange={() => {
              setcharallowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>

  )
}

export default App
