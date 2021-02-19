'use strict'

const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        if (!ctx.is('application/json')) {
            ctx.throw(400, "Request's content type must be application/json.")
        }

        const { postId } = ctx.request.body

        if (!postId) {
            ctx.throw(400, 'postId is missing.')
        }

        const userId = ctx.state.user.id

        const post = await strapi.services.post.findOne({ id: postId })

        if (!post) {
            ctx.throw(404, 'Post does not exist.')
        }

        const oldLike = await strapi.services.like.findOne({
            post: postId,
            user: userId,
        })

        if (oldLike) {
            ctx.throw(400, 'You already liked that post.')
        }

        const newLike = await strapi.services.like.create({
            post: postId,
            user: userId,
        })

        return sanitizeEntity(newLike, { model: strapi.models.like })
    },

    async delete(ctx) {
        const { postId } = ctx.params

        if (!postId) {
            ctx.throw(400, 'postId is missing.')
        }

        const userId = ctx.state.user.id

        const entity = await strapi.services.like.delete({
            post: postId,
            user: userId,
        })

        return sanitizeEntity(entity, { model: strapi.models.like })
    },
}
