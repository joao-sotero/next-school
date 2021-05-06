const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const { Professor, Aluno, AlunoDisciplina, Modulo, Disciplina } = require('../models')
const { Op } = require('sequelize')
const { modulo } = require('../lib/utils')

const professorController = {
    login: (req, res) => {
        return res.render('professor/login')
    },
    auth: async (req, res) => {
        const { cpf, senha_professor } = req.body

        const usuario = await Professor.findOne({
            where: {
                cpf
            }
        })

        if ( usuario && bcrypt.compareSync(senha_professor, usuario.senha_professor)) {
            req.session.usuarioLogado = usuario
            return res.redirect(`/professor/show/${usuario.id}`)
        } else {
            return res.redirect('/professor/entrar')
        }
    },
    criar: async (req, res) => {
        // const modulos = await sequelize.query('SELECT `id`, `nome` FROM `modulos` AS `Modulo`', {types: QueryTypes.SELECT});
        const modulos = await Modulo.findAll();
        return res.render('admin/create-teacher', { modulos })
    },
    show: async (req, res) => {
        const { id } = req.params;
        const mostrarProfessor = await Professor.findOne({
            where: {
                id
            }
        })
        const modulo_id = mostrarProfessor.modulo_id
        mostrarProfessor.modulo_id = modulo(mostrarProfessor.modulo_id)

        return res.render('professor/show', { professor: mostrarProfessor, modulo_id })
    },
    listagemAlunos: async (req, res) => {
        const { modulo_id } = req.session.usuarioLogado
        const { filter } = req.query;
        
        let alunos = []

        if (filter) {
            alunos = await Aluno.findAll({
                where: {
                    nome_aluno: { [Op.like]: `%${filter}%` },
                    modulo_id
                }
            })
        } else {
            alunos = await Aluno.findAll({
                where: {
                    modulo_id
                }
            })
        }

        alunos.map(aluno => {
            aluno.modulo_id = modulo(aluno.modulo_id)
        })

        return res.render('professor/listing', { alunos })
    },
    notas: async (req, res) => {
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
        // console.log(notasAluno)
        return res.render('professor/grades', { notasAluno })
    },
    putNotas: async (req, res) => {
        const { id } = req.params
        const notas = req.body;   

        for (let disciplina_id in notas) {
            await AlunoDisciplina.update({
                nota: notas[disciplina_id]
            }, {
                where: {
                    [Op.and]: [
                        { aluno_id: id },
                        { disciplina_id: disciplina_id }
                    ]
                }
            })
        }

        return res.redirect('/professor/listagem')
    },
    post: async (req, res) => {
        const { nome, senha_professor, cpf, modulo_id } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha_professor, 10)
        const id = uuidv4()

        let filename = 'user-image.png'

        req.file != undefined ? filename = req.file.filename : null

        await Professor.create({
            id,
            nome,
            senha_professor: senhaCrypt,
            cpf,
            img_perfil: filename,
            modulo_id
        })
        return res.redirect('/admin/professores')
    },
    listagemAdminProfessores: async (req, res) => {
        const { filter } = req.query;

        let professores = []

        if (filter) {
            professores = await Professor.findAll({
                where: {
                    nome: { [Op.like]: `%${filter}%` }
                }
            })
        } else {
            professores = await Professor.findAll()
        }

        professores.map(professor => {
            professor.modulo_id = modulo(professor.modulo_id)
        })

        return res.render('admin/teacher-listing', { professores })
    },
    editar: async (req, res) => {
        const { id } = req.params
        const professor = await Professor.findOne({
            where: { id }
        })
           
        const modulos = await Modulo.findAll()
        return res.render('admin/teacher-edit', { professor, modulos })
    },
    put: async (req, res) => {
        let { id } = req.params
        let { nome, cpf, modulo_id, senha_professor } = req.body;

        const senhaCrypt = bcrypt.hashSync(senha_professor, 10)

        const professor = await Professor.findOne({
            where: { id }
        })

        let filename = professor.img_perfil

        if (req.file != undefined) {
            if (filename != 'user-image.png') {
                fs.unlinkSync(`public/images/usuarios/${professor.img_perfil}`)
                filename = req.file.filename
            } else {
                filename = req.file.filename
            }
        }

        await Professor.update({
            nome,
            senha_professor: senhaCrypt,
            cpf,
            img_perfil: filename,
            modulo_id
        }, {
            where: { 
                id 
            }
        })

        return res.redirect('/admin/professores')
    },
    delete: async (req, res) => {
        let { id } = req.params;

        const professor = await Professor.findOne({
            where: { id }
        })

        if (professor.img_perfil != 'user-image.png') {
            fs.unlinkSync(`public/images/usuarios/${professor.img_perfil}`)
        }

        await Professor.destroy({
            where: { id }
        })
        return res.redirect('/admin/professores')
    }
}

module.exports = professorController
