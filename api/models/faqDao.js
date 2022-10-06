const { dataSource } = require('./data-source');

const getFaq = async (keyword) => {
  const stateWhere = `WHERE (question like '%${keyword}%' OR answer like '%${keyword}%')`;

  const result = await dataSource.query(
    `
    SELECT
      id,
      question,
      answer
    FROM 
      frequently_asked_questions
    ${stateWhere} 
    `
  );
  return result;
};

const sendQuestion = async (fileUrl, title, content, userId) => {
  await dataSource.query(
    `
    INSERT INTO questions(
      title,
      content,
      file_url,
      user_id
    ) VALUES (?,?,?,?)
    `,
    [title, content, fileUrl, userId]
  );
};

module.exports = {
  getFaq,
  sendQuestion,
};
