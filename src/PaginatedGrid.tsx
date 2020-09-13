import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';

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

const PaginatedGrid: React.FC<PaginatedGridProps> = (
    props: PaginatedGridProps
) => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [props.perPage]);

    const onChange = (e, value) => {
        props.getIssues(value, props.perPage);
        setCurrentPage(value);
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

export default PaginatedGrid;
