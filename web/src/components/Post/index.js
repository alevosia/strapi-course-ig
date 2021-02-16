import React from 'react'
import { API_URL } from '../../constants'
import styles from './styles.module.scss'

function getImageUrl(post) {
    if (!post || !post.image) {
        return ''
    }

    return API_URL + post.image.url
}

const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}

export const Post = ({ post }) => {
    if (!post) return null

    const { description, likes, published_at } = post

    return (
        <div className={styles.post}>
            {post.image ? (
                <img
                    className={styles.image}
                    src={getImageUrl(post)}
                    alt={description}
                />
            ) : null}

            {post.author ? <div>{post.author.username}</div> : null}

            <h4 className={styles.description}>{description}</h4>

            <div className={styles.metadata}>
                <div>
                    <span className={styles.heart}>💖</span>{' '}
                    {likes.toLocaleString()}
                </div>

                <div>
                    {new Date(published_at).toLocaleString('en-US', options)}
                </div>
            </div>
        </div>
    )
}
