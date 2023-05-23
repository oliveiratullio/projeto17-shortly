import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { deleteurl, geturlById, updateVisitCount } from "../repositories/url.repository.js";

export async function getUrlById(req, res){
    try {
        const id = res.locals.id
        const results = await geturlById(id)
        if(results.rowCount === 0) return res.sendStatus(404)
        return res.status(200).send(results.rows[0])
    } catch (err) {
        return res.status(500).send(err.messsage)
    }
}
export async function redirectToUrl(req, res){    
    try {       
        const urlData = res.locals.urlData
        await updateVisitCount(urlData.id)
        const absoluteUrl = urlData.url.startsWith('http') ? urlData.url : `http://${urlData.url}`
        return res.redirect(absoluteUrl)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
export async function deleteUrl(req, res) {
    try {
      const id = res.locals.id
      const session = res.locals.session
      const secretKey = process.env.JWT_SECRET
      const user = jwt.verify(session.token, secretKey)
      const result = await deleteurl(id, user.id)
      if (result.rowCount === 0) return res.sendStatus(401)
      res.sendStatus(204)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  }
  export async function getMyUrls(req, res) {
  try {
    return "oi"
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
export async function shortenUrl(req, res) {
  try {
    const { url } = req.body
    const session = res.locals.session
    const secretKey = process.env.JWT_SECRET
    const user = jwt.verify(session.token, secretKey)
    const shortUrl = nanoid()
    const result = await shortUrl(user.id, url, shortUrl)
    res.status(201).send({ id: result.rows[0].id, shortUrl })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}