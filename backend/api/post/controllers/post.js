'use strict'

const { parseMultipartData, sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    /**
     * Create a record.
     *
     * @return {Object}
     */
    async create(ctx) {
        let entity

        if (ctx.is('multipart')) {
            const userId = ctx.state.user.id
            const { data, files } = parseMultipartData(ctx)

            console.log({ data, files })

            if (!data || !data.description) {
                ctx.throw(400, 'Description is missing.')
            }

            if (!files || !files.image) {
                ctx.throw(400, 'Image is missing.')
            }

            entity = await strapi.services.post.create(
                { ...data, likes: 0, author: userId },
                { files }
            )
        } else {
            ctx.throw(400, 'Request must be multipart.')
        }

        return sanitizeEntity(entity, { model: strapi.models.post })
    },

    /**
     * Delete a record.
     *
     * @return {Object}
     */
    async delete(ctx) {
        const { id } = ctx.params
        const userId = ctx.state.user.id
        const post = await strapi.services.post.findOne({ id })

        if (!post) {
            ctx.throw(404, 'Post not found.')
        }

        if (post.author && post.author.id !== userId) {
            ctx.throw(403, 'That is not yours.')
        }

        const entity = await strapi.services.post.delete({ id })
        return sanitizeEntity(entity, { model: strapi.models.post })
    },

    /**
     * Update a record.
     *
     * @return {Object}
     */
    async update(ctx) {
        const { id } = ctx.params
        const userId = ctx.state.user.id
        const post = await strapi.services.post.findOne({ id })

        if (!post) {
            ctx.throw(404, 'Post not found.')
        }

        if (post.author && post.author.id !== userId) {
            ctx.throw(403, 'That is not yours.')
        }

        let entity

        if (ctx.is('multipart')) {
            ctx.throw(400, 'Update request must be json/application')
        } else {
            const { description } = ctx.request.body

            if (!description) {
                ctx.throw(400, 'Description is missing.')
            }

            entity = await strapi.services.post.update({ id }, { description })
        }

        return sanitizeEntity(entity, { model: strapi.models.post })
    },
}
