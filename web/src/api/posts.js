import { API_URL } from '../constants'

export async function getPosts() {
    const response = await fetch(`${API_URL}/posts`)

    if (response.status !== 200) {
        return []
    }

    const posts = await response.json()

    return posts
}
