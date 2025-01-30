import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../global/store';
import AppContent from '../components/AppContent';
import { BrowserRouter } from 'react-router';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App;