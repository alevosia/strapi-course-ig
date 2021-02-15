import { useEffect, useState } from 'react'
import { getPosts } from '../api/post'

export function usePosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        ;(async function () {
            const posts = await getPosts()
            setPosts(posts)
        })()
    }, [])

    return posts
}
