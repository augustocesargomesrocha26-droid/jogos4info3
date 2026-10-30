import { manipularDB } from "../db/db.js"
import * as db from "../db/usuarios.js"

export const getUsuarios =  async (req, res) => {
    try {
        const usuarios = await manipularDB({}, db.getUsuarios);

        if (!usuarios[0]){
            res.status(404).json('Nenhum usuarios encontrado no banco de dados!');
        } else {
            res.status(200).json(usuarios);
        }

    } catch (e) {
        console.error(e.message)
    } 
}

export const getUsuario = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await manipularDB({ id }, db.getUsuario);
        
        if (usuario == null) {
            res.status(404).json('usuario não encontrado no banco de dados!');
        } else {
            res.status(200).json(usuario)
        }
    } catch (e) {
        console.error(e.message)
    } 
}

export const createUsuario = async (req, res) => {
    try {
        const usuario = req.body.jogo;
        const todosOsUsuarios = await manipularDB({}, db.getUsuarios);
        let valido = true;

        for (let a of todosOsUsuarios) {
            if (a.nome == usuario.nome) {
                valido = false;
            }
        }

        if (valido) {
            const usuarioAdicionado = await manipularDB(usuario, db.createUsuario)
    
            if (usuarioAdicionado == null) {
                res.status(404).json('Não foi possível adicionar o usuario no banco de dados!');
            } else {
                res.status(201).json(usuarioAdicionado);
            }
        } else {
            res.status(409).json(`O usuario ${usuario.nome} já está registrado no banco de dados!`);
        }
    } catch (e) {
        console.error(e);
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const resposta = await manipularDB({ id }, db.deleteUsuario);
    
        if (resposta == null) {
            res.status(404).json('usuario não encontrado no banco de dados!');
        } else {
            res.status(200).json(`usuario ${id} deletado do banco de dados!`);
        }
    } catch (e) {
        console.error(e.message)
    }
}

export const attUsuario =  async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = req.body.usuario;
        const usuarioExistente = await manipularDB({ id }, db.getUsuario)
    
        if (usuarioExistente == null) {
            res.status(404).json('usuario não encontrado no banco de dados!');
        } else {
            for (let [chave, valor] of Object.entries(usuario)){
                if (valor == ''){
                    delete usuarioExistente[chave];
                } else {
                    usuarioExistente[chave] = valor;
                }
            }

            delete usuarioExistente._id;
            usuarioExistente.id = id;
    
            const resposta = await manipularDB(usuarioExistente, db.attUsuario)
            res.status(200).json(resposta);
        } 
    } catch (e) {
        console.error(e.message)
    }
}

