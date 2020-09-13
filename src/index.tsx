import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import IssueEvents from './IssueEvents';
import { StateProvider } from './state';

ReactDOM.render(
    <StateProvider>
        <Router>
            <Switch>
                <Route exact={true} path="/" component={App} />
                <Route
                    path="/issues/:owner/:repo/:issue_id/events"
                    component={IssueEvents}
                />
            </Switch>
        </Router>
    </StateProvider>,
    document.getElementById('root')
);
