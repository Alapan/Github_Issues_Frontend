import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { StyledTableCell, StyledTableRow } from './StyledTable';

const useStyles = makeStyles({
    root: {
        margin: '20px 40px 10px 40px',
    },
});

interface Event {
    actor: {
        html_url: string;
    };
    created_at: string;
    event: string;
    id: number;
}

interface IssueEventsProps {
    match: {
        params: {
            issue_id: string;
            owner: string;
            repo: string;
        };
    };
}

export const IssueEvents = (props: IssueEventsProps) => {
    const classes = useStyles();
    const { issue_id, owner, repo } = props.match.params;
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/events/${owner}/${repo}/${issue_id}`)
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((err) => {
                throw new Error(err);
            });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table>
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
                                <StyledTableCell>{event.id}</StyledTableCell>
                                <StyledTableCell>{event.event}</StyledTableCell>
                                <StyledTableCell>
                                    {event.actor.html_url}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {new Date(
                                        event.created_at
                                    ).toLocaleDateString()}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
