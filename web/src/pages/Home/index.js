import React from 'react'
import { Post } from '../../components'
import { usePosts } from '../../hooks/usePosts'
import styles from './styles.module.scss'

export const HomePage = () => {
    const posts = usePosts()

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
