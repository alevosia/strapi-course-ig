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
        if (!ctx.is('multipart')) {
            ctx.throw(400, 'Request must be multipart.')
        }

        const { data, files } = parseMultipartData(ctx)

        if (!data || !data.description) {
            ctx.throw(400, 'Description is missing.')
        }

        if (!files || !files.image) {
            ctx.throw(400, 'Image is missing.')
        }

        const userId = ctx.state.user.id
        const { description } = data

        const entity = await strapi.services.post.create(
            { author: userId, description, likes: 0 },
            { files }
        )

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

        if (!ctx.is('application/json')) {
            ctx.throw(
                400,
                'Update request must be of content type application/json.'
            )
        }

        const { description } = ctx.request.body

        if (!description) {
            ctx.throw(400, 'Description is missing.')
        }

        const entity = await strapi.services.post.update(
            { id, author: userId },
            { description }
        )

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

        const entity = await strapi.services.post.delete({ id, author: userId })

        return sanitizeEntity(entity, { model: strapi.models.post })
    },
}
