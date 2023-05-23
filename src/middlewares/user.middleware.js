import bcrypt from "bcrypt"
import { getUserByEmail } from "../repositories/user.repository.js";

export async function validateSignUp(req, res, next) {
    try{
        const {email} = req.body
        const result = await getUserByEmail(email)
        if(result.rowCount !== 0) return res.status(409)
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
export async function validateSignIn(req, res, next) {
    try{
        const {email, password} = req.body
        const result = await getUserByEmail(email)
        if(result.rowCount === 0) return res.sendStatus(401)
        const isPasswordCorrect = bcrypt.compareSync(password, result.rows[0].password)
        if(!isPasswordCorrect) return res.sendStatus(401)
        res.locals.user = result.rows[0]
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }
}