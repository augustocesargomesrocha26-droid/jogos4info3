import { manipularDB, getJogo, getJogos, createJogo, deleteJogo, attJogo } from "./db.js";

import express from 'express';

const app = express();
app.use(express.json());

app.get('/jogos', async (req, res) => {
    try {
        const jogos = await manipularDB({}, getJogos);

        if (!jogos[0]){
            res.status(404).json('Nenhum jogo encontrado no banco de dados!');
        } else {
            res.status(200).json(jogos);
        }

    } catch (e) {
        console.error(e.message)
    } 
});

app.listen(3000, async () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});