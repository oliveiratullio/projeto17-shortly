import { rankingR } from "../repositories/ranking.repository.js";

export async function ranking(req, res){
    try {
        const result = await rankingR()
        return res.status(200).send(result.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}