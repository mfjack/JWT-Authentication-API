import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

// Cadastrar um novo usuário
router.post('/register', async (req, res) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        const userDB = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashPassword
                // OBS: O retorno da senha é por fim didático.
            }
        })
        res.status(201).json(userDB)
    } catch (err) {
        res.status(500).json('Erro no servidor')
    }
})

router.post('/login', async (req, res) => {
    try {

    } catch (err) {

    }
})

export default router