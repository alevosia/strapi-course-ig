import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

export const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <NavLink
                exact
                to="/"
                className={styles.navLink}
                activeClassName={styles.activeLink}
            >
                Home
            </NavLink>
            <NavLink
                exact
                to="/create"
                className={styles.navLink}
                activeClassName={styles.activeLink}
            >
                Create
            </NavLink>
        </nav>
    )
}
