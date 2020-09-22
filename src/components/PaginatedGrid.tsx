import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React, { useContext } from 'react';
import { StateContext } from '../state';

interface PaginatedGridProps {
    getIssues: (page?: number | null, perPage?: number | null) => void;
    perPage: number;
    total: number;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    ul: {
        justifyContent: 'center',
    },
}));

export const PaginatedGrid = (
    props: PaginatedGridProps
) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(StateContext);
    const { currentPage, itemsPerPage } = state;

    const onChange = (e, value) => {
        dispatch({ type: 'currentPage', value });
        props.getIssues(value, itemsPerPage);
    };

    if (props.total === 0) {
        return null;
    }

    return (
        <Pagination
            count={props.total}
            onChange={onChange}
            size="large"
            classes={{ root: classes.root, ul: classes.ul }}
            page={currentPage}
        />
    );
};
