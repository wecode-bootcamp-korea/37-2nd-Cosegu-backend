const { dataSource } = require('./data-source');

const getInfo = async (id) => {
  const result = await dataSource.query(
    `
    SELECT 
      a.id AS applymentId, 
      u.name, 
      u.email, 
      u.birth, 
      u.gender, 
      u.mobile, 
      r.title AS recruitTitle, 
      a.created_at 
    FROM users u 
    JOIN applyments a on a.user_id = u.id 
    JOIN recruits r on r.id = a.recruit_id 
    WHERE u.id = ?
  `,
    [id]
  );
  return result;
};
const getQuestion = async (id) => {
  const result = await dataSource.query(
    `
    SELECT 
      q.title, 
      q.content, 
      q.file_url AS fileUrl 
    FROM questions q 
    JOIN users u on u.id = q.user_id 
    WHERE u.id=?
    `,
    [id]
  );
  return result;
};

module.exports = {
  getInfo,
  getQuestion,
};
