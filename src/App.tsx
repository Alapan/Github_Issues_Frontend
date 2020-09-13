import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useContext, useState } from 'react';
import './App.css';
import IssueTable from './IssueTable';
import ItemsPerPageSelector from './ItemsPerPageSelector';
import PaginatedGrid from './PaginatedGrid';
import { StateContext } from './state';

const useStyles = makeStyles({
    input: {
        margin: '20px',
    },
    labelRoot: {
        padding: '20px',
    },
});

const App: React.FC = () => {
    const [issues, setIssues] = useState<[]>([]);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [perPage, setPerPage] = useState(30);
    const { state, dispatch } = useContext(StateContext);
    const { owner, repo } = state;
    const classes = useStyles();

    const getIssueCount = (perPage: number): void => {
        fetch(`http://localhost:8000/issues/${owner}/${repo}/count`)
            .then((countResult) => {
                countResult
                    .json()
                    .then((data) => {
                        setNumberOfPages(Math.ceil(data.total_count / perPage));
                        setPerPage(perPage);
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    const getIssues = (page?: number | null, perPage?: number | null): void => {
        page = page ? page : 1;
        perPage = perPage ? perPage : 30;
        getIssueCount(perPage);

        fetch(
            `http://localhost:8000/issues/${owner}/${repo}/${page}/${perPage}`
        )
            .then((issuesResult) => {
                issuesResult
                    .json()
                    .then((data) => {
                        setIssues(data);
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    const onClick = () => getIssues();

    const onRepoChange = (e) => {
        dispatch({ type: 'repo', value: e.target.value });
    };

    const onOwnerChange = (e) => {
        dispatch({ type: 'owner', value: e.target.value });
    };

    return (
        <div className="App">
            <form noValidate={true} autoComplete="off">
                <TextField
                    required={true}
                    id="repo"
                    label="Repository Name"
                    variant="outlined"
                    onChange={onRepoChange}
                    value={repo}
                    InputProps={{ className: classes.input }}
                    InputLabelProps={{
                        classes: {
                            root: classes.labelRoot,
                        },
                    }}
                />
                <TextField
                    required={true}
                    id="owner"
                    label="Owner"
                    variant="outlined"
                    onChange={onOwnerChange}
                    value={owner}
                    InputProps={{ className: classes.input }}
                    InputLabelProps={{
                        classes: {
                            root: classes.labelRoot,
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                    className={classes.input}
                >
                    Get issues
                </Button>
            </form>
            <ItemsPerPageSelector
                getIssues={getIssues}
                total={parseInt(numberOfPages.toString(), 10)}
            />
            <PaginatedGrid
                getIssues={getIssues}
                perPage={perPage}
                total={parseInt(numberOfPages.toString(), 10)}
            />
            <IssueTable issues={issues} owner={owner} repo={repo} />
        </div>
    );
};

export default App;
