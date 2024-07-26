import express from 'express'

const app = express()

console.log('Hello World');

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))