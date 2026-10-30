import { manipularDB } from "../db/db.js"
import * as db from "../db/jogos.js"

export const getJogos =  async (req, res) => {
    try {
        const jogos = await manipularDB({}, db.getJogos);

        if (!jogos[0]){
            res.status(404).json('Nenhum jogo encontrado no banco de dados!');
        } else {
            res.status(200).json(jogos);
        }

    } catch (e) {
        console.error(e.message)
    } 
}

export const getJogo = async (req, res) => {
    const id = req.params.id;

    try {
        const jogo = await manipularDB({ id }, db.getJogo);
        
        if (jogo == null) {
            res.status(404).json('jogo não encontrado no banco de dados!');
        } else {
            res.status(200).json(jogo)
        }
    } catch (e) {
        console.error(e.message)
    } 
}

export const createJogo = async (req, res) => {
    try {
        const jogo = req.body.jogo;
        const todosOsjogos = await manipularDB({}, db.getJogos);
        let valido = true;

        for (let a of todosOsjogos) {
            if (a.nome == jogo.nome) {
                valido = false;
            }
        }

        if (valido) {
            const jogoAdicionado = await manipularDB(jogo, db.createJogo)
    
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
}

export const deleteJogo = async (req, res) => {
    try {
        const id = req.params.id;
        const resposta = await manipularDB({ id }, db.deleteJogo);
    
        if (resposta == null) {
            res.status(404).json('jogo não encontrado no banco de dados!');
        } else {
            res.status(200).json(`jogo ${id} deletado do banco de dados!`);
        }
    } catch (e) {
        console.error(e.message)
    }
}

export const attJogo =  async (req, res) => {
    try {
        const id = req.params.id;
        const jogo = req.body.jogo;
        const jogoExistente = await manipularDB({ id }, db.getJogo)
    
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
    
            const resposta = await manipularDB(jogoExistente, db.attJogo)
            res.status(200).json(resposta);
        } 
    } catch (e) {
        console.error(e.message)
    }
}

