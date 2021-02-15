import React from 'react'
import { Post } from '../../components'
import { usePost } from '../../hooks/usePost'
import styles from './styles.module.scss'

export const PostPage = ({ match }) => {
    const { post, isLoading } = usePost(match.params.id)

    return (
        <div className={styles.container}>
            {isLoading ? (
                <p>Loading post...</p>
            ) : post ? (
                <Post post={post} />
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    )
}
