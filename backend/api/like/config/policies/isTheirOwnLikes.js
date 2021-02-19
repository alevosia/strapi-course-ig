module.exports = async (ctx, next) => {
    const targetUserId = String(ctx.query.user)
    const userId = String(ctx.state.user.id)

    if (targetUserId !== userId) {
        return ctx.forbidden('Not your own data.')
    }

    return next()
}
