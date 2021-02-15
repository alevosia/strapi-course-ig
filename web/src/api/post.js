import { API_URL } from '../constants'

export async function getPost(postId) {
    if (!postId) {
        return null
    }

    const response = await fetch(`${API_URL}/posts/${postId}`)

    if (response.status !== 200) {
        return null
    }

    const post = await response.json()

    return post
}

export async function getPosts() {
    const response = await fetch(`${API_URL}/posts?_sort=published_at:desc`)

    if (response.status !== 200) {
        return []
    }

    const posts = await response.json()

    return posts
}

export async function sendPost(formData) {
    const response = await fetch(API_URL + '/posts', {
        method: 'post',
        body: formData,
    })

    if (response.status === 200) {
        return {
            statusCode: 200,
            message: 'Post created.',
        }
    } else {
        return await response.json()
    }
}
