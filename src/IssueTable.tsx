import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Link } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from './TableStyles';

const useStyles = makeStyles({
    root: {
        margin: '40px',
    },
});

interface Issue {
    created_at: string;
    id: number;
    number: number;
    state: string;
    title: string;
}

interface IssueTableProps {
    issues: Issue[];
    owner: string;
    repo: string;
}

const IssueTable: React.FC<IssueTableProps> = (props: IssueTableProps) => {
    const classes = useStyles();
    const { issues, owner, repo } = props;

    if (!props.issues.length) {
        return null;
    }
    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table>
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
                                    <Link
                                        to={`issues/${owner}/${repo}/${issue.number}/events`}
                                    >
                                        {issue.number}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell>{issue.title}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {new Date(
                                        issue.created_at
                                    ).toLocaleDateString()}
                                </StyledTableCell>
                                <StyledTableCell>{issue.state}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default IssueTable;
