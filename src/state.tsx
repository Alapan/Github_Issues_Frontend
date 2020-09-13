import React, { createContext, useReducer } from 'react';

interface State {
    owner: string;
    repo: string;
}

interface Action {
    type: string;
    value: string;
}

interface ContextProps {
    dispatch: ({ type, value }: { type: string; value: string }) => void;
    state: State;
}

const initialState = {
    owner: '',
    repo: '',
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'repo':
            return {
                ...state,
                repo: action.value,
            };
        case 'owner':
            return {
                ...state,
                owner: action.value,
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
