require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/teste', (req, res) => {
  res.json({ mensagem: "Comunicação com Node.js estabelecida com sucesso!" });
});

// LISTAR
app.get('/api/projetos', async (req, res) => {
  try {
    const projetos = await prisma.projeto.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(projetos);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao listar projetos." });
  }
});

// CRIAR (com validação do Checkpoint 9)
app.post('/api/projetos', async (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome || !nome.trim()) {
    return res.status(400).json({ erro: "O nome do projeto é obrigatório." });
  }
  try {
    const projeto = await prisma.projeto.create({
      data: { nome: nome.trim(), descricao: descricao?.trim() || null }
    });
    res.status(201).json(projeto);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao salvar projeto." });
  }
});

// DELETAR
app.delete('/api/projetos/:id', async (req, res) => {
  try {
    await prisma.projeto.delete({ where: { id: Number(req.params.id) } });
    res.json({ mensagem: "Projeto excluído." });
  } catch (e) {
    res.status(404).json({ erro: "Projeto não encontrado." });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));