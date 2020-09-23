import React, { useContext, useEffect, useState } from 'react';
import '../styles/App.css';
import { DOMAIN_NAME } from '../constants';
import { InputForm } from './InputForm';
import { IssueTable } from './IssueTable';
import { ItemsPerPageSelector } from './ItemsPerPageSelector';
import { PaginatedGrid } from './PaginatedGrid';
import { StateContext } from '../state';

export const App = () => {
    const [issues, setIssues] = useState<[]>([]);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const { state, dispatch } = useContext(StateContext);
    const { currentPage, itemsPerPage, owner, repo } = state;


    const getIssueCount = (perPage: number): void => {
        fetch(`${DOMAIN_NAME}/issues/${owner}/${repo}/count`)
            .then((countResult) => {
                countResult
                    .json()
                    .then((data) => {
                        setNumberOfPages(Math.ceil(data.total_count / perPage));
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    const getIssues = (page?: number | null, perPage?: number | null): void => {
        page = page ? page : 1;
        perPage = perPage ? perPage : 30;
        getIssueCount(perPage);

        fetch(
            `${DOMAIN_NAME}/issues/${owner}/${repo}/${page}/${perPage}`
        )
            .then((issuesResult) => {
                issuesResult
                    .json()
                    .then((data) => {
                        setIssues(data);
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    const onRepoChange = (e) => {
        dispatch({ type: 'repo', value: e.target.value });
    };

    const onOwnerChange = (e) => {
        dispatch({ type: 'owner', value: e.target.value });
    };

    useEffect(() => {
        if (owner && repo) {
            getIssues(currentPage, itemsPerPage);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="App">
            <InputForm
                onClick={getIssues}
                onOwnerChange={onOwnerChange}
                onRepoChange={onRepoChange}
                owner={owner}
                repo={repo}
            />
            <ItemsPerPageSelector
                getIssues={getIssues}
                total={parseInt(numberOfPages.toString(), 10)}
            />
            <PaginatedGrid
                getIssues={getIssues}
                perPage={itemsPerPage}
                total={parseInt(numberOfPages.toString(), 10)}
            />
            <IssueTable
                issues={issues}
                owner={owner}
                repo={repo}
            />
        </div>
    );
};
