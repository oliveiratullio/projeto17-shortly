import { getUrlByShortUrl, geturlById } from "../repositories/url.repository.js";


export async function validateId(req, res, next){
    try{
        const id = parseInt(req.params.id)
        if(isNaN(id)) return res.sendStatus(400)
        res.locals.id = id
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
export async function validateShortUrl(req, res, next){
    try {
        const {shortUrl} = req.params
        const result = await getUrlByShortUrl(shortUrl)
        if(result.rowCount === 0) return res.sendStatus(404)
        res.locals.urlData = result.rows[0]
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
export async function validateUrl(req, res, next){
    try {
        const id = res.locals.id
        const urlExists = geturlById(id)
        if(urlExists.rowCount === 0) return res.sendStatus(404)
        next()
    } catch (err) {
        return res.status(500).send(err.message)
    }
}