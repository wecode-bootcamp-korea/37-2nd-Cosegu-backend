const {dataSource} = require('./data-source');

const getCareerByUser = async(userId) => {
    const result = await dataSource.query(
        `SELECT
            id as careerId,
            company,
            department,
            position,
            DATE_FORMAT(start_date, '%Y-%m-%d') as startDate,
            DATE_FORMAT(end_date, '%Y-%m-%d') as endDate,
            work_type as workType,
            work
        FROM careers
        WHERE user_id = ?
        `, [userId]
    )

    return result;
}

const addCareers = async(userId, careers) => {

    const {companyName, department, position, startDate, endDate, workType, work} = careers;

    const result = await dataSource.query(
        `INSERT INTO careers(
            company,
            department,
            position,
            start_date,
            end_date,
            work_type,
            work,
            user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [companyName, department, position, startDate, endDate, workType, work, userId]
    )

    return result;
}

const updateCareer = async(userId, contents) => {

    const setData = contents.map(content => `${content.column} = "${content.value}"`);
    const setList = setData.join(',')

    const result = await dataSource.query(
        `UPDATE careers
        SET ${setList}
        WHERE user_id = ${userId}
        `
    )

    return result;
}

const deleteCareerById = async(careerId) => {
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
        await queryRunner.query(
            `DELETE FROM applyments_careers
            WHERE career_id = ?
            `, [careerId]
        )

        await queryRunner.query(
            `DELETE FROM careers
            WHERE id = ?
            `, [careerId]
        )

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        const error = new Error(err.message);
        error.statusCode = 400;
        throw error;
    } finally {
        await queryRunner.release();
    }
    
}

module.exports = {
    getCareerByUser,
    addCareers,
    updateCareer,
    deleteCareerById
}