const { dataSource } = require('./data-source');

const checkUserId = async (naver_id) => {
  const [result] = await dataSource.query(
    `
  SELECT 
    id
  FROM
    users
  WHERE
    naver_id = ? 
  `,
    [naver_id]
  );

  return result;
};

const registrateUser = async (info) => {
  const result = await dataSource.query(
    `
    INSERT INTO users(
        naver_id,
        name,
        email,
        mobile,
        gender,
        birth
    ) VALUES (?, ?, ?, ? ,?, ?) 
    `,
    [info.naver_id, info.name, info.email, info.mobile, info.gender, info.birth]
  );

  return [result];
};

const getUserById = async (id) => {
  const [result] = await dataSource.query(
    `
    SELECT 
      id,
      name,
      email,
      mobile,
      gender,
      birth
    FROM
      users
    WHERE
      id = ? 
    `,
    [id]
  );
  return result;
};

module.exports = {
  checkUserId,
  registrateUser,
  getUserById,
};
