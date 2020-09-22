import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { StateContext } from '../state';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface ItemsPerPageSelectorProps {
    getIssues: (page?: number | null, perPage?: number | null) => void;
    total: number;
}

export const ItemsPerPageSelector = (
    props: ItemsPerPageSelectorProps
) => {
    const handleChange = (event) => {
        dispatch({ type: 'itemsPerPage', value: event.target.value });
        dispatch({ type: 'currentPage', value: 1 });
        props.getIssues(1, event.target.value);
    };

    const classes = useStyles();
    const { state, dispatch } = useContext(StateContext);
    const { itemsPerPage } = state;

    if (props.total === 0) {
        return null;
    }

    return (
        <div>
            <h4>Showing {itemsPerPage} items per page</h4>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                    Items per page
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={itemsPerPage}
                    onChange={handleChange}
                    label="Items per page"
                >
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={80}>80</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};
