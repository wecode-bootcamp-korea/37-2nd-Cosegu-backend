const { dataSource } = require('./data-source')
const queryRunner = dataSource.createQueryRunner();

const checkCategory = async (categoryId) => {
    const [result] = await dataSource.query(
        `SELECT EXISTS(
            SELECT *
            FROM categories
            WHERE id IN (?)
        )as a
        `, [categoryId]
    )

    return result.a;
}

const getRecruitList = async (limit, offset) => {
    const result = await dataSource.query(
        `SELECT
            r.title,
            r.description,
            r.main_business,
            r.qualification, 
            r.preferential_treatment,
            c.name
        FROM recruits r
        INNER JOIN categories as c ON c.id = r.category_id
        INNER JOIN companies as com ON com.id = r.company_id
        WHERE r.company_id = 1
        LIMIT ? OFFSET ?
        `, [limit, offset]
    )

    return result;
}

const getByCategoryId = async (categoryId, limit, offset) => {
    const result = await dataSource.query(
        `SELECT
            r.title,
            r.description,
            r.main_business,
            r.qualification, 
            r.preferential_treatment,
            c.name
        FROM recruits r
        INNER JOIN categories as c ON c.id = r.category_id
        INNER JOIN companies as com ON com.id = r.company_id
        WHERE r.company_id = 1
        AND r.category_id IN (?)
        LIMIT ? OFFSET ?
        `, [categoryId, limit, offset]
    )

    return result;
}

module.exports = {
    checkCategory,
    getRecruitList,
    getByCategoryId
}