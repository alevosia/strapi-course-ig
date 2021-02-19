import React, { useState } from 'react'
import { createLike, deleteLike } from '../../api/like'
import { API_URL } from '../../constants'
import { useAuth } from '../../context/AuthContext'
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
    const { id, description, author, image, published_at, likes } = post

    const { auth } = useAuth()
    const [likesCount, setLikesCount] = useState(likes.length)
    const [isLiked, setIsLiked] = useState(
        auth.user ? likes.some((like) => like.user === auth.user.id) : false
    )

    async function likePost() {
        setIsLiked(true)
        setLikesCount((prev) => prev + 1)

        await createLike({ postId: id, token: auth.jwt })
    }

    async function unlikePost() {
        setIsLiked(false)
        setLikesCount((prev) => prev - 1)

        await deleteLike({ postId: id, token: auth.jwt })
    }

    return (
        <div className={styles.post}>
            {image ? (
                <img
                    className={styles.image}
                    src={getImageUrl(post)}
                    alt={description}
                />
            ) : null}

            {author ? <div>{author.username}</div> : null}

            <h4 className={styles.description}>{description}</h4>

            <div className={styles.metadata}>
                <div>
                    <span
                        className={styles.heart}
                        onClick={isLiked ? unlikePost : likePost}
                    >
                        {isLiked ? '💖' : '🖤'}
                    </span>{' '}
                    {likesCount}
                </div>

                <div>
                    {new Date(published_at).toLocaleString('en-US', options)}
                </div>
            </div>
        </div>
    )
}
