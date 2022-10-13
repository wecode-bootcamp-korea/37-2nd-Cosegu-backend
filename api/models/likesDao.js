const {dataSource} = require('./data-source');

const getLikesList = async (userId) => {
    const result = await dataSource.query(
        `SELECT
            r.id as likeRecruitId,
            r.title,
            r.division,
            r.region,
            r.employment_type as employmentType,
            r.main_business,
            r.qualification,
            r.preferential_treatment
        FROM likes as l
        INNER JOIN recruits as r ON l.recruit_id = r.id
        WHERE l.user_id = ?
        `, [userId]
    )

    return result;
}

const checkRecruitById = async(recruitId) => {
    const [result] = await dataSource.query(
        `SELECT EXISTS(
            SELECT *
            FROM recruits
            WHERE id = ?
        ) as a
        `, [recruitId]
    )

    return result.a
}

const checkLikesById = async(userId, recruitId) => {
    const [result] = await dataSource.query(
        `SELECT EXISTS(
            SELECT *
            FROM likes
            WHERE user_id = ?
            AND recruit_id = ?
        ) as a
        `, [userId, recruitId]
    )

    return result.a
}

const likeRecruit = async(userId, recruitId) => {
    const result = await dataSource.query(
        `INSERT INTO likes(
            user_id,
            recruit_id
        ) VALUES (?, ?)
        `, [userId, recruitId]
    )
    return result;
}

const deleteOneLike = async(userId, recruitId) => {
    const result = await dataSource.query(
        `DELETE FROM likes
        WHERE user_id = ?
        AND recruit_id = ?
        `, [userId, recruitId]
    )
    
    return result;
}

const deleteAllLIkes = async(userId) => {
    const result = await dataSource.query(
        `DELETE FROM likes
        WHERE user_id = ?
        `, [userId]
    )

    return result;
}

module.exports = {
    getLikesList,
    checkRecruitById,
    checkLikesById,
    likeRecruit,
    deleteOneLike,
    deleteAllLIkes
}