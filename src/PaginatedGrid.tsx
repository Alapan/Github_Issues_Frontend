import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

interface PaginatedGridProps {
  getIssues: (page? : number | null, per_page?: number | null) => void,
  per_page: number,
  total: number,
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
        onChange={(e, value) => props.getIssues(value, props.per_page)}
        size='large'
      />
    </div>
  );
};

export default PaginatedGrid;
