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
            const { data, files } = parseMultipartData(ctx)

            console.log({ data, files })

            if (!data || !data.description) {
                ctx.throw(400, 'Description is missing.')
            }

            if (!files || !files.image) {
                ctx.throw(400, 'Image is missing.')
            }

            entity = await strapi.services.post.create(
                { ...data, likes: 0 },
                { files }
            )
        } else {
            ctx.throw(400, 'Request must be multipart.')
        }

        return sanitizeEntity(entity, { model: strapi.models.post })
    },
}
