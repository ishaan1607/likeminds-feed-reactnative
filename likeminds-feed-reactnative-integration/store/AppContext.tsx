import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

// Define your state and action types
interface AppState {
  // Define your state properties and types here
  name: string
}

type Action =
  | { type: 'ACTION_TYPE'; payload: string }
  // Add more action types as needed

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  // Set initial state properties
  name:'old name'
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ACTION_TYPE':
      // Handle your actions and update state accordingly
      return {
        ...state,name : action.payload
        // Update state based on the action
      };
    // Add more cases as needed
    default:
      return state;
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
