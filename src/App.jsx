
import { useEffect } from 'react';
import './App.css';
import Router from './routes/Router';
function App() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  })


  return (
    <>
      {/* It's a Router from './routes/Router' */}
      <Router />
    </>
  )
}

export default App
