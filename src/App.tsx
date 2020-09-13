import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import IssueTable from './IssueTable';
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import PaginatedGrid from "./PaginatedGrid";
import {StateContext} from "./state";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import './App.css';

const useStyles = makeStyles({
  input: {
    margin: '20px'
  },
  labelRoot: {
    padding: '20px'
  }
});

const App: React.FC = () => {

  const [issues, setIssues] = useState<[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<Number>(0);
  const [perPage, setPerPage] = useState(30);
  const { state, dispatch } = useContext(StateContext);
  const { owner, repo } = state;
  const classes = useStyles()

  const getIssueCount = (per_page: number): void => {
    fetch(`http://localhost:8000/issues/${owner}/${repo}/count`)
      .then((countResult) => {
        countResult.json()
          .then((data) => {
            setNumberOfPages(Math.ceil(data.total_count / per_page));
            setPerPage(per_page);
          });
      })
      .catch((err) => console.error(err));
  }

  const getIssues = (page?: number | null, per_page?: number | null): void => {
    page = page ? page : 1;
    per_page = per_page ? per_page : 30;
    getIssueCount(per_page);

    fetch(`http://localhost:8000/issues/${owner}/${repo}/${page}/${per_page}`)
      .then(( issuesResult) => {
        issuesResult.json()
          .then((data) => {
            setIssues(data);
          });
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className='App'>
      <form noValidate autoComplete='off'>
        <TextField
          required id='repo'
          label='Repository Name'
          variant='outlined'
          onChange={(e) => dispatch({ type: 'repo', value: e.target.value})}
          value={repo}
          InputProps={{ className: classes.input }}
          InputLabelProps={{classes: {
            root: classes.labelRoot
          }}}
        />
        <TextField
          required id='owner'
          label='Owner'
          variant='outlined'
          onChange={(e) => dispatch({ type: 'owner', value: e.target.value})}
          value={owner}
          InputProps={{ className: classes.input }}
          InputLabelProps={{classes: {
            root: classes.labelRoot
          }}}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => getIssues()}
          className={classes.input}
        >Get issues</Button>
      </form>
      <ItemsPerPageSelector
        getIssues={getIssues}
        total={parseInt(numberOfPages.toString())}
      />
      <PaginatedGrid
        getIssues={getIssues}
        per_page={perPage}
        total={parseInt(numberOfPages.toString())}
      ></PaginatedGrid>
      <IssueTable
        issues={issues}
        owner={owner}
        repo={repo}
      />
    </div>
  );
};

export default App;
