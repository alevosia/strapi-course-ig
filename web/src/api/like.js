import { API_URL } from '../constants'

export async function createLike({ postId, token }) {
    const response = await fetch(API_URL + '/likes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
    })

    return await response.json()
}

export async function deleteLike({ postId, token }) {
    const response = await fetch(`${API_URL}/likes/${postId}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.json()
}
