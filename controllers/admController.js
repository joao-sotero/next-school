const bcrypt = require('bcryptjs')

const { Adm } = require('../models');
const admController = {
    login: (req, res) => {
        return res.render('admin/login')
    },
    auth: async (req, res) => {
        const { id, senha } = req.body

        const usuario = await Adm.findOne({
            where: {
                id
            }
        })

        if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
            req.session.usuarioLogado = usuario
            return res.redirect('/admin/selecionar')
        } else {
            return res.redirect('/admin/entrar')
        }
    },
    select: (req, res) => {
        return res.render('admin/select')
    }
}

module.exports = admController