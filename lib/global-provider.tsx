import { createContext, ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
import { getUser } from "./appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, loading, refetch } = useAppwrite({ fn: getUser });

    const isLoggedIn = !!user;

    console.log(JSON.stringify(user, null, 2));

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}