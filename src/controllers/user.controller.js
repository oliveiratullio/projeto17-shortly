import { insertSession, insertUser } from "../repositories/user.repository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function signUp(req, res){
    try{
        const {name, email, password} = req.body
        const hash = bcrypt.hashSync(password, 10)
        await insertUser(name, email, hash)
        return res.sendStatus(201)
    } catch (err) {   
        return res.status(500).send(err.message)
    }
}
export async function signIn(req, res){
    try{
        const user = res.locals.user
        const secretKey = process.env.JWT_SECRET
        const token = jwt.sign(user, secretKey)
        await insertSession(token)
        res.status(200).send({token})
    } catch (err) {
        return res.status(500).send(err.message)
    }
}