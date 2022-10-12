const { dataSource } = require('./data-source')

const checkCategory = async(categoryId) => {
    const [result] = await dataSource.query(
        `SELECT EXISTS(
            SELECT *
            FROM categories
            WHERE id IN (?)
        )as does_exist
        `, [categoryId]
    )

    return result.does_exist;
}

const getRecruit = async (limit, offset) => {
    const result = await dataSource.query(
        `SELECT
            r.id,
            r.title,
            r.description,
            r.main_business as mainBusiness,
            r.qualification, 
            r.preferential_treatment as preferentialTreatment,
            c.name as categoryName
        FROM recruits r
        INNER JOIN categories as c ON c.id = r.category_id
        INNER JOIN companies as com ON com.id = r.company_id
        WHERE r.company_id = 1
        LIMIT ? OFFSET ?
        `, [limit, offset]
    )

    return result;
}

const getRecruitsByCategoryId = async(categoryId, limit, offset) => {
    const result = await dataSource.query(
        `SELECT
            r.id as recruitId,
            r.title,
            r.description,
            r.main_business as mainBusiness,
            r.qualification, 
            r.preferential_treatment as preferentialTreatment,
            c.name as categoryName,
            JSON_ARRAYAGG(t.name) as tagName
        FROM recruits as r
        INNER JOIN categories as c ON c.id = r.category_id
        LEFT JOIN recruits_tags as rt ON rt.recruit_id = r.id
        LEFT JOIN tags as t ON t.id = rt.tag_id
        WHERE r.category_id IN (${categoryId})
        GROUP BY r.id
        LIMIT ${limit} OFFSET ${offset}
        `
    )
    return result
}

const getRecruitsByTagId = async(categoryId, tagName, limit, offset) => {
    tmp = "";

    if (typeof tagName === 'string') {
        tmp = tagName;
    } else {
        tagName.map(el => tmp += `${el}|`);
        tmp = tmp.slice(0,-1);
        console.log(tmp)
    }

    const result = await dataSource.query(
        `SELECT
            a.recruitId,
            a.title,
            a.description,
            a.mainBusiness,
            a.qualification,
            a.preferentialTreatment,
            a.categoryName,
            a.tagName
        FROM (
            SELECT
                r.id as recruitId,
                r.title,
                r.description,
                r.main_business as mainBusiness,
                r.qualification, 
                r.preferential_treatment as preferentialTreatment,
                c.name as categoryName,
                JSON_ARRAYAGG(t.id) as tagId,
                JSON_ARRAYAGG(t.name) as tagName
            FROM recruits as r
            INNER JOIN categories as c ON c.id = r.category_id
            INNER JOIN recruits_tags as rt ON rt.recruit_id = r.id
            INNER JOIN tags as t ON t.id = rt.tag_id
            WHERE r.category_id IN (${categoryId})
            GROUP BY r.id
            LIMIT ${limit} OFFSET ${offset}
        )as a
        WHERE a.tagName REGEXP ('${tmp}')
        `
    )
    return result
}

module.exports = {
    getRecruit,
    checkCategory,
    getRecruitsByCategoryId,
    getRecruitsByTagId
}   