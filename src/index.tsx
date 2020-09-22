import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { App } from './components/App';
import { IssueEventsTable } from './components/IssueEventsTable';
import { StateProvider } from './state';

ReactDOM.render(
    <StateProvider>
        <Router>
            <Switch>
                <Route exact={true} path="/" component={App} />
                <Route
                    path="/issues/:owner/:repo/:issue_id/events"
                    component={IssueEventsTable}
                />
            </Switch>
        </Router>
    </StateProvider>,
    document.getElementById('root')
);
