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

interface EventData {
  url: string,
  issue: {
    url: string
  },
  created_at: string,
  commit_id: string,
  commit_url: string,
  id: number
};

interface EventDetailsProps {
  match: {
    params: {
      event_id: string,
      owner: string,
      repo: string
    }
  }
};

const initialState = {
  url: '',
  issue: {
    url: ''
  },
  created_at: '',
  commit_id: '',
  commit_url: '',
  id: 0
}

const EventDetails: React.FC<EventDetailsProps> = (props: EventDetailsProps) => {
  const classes = useStyles();
  const {event_id, owner, repo} = props.match.params;
  const [eventData, setEventData] = useState<EventData>(initialState)

  useEffect(() => {
    fetch(`http://localhost:8000/issues/${owner}/${repo}/events/${event_id}`)
      .then((response) => response.json())
      .then((data) => setEventData(data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Detail</StyledTableCell>
            <StyledTableCell>Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>
              Event ID
            </StyledTableCell>
            <StyledTableCell>
              {eventData.id}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              Event URL
            </StyledTableCell>
            <StyledTableCell>
              {eventData.url}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              Issue URL
            </StyledTableCell>
            <StyledTableCell>
              {eventData.issue.url}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              Created at
            </StyledTableCell>
            <StyledTableCell>
              {new Date(eventData.created_at).toLocaleDateString()}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              Commit ID
            </StyledTableCell>
            <StyledTableCell>
              {eventData.commit_id}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>
              Commit URL
            </StyledTableCell>
            <StyledTableCell>
              {eventData.commit_url}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventDetails;
