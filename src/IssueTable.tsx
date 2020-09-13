import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 800
  }
});

interface Issue {
  id: number,
  created_at: string,
  number: number,
  state: string,
  title: string,
  milestone: string
}

interface IssueTableProps {
  issues: Issue[],
  owner: String,
  repo: String
}

const IssueTable: React.FC<IssueTableProps> = (props: IssueTableProps) => {
  const classes = useStyles();
  const { issues, owner, repo } = props;

  if (!props.issues.length) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Number</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>State</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((issue) => (
            <StyledTableRow key={issue.id}>
              <StyledTableCell>
                <Link to={`issues/${owner}/${repo}/${issue.number}/events`}>
                  {issue.number}
                </Link>
              </StyledTableCell>
              <StyledTableCell>{issue.title}</StyledTableCell>
              <StyledTableCell component='th' scope='row'>
                {new Date(issue.created_at).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>{issue.state}</StyledTableCell>
              <StyledTableCell>{issue.milestone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default IssueTable;