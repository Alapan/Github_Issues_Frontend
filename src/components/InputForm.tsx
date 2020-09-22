import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const useStyles = makeStyles({
    input: {
        margin: '20px',
    },
    labelRoot: {
        padding: '20px',
    },
});

interface InputFormProps {
    onClick: (event) => void;
    onOwnerChange: (event) => void;
    onRepoChange: (event) => void;
    owner: string;
    repo: string;
}

export const InputForm = (props: InputFormProps) => {
    const {
        onClick,
        onOwnerChange,
        onRepoChange,
        owner,
        repo
    } = props;
    const classes = useStyles();
    return (
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
    );
}