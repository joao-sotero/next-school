const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { Aluno, AlunoDisciplina, Disciplina, Professor, Modulo } = require('../models')
const { Op } = require('sequelize')
const { modulo } = require('../lib/utils')


const alunosController = {
    login: (req, res) => {
        return res.render('aluno/login')
    },
    auth: async (req, res) => {
        const { cpf } = req.body;
        const validarLogin = await Aluno.findOne({
            where: { cpf }
        }) 

        req.session.usuarioLogado = validarLogin

        return res.redirect(`${validarLogin.id}`)
    },
    criar: async (req, res) => {
        const modulos = await Modulo.findAll();
        return res.render('admin/create-student', { modulos })
    },
    show: async (req, res) => {
        const { id } = req.params;
        const result = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })
        let media = 0;
        for(let i = 0; i < result.boletim.length; i++){
            media += result.boletim[i].nota;
        }
        const mediaFinal = media / result.boletim.length;
        result.boletim[0].nota = mediaFinal;
        result.modulo_id = modulo(result.modulo_id)
        return res.render('aluno/show', { aluno: result })
    },
    boletim: async (req, res) => {
        const notasAluno = []
        const { id } = req.params;
        const Notas = await Aluno.findOne({
            where: { id },
            include: "boletim"
        })

        const notasJson = Notas.toJSON()        
    
        for (let resultado of notasJson.boletim) {
            const disciplinas = await Disciplina.findOne({
                where: { id: resultado.disciplina_id }
            })
            const alunos = await Aluno.findOne({
                where:{id: resultado.aluno_id}
            })
            const obj = Object.assign({},alunos.toJSON(), disciplinas.toJSON(), resultado);
            notasAluno.push(obj)
        }

        notasAluno.map(notaAluno => {
            notaAluno.modulo_id = modulo(notaAluno.modulo_id)
        })

        return res.render('aluno/grades', { notasAluno })         
    },
    post: async (req, res) => {
        const { nome_aluno, cpf, modulo_id } = req.body

        const id = uuidv4() 

        let filename = 'user-image.png'

        req.file != undefined ? filename = req.file.filename : null
        
        const novoAluno = await Aluno.create({
            id,
            nome_aluno,
            cpf,
            img_perfil: filename,
            modulo_id
        })

        const disciplinas = await Disciplina.findAll({
            where: {
                modulo_id
            }
        })

        disciplinas.map(disciplina => {
            AlunoDisciplina.create({
                aluno_id: novoAluno.id,
                disciplina_id: disciplina.id
            })
        })

        Promise.all(disciplinas)
  
        return res.redirect(`/admin/alunos`)
    },
    listagemAdminAlunos: async (req, res) => {
        const { filter } = req.query;

        let alunos = []

        if (filter) {
            alunos = await Aluno.findAll({
                where: {
                    nome_aluno: {[Op.like]: `%${filter}%`}
                }
            })
        } else {
            alunos = await Aluno.findAll()
        }

        alunos.map(aluno => {
            aluno.modulo_id = modulo(aluno.modulo_id)
        })

        return res.render('admin/student-listing', { alunos })
    },
    editar: async (req, res) => {
        const { id } = req.params
        const aluno = await Aluno.findOne({
            where: { id }
        })

        const modulos = await Modulo.findAll()
        return res.render('admin/student-edit', { aluno, modulos })
    },
    put: async (req, res) => {
        const { id } = req.params
        const { nome_aluno, cpf, modulo_id } = req.body

        const aluno = await Aluno.findOne({
            where: { id }
        })

        let filename = aluno.img_perfil

        if (req.file != undefined) {
            if (filename != 'user-image.png') {
                fs.unlinkSync(`public/images/usuarios/${professor.img_perfil}`)
                filename = req.file.filename
            } else {
                filename = req.file.filename
            }
        }

        Aluno.update({
            nome_aluno,
            cpf,
            img_perfil: filename,
            modulo_id
        }, 
        {
            where: {
                id
            }
        })

        return res.redirect('/admin/alunos')
    },
    delete: async (req, res) => {
        const { id } = req.params

        const aluno = await Aluno.findOne({
            where: { id }
        })

        await AlunoDisciplina.destroy({
            where : {
                aluno_id: id
            }
        })

        if (aluno.img_perfil != 'user-image.png') {
            fs.unlinkSync(`public/images/usuarios/${aluno.img_perfil}`)
        }

        await Aluno.destroy({
            where: {
                id
            }
        })

        return res.redirect('/admin/alunos')
    }
}

module.exports = alunosController;