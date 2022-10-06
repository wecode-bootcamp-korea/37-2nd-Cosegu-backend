const { userDao } = require('../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('qs');

const signIn = async (code) => {
  const tokenResponse = await axios.post(
    `https://nid.naver.com/oauth2.0/token`,
    qs.stringify({
      grant_type: 'authorization_code',
      client_id: 'M7RqsEOvkI7Fb33qpPnq',
      client_secret: 'p87VetJeBY',
      state: 'cosegu',
      code: code,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    }
  );

  const naverAccessToken = tokenResponse.data.access_token;

  const userInfoResponse = await axios.get(
    'https://openapi.naver.com/v1/nid/me',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: `Bearer ${naverAccessToken}`,
      },
    }
  );

  const userInfo = userInfoResponse.data.response;
  const user = await userDao.checkUserId(userInfo.id);

  if (user === undefined) {
    const info = {
      naver_id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      mobile: userInfo.mobile,
      gender: userInfo.gender,
      mobile: userInfo.mobile,
      birth: userInfo.birthyear + '-' + userInfo.birthday,
    };

    userDao.registrateUser(info);
  }

  const jwtToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return jwtToken;
};

const getUserById = async (id) => {
  const result = await userDao.getUserById(id);
  const user = {
    id: result.id,
    name: result.name,
    email: result.email,
    mobile: result.mobile,
    gender: result.gender,
    birth: result.birth,
  };
  return user;
};

module.exports = {
  signIn,
  getUserById,
};
