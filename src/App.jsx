import { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Router from './routes/Router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './components/redux/store';
import { AuthProvider } from './context/provider/AuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  })


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          {/* It's a Router from './routes/Router' */}
          <Router />

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthProvider>
      </PersistGate >
    </Provider>
  )
}

export default App
