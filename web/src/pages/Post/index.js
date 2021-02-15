import React, { useEffect, useState } from 'react'
import { deletePost, updatePost } from '../../api/post'
import { Post } from '../../components'
import { useUser } from '../../context/UserContext'
import { usePost } from '../../hooks/usePost'
import styles from './styles.module.scss'

export const PostPage = ({ match, history }) => {
    const { post, fetchPost, isLoading } = usePost(match.params.id)
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState('')
    const { user, setUser } = useUser()

    async function handleDelete() {
        const isSuccessful = await deletePost(post.id)

        if (isSuccessful) {
            history.push('/')
        }
    }

    async function handleEdit() {
        if (isEditing && description !== post.description) {
            const isSuccessful = await updatePost(post.id, { description })

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
                        <button className={styles.edit} onClick={handleEdit}>
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    )
}
