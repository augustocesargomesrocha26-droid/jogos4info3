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

app.get('/jogos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const jogo = await manipularDB({ id }, getJogo);
        
        if (jogo == null) {
            res.status(404).json('jogo não encontrado no banco de dados!');
        } else {
            res.status(200).json(jogo)
        }
    } catch (e) {
        console.error(e.message)
    } 
});

app.post('/jogos', async (req, res) => {
    try {
        const jogo = req.body.jogo;
        const todosOsjogos = await manipularDB({}, getJogos);
        let valido = true;

        for (let a of todosOsjogos) {
            if (a.nome == jogo.nome) {
                valido = false;
            }
        }

        if (valido) {
            const jogoAdicionado = await manipularDB(jogo, createJogo)
    
            if (jogoAdicionado == null) {
                res.status(404).json('Não foi possível adicionar o jogo no banco de dados!');
            } else {
                res.status(201).json(jogoAdicionado);
            }
        } else {
            res.status(409).json(`O jogo ${jogo.nome} já está registrado no banco de dados!`);
        }
    } catch (e) {
        console.error(e);
    }
});



app.delete('/jogos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resposta = await manipularDB({ id }, deleteJogo);
    
        if (resposta == null) {
            res.status(404).json('jogo não encontrado no banco de dados!');
        } else {
            res.status(200).json(`jogo ${id} deletado do banco de dados!`);
        }
    } catch (e) {
        console.error(e.message)
    }
})


app.put('/jogos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const jogo = req.body.jogo;
        const jogoExistente = await manipularDB({ id }, getJogo)
    
        if (jogoExistente == null) {
            res.status(404).json('jogo não encontrado no banco de dados!');
        } else {
            for (let [chave, valor] of Object.entries(jogo)){
                if (valor == ''){
                    delete jogoExistente[chave];
                } else {
                    jogoExistente[chave] = valor;
                }
            }

            delete jogoExistente._id;
            jogoExistente.id = id;
    
            const resposta = await manipularDB(jogoExistente, attJogo)
            res.status(200).json(resposta);
        } 
    } catch (e) {
        console.error(e.message)
    }
});

            


app.listen(3000, async () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});

