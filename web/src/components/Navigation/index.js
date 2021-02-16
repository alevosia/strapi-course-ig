import React from 'react'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.scss'

const NavLink = ({ to, onClick, children }) => {
    return (
        <ReactRouterNavLink
            exact
            to={to}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            onClick={onClick}
        >
            {children}
        </ReactRouterNavLink>
    )
}

export const Navigation = () => {
    const { auth, logout } = useAuth()

    return (
        <nav className={styles.navigation}>
            <NavLink to="/">Home</NavLink>
            {auth.user ? (
                <>
                    <NavLink to="/create">Create</NavLink>
                    <span className={styles.logout} onClick={logout}>
                        Logout
                    </span>
                </>
            ) : (
                <NavLink to="/auth">Login/Signup</NavLink>
            )}
        </nav>
    )
}
