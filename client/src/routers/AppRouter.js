import React from 'react';
// import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import App from '../components/App';
import GamePage from '../components/GamePage';
import Login from '../components/Login';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={App} exact={true} />
          <Route path="/login" component={Login}/>
          <Route path="/gamepage" component={GamePage}/>
          <Route path="*" component={App} />
        </Switch>
      </div>
    </Router>
  );
  
export default AppRouter;