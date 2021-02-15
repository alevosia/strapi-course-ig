import { useEffect, useState } from 'react'
import { getPost } from '../api/post'

export function usePost(postId) {
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        ;(async function () {
            setIsLoading(true)
            const post = await getPost(postId)
            setPost(post)
            setIsLoading(false)
        })()
    }, [postId])

    return { post, isLoading }
}
