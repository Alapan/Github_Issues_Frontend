import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

interface PaginatedGridProps {
  getIssues: (page? : number) => void,
  total: number
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginatedGrid: React.FC<PaginatedGridProps> = (props: PaginatedGridProps) => {
  const classes = useStyles();

  if(props.total === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Pagination
        count={props.total}
        onChange={(e, value) => props.getIssues(value)}
        size='large'
      />
    </div>
  );
};

export default PaginatedGrid;
