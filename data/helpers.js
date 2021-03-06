const fs = require('fs')
const path = require('path')

readDatabase = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'storedData.json'), 'utf-8'))
}

writeDatabase = (posts) => {
  return fs.writeFileSync(path.join(__dirname, 'storedData.json'), JSON.stringify(posts)) 
}

post = (id) => {
  return readDatabase().find(post => post.id == id)
}

module.exports = { readDatabase, writeDatabase, post }
