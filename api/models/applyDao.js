const {dataSource} = require('./data-source');

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

const checkApplymentById = async(applymentId) => {
    const [result] = await dataSource.query(
        `SELECT EXISTS(
            SELECT *
            FROM applyments
            WHERE id = ?
        ) as a
        `, [applymentId]
    )

    return result.a
}

const checkApplymentByUser = async(userId, recruitId) => {
    const [result] = await dataSource.query(
        `SELECT EXISTS(
            SELECT *
            FROM applyments
            WHERE user_id = ?
            AND recruit_id = ?
        ) as a
        `,[ userId, recruitId]
    )
    return result.a
}

const getAppplymentByUserId = async(userId) => {
    const result = await dataSource.query(
        `SELECT
            a.id as applymentId,
            r.id as recruitId,
            r.title,
            JSON_ARRAYAGG(af.type) as type,
            JSON_ARRAYAGG(af.value) as value,
            a.created_at as createdAt
        FROM applyments a
        INNER JOIN recruits as r ON r.id = a.recruit_id
        INNER JOIN applyment_forms as af ON af.applyment_id = a.id
        WHERE user_id = ${userId}
        GROUP BY applymentId
        `
    )
    return result;
}

const applyRecruitsWithoutCareer = async(userId, recruitId, forms) => {
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
        await queryRunner.query(
            `INSERT INTO applyments(
                user_id,
                recruit_id
            ) VALUES (?, ?)
            `, [userId, recruitId]
        );

        const [applyment] = await queryRunner.query(
            `SELECT id
            FROM applyments
            WHERE user_id = ?
            AND recruit_id = ?
            `, [userId, recruitId]
        )

        const setData = forms.map(form => `(${applyment.id},"${form.type}","${form.value}")`);
        const setList = setData.join(',');

        await queryRunner.query(
            `INSERT INTO applyment_forms(
                applyment_id,
                type,
                value
            ) VALUES ${setList}
            `
        );

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
        const error = new Error(err.message);
        throw error;
    } finally {
        await queryRunner.release();
    }
}

const applyRecruits = async(userId, recruitId, careerId, forms) => {
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        await queryRunner.query(
            `INSERT INTO applyments(
                user_id,
                recruit_id
            ) VALUES (?, ?)
            `, [userId, recruitId]
        );

        const [applyment] = await queryRunner.query(
            `SELECT id
            FROM applyments
            WHERE user_id = ?
            AND recruit_id = ?
            `, [userId, recruitId]
        )

        const setFormData = forms.map(form => `(${applyment.id},"${form.type}","${form.value}")`);
        const setFormList = setFormData.join(',');

        await queryRunner.query(
            `INSERT INTO applyment_forms(
                applyment_id,
                type,
                value
            ) VALUES ${setFormList}
            `
        );
        
        const setCareerData = careerId.map(career => `(${career.id},${applyment.id})`)
        const setCareerList = setCareerData.join(',')

        await queryRunner.query(
            `INSERT INTO applyments_careers(
                career_id,
                applyment_id
            ) VALUES ${setCareerList}
            `
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

const updateApplyment = async(applymentId, forms) => {
    type = forms.map(form => form.type);
    value = forms.map(form => form.value);

    for (let i in forms) {
        return await dataSource.query(
            `UPDATE applyment_forms
            SET value = ?
            WHERE applyment_id = ?
            AND type = ?
            `, [value[i], applymentId, type[i]]
        )
    }
}

const deleteApplyment = async(applymentId) => {
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
        await queryRunner.query(
            `DELETE FROM applyments_careers
            WHERE applyment_id = ?
            `, [applymentId]
        )

        await queryRunner.query(
            `DELETE FROM applyment_forms
            WHERE applyment_id = ?
            `, [applymentId]
        )

        await queryRunner.query(
            `DELETE FROM applyments
            WHERE id = ?
            `, [applymentId]
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
    checkRecruitById,
    checkApplymentById,
    checkApplymentByUser,
    getAppplymentByUserId,
    applyRecruitsWithoutCareer,
    applyRecruits,
    updateApplyment,
    deleteApplyment
}