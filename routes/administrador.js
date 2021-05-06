const express = require('express')
const multer = require('../middlewares/multer')
const router = express.Router()
const alunosController = require('../controllers/alunosController')
const professoresController = require('../controllers/professoresController')
const admController = require('../controllers/admController')
const sessionMiddleware = require('../middlewares/session')
const validarCadastroAluno = require('../middlewares/validarCadastroAluno')
const validarCadastroProfessor = require('../middlewares/validarCadastroProfessor')
const validarCpf = require('../middlewares/validarCpf')
const validaCampoBrancoAluno = require('../middlewares/validaCampoBrancoAluno')
const validaCampoBrancoProf = require('../middlewares/validarCampoBrancoProf')



router.get('/entrar', admController.login)
router.post('/entrar', admController.auth)
// http://localhost:3000/admin/entrar

router.get('/selecionar', sessionMiddleware, admController.select)
// http://localhost:3000/admin/selecionar


// Alunos
router.get('/criar/aluno',sessionMiddleware, alunosController.criar)
router.post('/criar/aluno',sessionMiddleware, multer.single("img_perfil"),validarCadastroAluno, validarCpf,  alunosController.post)
// http://localhost:3000/admin/criar/aluno

router.get('/alunos',sessionMiddleware, alunosController.listagemAdminAlunos)
// http://localhost:3000/admin/alunos

router.get('/alunos/:id',sessionMiddleware, alunosController.editar)
router.put('/alunos/:id',sessionMiddleware, multer.single("img_perfil"), validarCpf, validaCampoBrancoAluno, alunosController.put)
router.delete('/alunos/:id',sessionMiddleware, alunosController.delete)
// http://localhost:3000/admin/alunos/:id


// Professores
router.get('/criar/professor',sessionMiddleware, professoresController.criar)
router.post('/criar/professor',sessionMiddleware, multer.single("img_perfil"), validarCadastroProfessor, validarCpf, professoresController.post)
// http://localhost:3000/admin/criar/professor

router.get('/professores',sessionMiddleware, professoresController.listagemAdminProfessores)
// http://localhost:3000/admin/professores

router.get('/professores/:id',sessionMiddleware, professoresController.editar)
router.put('/professores/:id',sessionMiddleware, multer.single("img_perfil"), validarCpf, validaCampoBrancoProf, professoresController.put)
router.delete('/professores/:id',sessionMiddleware, professoresController.delete)
// http://localhost:3000/admin/professores/:id


module.exports = router