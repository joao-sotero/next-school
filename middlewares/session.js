module.exports = (req, res, next) => {
    if (req.session.usuarioLogado != null) {
        next()
    } else {
        return res.redirect('/')
    }
}