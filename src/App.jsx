import { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Router from './routes/Router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './components/redux/store';
function App() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  })


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* It's a Router from './routes/Router' */}
        <Router />
      </PersistGate >
    </Provider>
  )
}

export default App
