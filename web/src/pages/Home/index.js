import React from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../components'
import { usePosts } from '../../hooks/usePosts'
import styles from './styles.module.scss'

export const HomePage = () => {
    const posts = usePosts()

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <Link className={styles.link} key={post.id} to={`/${post.id}`}>
                    <Post post={post} />
                </Link>
            ))}
        </div>
    )
}
