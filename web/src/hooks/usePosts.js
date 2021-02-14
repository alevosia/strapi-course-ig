import { useEffect, useState } from 'react'
import { getPosts } from '../api/posts'

export function usePosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPosts() {
            const posts = await getPosts()
            setPosts(posts)
        }

        fetchPosts()
    }, [])

    return posts
}
