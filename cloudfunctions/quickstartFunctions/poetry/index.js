const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const poet_tang = 'poet_tang'
const poet_song = 'poet_song'
const ci = 'ci'

// 查询数据库集合云函数入口函数
exports.getTang = async (event, context) => {
  // 返回数据库查询结果
  return await db.collection(poet_tang)
    .get();
};

exports.getSong = async (event, context) => {
  // 返回数据库查询结果
  return await db.collection(poet_song)
    .get();
};

exports.getCi = async (event, context) => {
  // 返回数据库查询结果
  return await db.collection(ci)
    .get();
};
