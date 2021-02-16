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

export async function createPost({ formData, token }) {
    const response = await fetch(API_URL + '/posts', {
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export async function updatePost({ postId, data, token }) {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    return response.status === 200
}

export async function deletePost({ postId, token }) {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.status === 200
}
