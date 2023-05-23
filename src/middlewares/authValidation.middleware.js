import { addSession } from "../repositories/url.repository";

export async function authValidation(req, res, next){
    try{
        const {authorization} = req.headers
        const token = authorization?.replace("Bearer ", "")
        if(!token) return res.sendStatus(401)
        const session = await addSession(token)
        if(session.rowCount === 0) return res.sendStatus(401)
        res.locals.session = session.rows[0]
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }
}