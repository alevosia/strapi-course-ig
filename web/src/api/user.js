import { API_URL } from '../constants'

export async function loginUser({ email, password }) {
    const response = await fetch(API_URL + '/auth/local', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: email,
            password,
        }),
    })

    if (response.status !== 200) {
        return null
    }

    const user = await response.json()
    return user
}

export async function signupUser({ email, password }) {
    const response = await fetch(API_URL + '/auth/local/register', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email.substring(0, email.indexOf('@')),
            email,
            password,
        }),
    })

    if (response.status !== 200) {
        return null
    }

    const user = await response.json()
    return user
}
