import express from 'express'

const router = express.Router()

// Cadastrar um novo usuário
router.post('/register', (req, res) => {
    const user = req.body

    res.send('Usuário cadastrado com sucesso!').json(user)
})

export default router