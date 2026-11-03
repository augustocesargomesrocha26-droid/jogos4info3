import { ObjectId } from "mongodb";

export const getUsuarios = async (con) => await con.db("Jogos4info3").collection("usuarios").find({}).toArray();
export const getUsuario = async (con, usuario) => await con.db("Jogos4info3").collection("usuarios").findOne({_id: new ObjectId(usuario.id)});
export const deleteUsuario = async (con, usuario) => await con.db("Jogos4info3").collection("usuarios").findOneAndDelete({_id: new ObjectId(usuario.id)});

export const createUsuario = async (con, usuario) => {
    await con.db("Jogos4info3").collection("usuarios").insertOne(usuario);

    return `usuario ${usuario.email} adicionado ao MongoDB!`;
}

export const attUsuario = async (con, usuario) => {
    const _id = new ObjectId(usuario.id);
    delete usuario.id;
    await con.db("Jogos4info3").collection("usuarios").replaceOne({ _id }, usuario);

    return `usuario ${usuario.email} atualizado no MongoDB!`;
}