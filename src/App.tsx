import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import IssueTable from './IssueTable';
import ItemsPerPageSelector from "./ItemsPerPageSelector";
import PaginatedGrid from "./PaginatedGrid";
import TextField from '@material-ui/core/TextField';
import './App.css';

const App: React.FC = () => {

  const [repo, setRepo] = useState<String>('');
  const [owner, setOwner] = useState<String>('');
  const [issues, setIssues] = useState<[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<Number>(0);

  const getIssueCount = (per_page: number): void => {
    fetch(`http://localhost:8000/issues/${owner}/${repo}/count`)
      .then((countResult) => {
        countResult.json()
          .then((data) => {
            setNumberOfPages(Math.ceil(data.total_count / per_page));
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
          onChange={(e) => setRepo(e.target.value)}
          value={repo}
        />
        <TextField
          required id='owner'
          label='Owner'
          variant='outlined'
          onChange={(e) => setOwner(e.target.value)}
          value={owner}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => getIssues()}
        >Get issues</Button>
      </form>
      <ItemsPerPageSelector
        getIssues={getIssues}
        total={parseInt(numberOfPages.toString())}
      />
      <PaginatedGrid
        getIssues={getIssues}
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
