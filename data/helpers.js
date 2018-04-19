const fs = require('fs')
const path = require('path')

readDatabase = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'storedData.json'), 'utf-8'))
}

writeDatabase = (accounts) => {
  return fs.writeFileSync(path.join(__dirname, 'storedData.json'), JSON.stringify(blog)) 
}

blog = (id) => {
  return readDatabase().find(blog => blog.id === id)
}

module.exports = { readDatabase, writeDatabase }