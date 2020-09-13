import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles, withStyles} from "@material-ui/core/styles";

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

interface Event {
  id: number,
  event: string,
  actor: {
    html_url: string
  },
  created_at: string
}

interface IssueEventsProps {
  match: {
    params: {
      issue_id: string,
      owner: string,
      repo: string
    }
  }
};

const IssueEvents: React.FC<IssueEventsProps> = (props: IssueEventsProps) => {
  const classes = useStyles();
  const {issue_id, owner, repo} = props.match.params;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/events/${owner}/${repo}/${issue_id}`)
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Event Type</StyledTableCell>
            <StyledTableCell>Created By</StyledTableCell>
            <StyledTableCell>Created At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event: Event) => (
            <StyledTableRow key={event.id}>
              <StyledTableCell>
                {event.id}
              </StyledTableCell>
              <StyledTableCell>{event.event}</StyledTableCell>
              <StyledTableCell>{event.actor.html_url}</StyledTableCell>
              <StyledTableCell component='th' scope='row'>
                {new Date(event.created_at).toLocaleDateString()}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IssueEvents;
