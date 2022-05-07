import { useContext, useReducer } from "react";
import { createContext, ReactNode } from "react";
import theme from "../../themes";
import { ToastType } from "../../types/types";

const defaultState = {
    show: false,
    message: '',
    type: null,
    background: theme.colors.secondary,
    duration: 4000
}

type ToastContextProps = {
    children: ReactNode;
};

type State = typeof defaultState;

type Action = { type: 'show', message: string, background: string }
    | { type: 'hidden', message: string };

const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case 'show':
            return {
                show: true,
                message: action.message,
                type: null,
                background: action.background,
                duration: 4000,
            };
        case 'hidden':
            return {
                show: false,
                message: '',
                type: null,
                background: theme.colors.secondary,
                duration: 4000
            }
        default:
            return state
    }

}

export const ToastContext = createContext<ToastType>({});

const ToastProvider = ({ children }: ToastContextProps) => {
    const [state, dispach] = useReducer(reducer, defaultState);
   

    const showToast = (message = "", background = "") => {
        dispach({ type: 'show', message: message, background: background });
    }

    const hiddenToast = (message = "") => {
        dispach({ type: 'hidden', message: message });
    }

    return (
        <ToastContext.Provider value={{
            showToast: showToast,
            hiddenToast: hiddenToast,
            state: state
        }}
        >
            {children}
        </ToastContext.Provider>

    );
}

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) throw new Error('error Provider');

    return context;
}

export default ToastProvider;