import { createContext, useContext, useState } from "react";

interface RoleContextType {
    role: string;
    setRole: (role: string) => void;
}

const roleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState("");
    return (
        <roleContext.Provider value={{ role, setRole }}>
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