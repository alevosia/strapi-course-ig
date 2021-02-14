import React from 'react'
import { API_URL } from '../../constants'
import styles from './styles.module.scss'

function getImageUrl(post) {
    return `${API_URL}${post.image?.url}`
}

export const Post = ({ post }) => {
    if (!post) return null

    const { description, likes } = post

    return (
        <div className={styles.post}>
            <img
                className={styles.image}
                src={getImageUrl(post)}
                alt={description}
            />
            <h4 className={styles.description}>{description}</h4>
            <div className={styles.likes}>💖 {likes.toLocaleString()}</div>
        </div>
    )
}
