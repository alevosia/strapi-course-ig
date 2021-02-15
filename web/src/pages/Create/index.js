import React, { useRef, useState } from 'react'
import { sendPost } from '../../api/post'
import styles from './styles.module.scss'

export const CreatePage = () => {
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [feedback, setFeedback] = useState({ isError: false, message: '' })
    const fileInputRef = useRef(null)

    function resetForm() {
        fileInputRef.current.value = ''
        setFile(null)
        setDescription('')
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (!description || !file) {
            return setFeedback({
                isError: true,
                message: 'Please fill in required fields.',
            })
        }

        const formData = new FormData()

        formData.append('data', JSON.stringify({ description }))
        formData.append('files.image', file)

        const { statusCode, message } = await sendPost(formData)

        if (statusCode === 200) {
            resetForm()
            setFeedback({
                isError: false,
                message: 'Post created.',
            })
        } else {
            setFeedback({
                isError: true,
                message,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div
                    className={styles.feedback}
                    style={{ color: feedback.isError ? 'red' : 'limegreen' }}
                >
                    {feedback.message}
                </div>
                <input
                    ref={fileInputRef}
                    className={styles.file}
                    type="file"
                    onChange={(event) => {
                        setFile(event.target.files[0])
                    }}
                    accept="image/jpeg, image/png, image/webp, image/gif"
                />
                <input
                    className={styles.description}
                    placeholder="Description"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}
                />
                <button type="submit" className={styles.submitButton}>
                    Send
                </button>
            </form>
        </div>
    )
}
