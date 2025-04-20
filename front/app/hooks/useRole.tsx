import { createContext, useContext, useState } from "react";

interface RoleContextType {
    role: string;
    setRole: (role: string) => void;
    userId: number | null;
    setUserId: (userId: number | null ) => void;
    token: string | null;
    setToken: (role: string) => void;
    name: string | null;
    setName: (role: string) => void;
    email: string;
    setEmail: (role: string) => void;
    code: string;
    setCode: (role: string) => void;
}

const roleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState<number | null>(-1);
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    console.log("teste role");
    return (
        <roleContext.Provider value={{ role, setRole, userId, setUserId, token, setToken, name, setName, email, setEmail, code, setCode }}>
            {children}
        </roleContext.Provider>
    );
}

export function useRoleContext() {
    const context = useContext(roleContext);
    if (context === undefined) {
        throw new Error('useRoleContext must be used within a RoleProvider');
    }
    return context;
}