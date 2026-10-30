import { ObjectId } from "mongodb";

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