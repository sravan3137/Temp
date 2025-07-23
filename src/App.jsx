import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style.css'
import {Homepage} from './components/Homepage.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex-1 h-full w-full"> 
        <Homepage/>
      </div>
    </>
  )
}

export default App
