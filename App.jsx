import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import { IntlProvider } from 'react-intl';
import faviconImage from '../icons/logo-small-simbolo-consystec-semfundo.png';
import Components from './Components';
import favicon from './favicon/favicon';

favicon.set({ url: faviconImage });

const App = () => {
  return (
    <ConfigProvider locale={ptBR}>
      <IntlProvider locale="pt">
        <Router>
          <Switch>
            <Route path="/"
              exact
              component={Components} />
          </Switch>
        </Router>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;