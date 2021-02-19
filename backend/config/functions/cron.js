'use strict'

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
 */

module.exports = {
    /**
     * Simple example.
     * Every monday at 1am.
     */
    // '0 1 * * 1': () => {
    //
    // }

    '0 0 * * * *': async () => {
        console.log('Email time!')

        const users = await strapi.plugins[
            'users-permissions'
        ].services.user.fetchAll()

        const res = await Promise.all(
            users.map(async (user) => {
                const likes = await strapi.services.like.find({
                    'post.author': user.id,
                })

                // return awaitstrapi.plugins['email'].services.email.send({
                //     to: user.email,
                //     from: 'Strapitest@localhost.com',
                //     subject: 'Your likes for today!',
                //     text: `You got ${likes.length} likes.`,
                // })

                return `${user.username} has ${likes.length} likes.`
            })
        )

        console.log(...res)
    },
}
