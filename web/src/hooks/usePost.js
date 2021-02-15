import { useCallback, useEffect, useState } from 'react'
import { getPost } from '../api/post'

export function usePost(postId) {
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchPost = useCallback(async () => {
        setIsLoading(true)
        const post = await getPost(postId)
        setPost(post)
        setIsLoading(false)
    }, [postId])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    return { post, fetchPost, isLoading }
}
