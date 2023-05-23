
export async function rankingR(){
    const result = await db.query(`
        SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") as "visitCount"
            FROM users
            JOIN urls 
            ON users.id = urls."userId"
            GROUP BY users.id, users.name
            ORDER BY "visitCount" DESC
            LIMIT 10;
    `);
    return result;
}