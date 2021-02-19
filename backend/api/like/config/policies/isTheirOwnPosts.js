module.exports = async (ctx, next) => {
    if (!ctx.request.query['post.author']) {
        return ctx.throw(400, 'Please specify a post.author.')
    }

    const targetUserId = String(ctx.query['post.author'])
    const userId = String(ctx.state.user.id)

    if (targetUserId !== userId) {
        return ctx.forbidden()
    }

    return next()
}
