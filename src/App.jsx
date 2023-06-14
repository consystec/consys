import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import faviconImage from '../icons/logo-small-simbolo-consystec-semfundo.png';
import Components from './Components';
import favicon from './favicon/favicon';

favicon.set({ url: faviconImage });

const App = () => {
  return (
    <IntlProvider locale="pt">
      <BrowserRouter>
        <Routes>
          <Route index
            element={<Components />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;