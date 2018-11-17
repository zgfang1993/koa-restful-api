const {User} = require('./models');

const USER_NO = 10;
const CryptoJS = require("crypto-js"); // 加密

function generateUsers(n) {
  const users = [];
  for(let i = 0; i< n; i++){
    users.push({
      id: '2018'+i,
      username: '咕噜'+i,
      gender: Math.random() < 0.5 ? 0 : 1,
      password: CryptoJS.MD5('11111'+i)+'',
      email: '47255516'+i+'@qq.com',
      phone: '1898765432'+i,
      avatar: 'http://hhhhhhhh',
      status: Math.random() < 0.5 ? 1 : 2,
      description: '描述'+i,
    });
  }
  
  return users;
}

// 初始化数据
async function initMockData() {
  try {
    // 批量创建
    await User.bulkCreate(generateUsers(USER_NO));
  } catch (error) {
    console.log(error)
  }
}

initMockData();