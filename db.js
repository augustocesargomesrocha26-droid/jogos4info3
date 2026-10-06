import { MongoClient, ObjectId } from "mongodb";
import 'dotenv/config';

const conexao = async () => {
    const URI = process.env.MONGO;
    const client = new MongoClient(URI);
    const con = await client.connect();

    return con;
}

export const manipularDB = async (jogo, callback) => {
    let resultado;
    try {
        const con = await conexao();
        resultado = await callback(con, jogo);
        con.close();
    } catch (e) {
        resultado = null;
        console.error(e.message);
    } finally {
        return resultado;
    }
}

export const getJogos = async (con) => await con.db("Jogos4info3").collection("jogos").find({}).toArray();
export const getJogo = async (con, jogo) => await con.db("Jogos4info3").collection("jogos").findOne({_id: new ObjectId(jogo.id)});
export const deleteJogo = async (con, jogo) => await con.db("Jogos4info3").collection("jogos").findOneAndDelete({_id: new ObjectId(jogo.id)});

export const createJogo = async (con, jogo) => {
    await con.db("Jogos4info3").collection("jogos").insertOne(jogo);

    return `jogo ${jogo.nome} adicionado ao MongoDB!`;
}

export const attJogo = async (con, jogo) => {
    const _id = new ObjectId(jogo.id);
    delete jogo.id;
    await con.db("Jogos4info3").collection("jogos").replaceOne({ _id }, jogo);

    return `jogo ${jogo.nome} atualizado no MongoDB!`;
}