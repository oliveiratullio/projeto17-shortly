import {db} from "../database/database.connection.js"

export async function geturlById(id){
    const result = await db.query(`SELECT "urls".id, "urls"."shortUrl", "urls"."url" FROM "urls"WHERE id =$1;`, [id])
    return result
}
export async function getUrlByShortUrl(shortUrl){
    const result = await db.query(`SELECT * FROM urls WHERE "shortUrl" =$1;`, [shortUrl])
    return result
}
export async function updateVisitCount(urlId){
    const result =  await db.query(`UPDATE shorts SET views = views + 1 WHERE id =$1;`, [urlId])
    return result
}
export async function addSession(token){
    const result = await db.query(`SELECT * FROM sessions WHERE token =$1;`, [token])
    return result
}
export async function deleteurl(urlId, userId){
    const result = await db.query(`DELETE FROM urls WHERE id =$1 AND "userId" =$2;`, [urlId, userId])
    return result
}
export async function shortUrl(userId, url, shortUrl){
    const result = await db.query(`INSERT INTO "urls" ("userId", "url", "shortUrl") VALUES ($1, $2, $3) RETURNING id;`, [userId, url, shortUrl])
    return result
}
