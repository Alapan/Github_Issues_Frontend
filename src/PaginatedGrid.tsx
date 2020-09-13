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
      margin: theme.spacing(2),
    }
  },
  ul: {
    justifyContent: 'center'
  }
}));

const PaginatedGrid: React.FC<PaginatedGridProps> = (props: PaginatedGridProps) => {
  const classes = useStyles();

  if(props.total === 0) {
    return null;
  }

  return (
    <Pagination
      count={props.total}
      onChange={(e, value) => props.getIssues(value, props.per_page)}
      size='large'
      classes={{ root: classes.root, ul: classes.ul }}
    />
  );
};

export default PaginatedGrid;
