import { useState } from "react"
import { Widget } from "./components/Widget"


export function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode && 'dark'} flex gap-2`}>
      <button onClick={() => setDarkMode(!darkMode)}>
          Darkmode
      </button>
      <Widget />
    </div>
  )
}

export default App
