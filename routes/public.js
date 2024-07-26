import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastrar um novo usuário.
router.post("/register", async (req, res) => {
    try {
        const user = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashPassword,
                // OBS: O retorno da senha é para fins didático.
            },
        });
        res.status(201).json(userDB);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor." });
    }
});

// Login do usuário.
router.post("/login", async (req, res) => {
    try {
        const userInfo = req.body;

        // Busca o usuário no banco de dados.
        const user = await prisma.user.findUnique({
            where: {
                email: userInfo.email,
            },
        });

        // Verifica se o usuário existe no banco de dados.
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Verifica se a senha confere com a senha do usuário no banco de dados.
        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Gerar o token JWT.
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json(token);
    } catch (err) {
        res.status(500).json({ message: "Erro no servidor." });
    }
});

export default router;
