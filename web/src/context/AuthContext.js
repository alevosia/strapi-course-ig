import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

export const AuthContext = createContext()

const LOCAL_STORAGE_KEY = 'igStrapiJWT'

function getLoggedInUser() {
    const authString = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (authString) {
        try {
            return JSON.parse(authString)
        } catch (exception) {
            console.error(exception)
            return { user: null, jwt: null }
        }
    } else {
        return { user: null, jwt: null }
    }
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getLoggedInUser())

    // Update auth on localStorage whenever it's updated
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth))
    }, [auth])

    const login = useCallback(({ user, jwt }) => {
        setAuth({ user, jwt })
    }, [])

    const logout = useCallback(() => {
        setAuth({ user: null, jwt: null })
    }, [])

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuth hook must be used inside a AuthContext Provider.'
        )
    }

    return context
}
