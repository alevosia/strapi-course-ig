import React, { useEffect, useState } from 'react'
import { loginUser, signupUser } from '../../api/user'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.scss'

export const AuthPage = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { auth, login } = useAuth()

    useEffect(() => {
        if (auth.user) {
            history.replace('/')
        }
    }, [auth, history])

    async function handleLogin(event) {
        event.preventDefault()

        if (!email || !password) {
            return setError('Please fill in required data.')
        }

        const auth = await loginUser({ email, password })

        if (auth) {
            login(auth)
        } else {
            setError('Invalid email address or password.')
        }
    }

    async function handleSignup(event) {
        event.preventDefault()

        if (!email || !password) {
            return setError('Please fill in required data.')
        }

        const auth = await signupUser({ email, password })

        if (auth) {
            login(auth)
        } else {
            setError('Invalid email address.')
        }
    }

    if (auth.user) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.error}>{error}</div>
            <input
                className={styles.input}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
            />
            <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />
            <div className={styles.buttons}>
                <button className={styles.loginButton} onClick={handleLogin}>
                    Login
                </button>
                <button className={styles.signupButton} onClick={handleSignup}>
                    Signup
                </button>
            </div>
        </div>
    )
}
