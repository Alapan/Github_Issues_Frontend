import React, { createContext, useReducer } from 'react';

interface State {
    currentPage: number;
    itemsPerPage: number;
    owner: string;
    repo: string;
}

interface Action {
    type: string;
    value: string | number;
}

interface ContextProps {
    dispatch: ({ type, value }) => void;
    state: State;
}

const initialState = {
    currentPage: 1,
    itemsPerPage: 30,
    owner: '',
    repo: ''
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'currentPage':
            return {
                ...state,
                currentPage: action.value as number,
            };
        case 'itemsPerPage':
            return {
                ...state,
                itemsPerPage: action.value as number,
            };
        case 'repo':
            return {
                ...state,
                repo: action.value as string,
            };
        case 'owner':
            return {
                ...state,
                owner: action.value as string,
            };
        default:
            return state;
    }
};

export const StateContext = createContext({} as ContextProps);

export const StateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};
