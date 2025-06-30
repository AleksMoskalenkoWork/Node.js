const path = require('path');
const fs = require('fs');
const he = require('he');

const dataJson = require('../data.json');

module.exports = {
  add: (username, message) => {
    const fileName = path.resolve(__dirname, '../data.json');

    const createTime = new Date().getTime();
    const feedbackTemplate = {
      createTime: he.encode(`${createTime}`),
      username: he.encode(`${username}`),
      message: he.encode(`${message}`),
    };
    dataJson.push(feedbackTemplate);
    fs.writeFile(fileName, JSON.stringify(dataJson, null, 2), (error) => {
      if (error) throw new Error('Sorry! Something went wrong.');
    });
  },
  getAll: dataJson,
};
