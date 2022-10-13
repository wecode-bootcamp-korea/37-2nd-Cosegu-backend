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

const countCategory = async() => {
    const result = dataSource.query(
        `SELECT
            c.name AS categoryName,
            count(name) AS categoryCount
        FROM recruits r
        JOIN categories c on r.category_id = c.id
        GROUP BY c.name;
        `
    )
    return result;
}

const getRecruit = async (limit, offset) => {

    const result = await dataSource.query(
        `SELECT
            r.id as recruitId,
            r.title,
            r.division,
            r.region,
            r.employment_type as employmentType,
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
            r.division,
            r.region,
            r.employment_type as employmentType,
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
    }

    const result = await dataSource.query(
        `SELECT
            a.recruitId,
            a.title,
            a.division,
            a.region,
            a.employmentType
            a.mainBusiness,
            a.qualification,
            a.preferentialTreatment,
            a.categoryName,
            a.tagName
        FROM (
            SELECT
                r.id as recruitId,
                r.title,
                r.division,
                r.region,
                r.employment_type as employmentType,
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
        WHERE UPPER(a.tagName) REGEXP (UPPER('${tmp}'))
        `
    )
    return result
}

const getRecruitDetail = async(recruitId) => {
    const result = await dataSource.query(
        `SELECT
            r.id as recruitId,
            r.title,
            r.division,
            r.region,
            r.employment_type as employmentType,
            r.main_business as mainBusiness,
            r.qualification, 
            r.preferential_treatment as preferentialTreatment,
            c.name as categoryName
        FROM recruits r
        INNER JOIN categories as c ON c.id = r.category_id
        INNER JOIN companies as com ON com.id = r.company_id
        WHERE r.id = ?
        `, [recruitId]
    )
    return result;
}

const searchRecruitList = async(input, limit, offset) => {
    const result = await dataSource.query(
        `SELECT
            a.recruitId,
            a.title,
            a.division,
            a.region,
            a.employmentType,
            a.mainBusiness,
            a.qualification,
            a.preferentialTreatment,
            a.categoryName,
            a.tagName
        FROM (
            SELECT
                r.id as recruitId,
                r.title,
                r.division,
                r.region,
                r.employment_type as employmentType,
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
            GROUP BY r.id
            LIMIT ${limit} OFFSET ${offset}
        )as a
        WHERE UPPER(a.title) LIKE UPPER('%${input}%')
        OR UPPER(a.tagName) LIKE UPPER('%${input}%')
        `
    )

    return result;
}

module.exports = {
    countCategory,
    getRecruit,
    checkCategory,
    getRecruitsByCategoryId,
    getRecruitsByTagId,
    getRecruitDetail,
    searchRecruitList
}   