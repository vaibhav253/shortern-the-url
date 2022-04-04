import { useEffect } from 'react';
import './App.css';
import { useGlobalContext } from './context/context';
import { Home } from './screens/home/home';

function App() {
  const { setURL } = useGlobalContext();
  
  useEffect(() => {
    const url = localStorage.getItem('urls')
    if (url) {
      setURL(JSON.parse(url))
    }
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
