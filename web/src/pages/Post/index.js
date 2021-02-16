import React, { useEffect, useState } from 'react'
import { deletePost, updatePost } from '../../api/post'
import { Post } from '../../components'
import { usePost } from '../../hooks/usePost'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.scss'

export const PostPage = ({ match, history }) => {
    const { post, fetchPost, isLoading } = usePost(match.params.id)
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState('')
    const { auth } = useAuth()

    async function handleDelete() {
        const isSuccessful = await deletePost({
            postId: post.id,
            token: auth.jwt,
        })

        if (isSuccessful) {
            history.push('/')
        }
    }

    async function handleEdit() {
        if (isEditing && description !== post.description) {
            const isSuccessful = await updatePost({
                postId: post.id,
                data: { description },
                token: auth.jwt,
            })

            if (isSuccessful) {
                await fetchPost()
            }
        }

        setIsEditing((prev) => !prev)
    }

    useEffect(() => {
        if (post) {
            setDescription(post.description)
        }
    }, [post])

    return (
        <div className={styles.container}>
            {isLoading ? (
                <p>Loading post...</p>
            ) : post ? (
                <>
                    <Post post={post} />
                    {auth.user && auth.user.id === post.author?.id ? (
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={styles.description}
                                    value={description}
                                    onChange={(event) => {
                                        setDescription(event.target.value)
                                    }}
                                />
                            ) : (
                                <button
                                    className={styles.delete}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                className={styles.edit}
                                onClick={handleEdit}
                            >
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                        </div>
                    ) : null}
                </>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    )
}
