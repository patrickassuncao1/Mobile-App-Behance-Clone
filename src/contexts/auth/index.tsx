import { createContext, ReactNode, useContext, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        token: ''
    });

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('error Provider');

    return context;
}

export default AuthProvider;