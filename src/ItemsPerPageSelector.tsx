import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  getIssues: (page?: number | null, per_page?: number) => void,
  total: number
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = (props: ItemsPerPageSelectorProps) => {

  const handleChange = (event: any) => {
    setItemsPerPage(event.target.value);
    props.getIssues(null, event.target.value);
  };

  const classes = useStyles();
  const [itemsPerPage, setItemsPerPage] = useState(30);

  if (props.total === 0) {
    return null;
  }

  return (
    <div>
      <h4>Showing {itemsPerPage} items per page</h4>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-filled-label'>Items per page</InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={itemsPerPage}
          onChange={handleChange}
          label='Items per page'
        >
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={80}>80</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default ItemsPerPageSelector;
