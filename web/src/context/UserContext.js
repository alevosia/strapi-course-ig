import { createContext, useContext, useEffect, useState } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {}, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error(
            'useUser hook must be used inside a UserContext Provider.'
        )
    }

    return context
}
