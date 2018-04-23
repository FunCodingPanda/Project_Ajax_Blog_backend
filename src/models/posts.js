const data = require('../../data/storedData.json')
const helpers = require('../../data/helpers')
const uuid = require('uuid/v4')

create = (body) => {
  let response 
  if (!body.title || !body.content) {
    
    response = { 
      status: 400,
      message: 'The fields are missing, title and content are both required fields. '
    }
  } else {
    const array = helpers.readDatabase()

    const post = {
      id: uuid(),
      title: body.title,
      content: body.content
    }

    response = post

    array.push(post)
    helpers.writeDatabase(array)
  }
  return response 
}

getAll = (id) => { 
  return helpers.readDatabase();
}

getById = (id) => {
  const post = helpers.post(id);

  if (!post) {
    response = {
      status: 404, 
      message: `post Id is not found`
    }
    return response;
  } else {
    return post;
  }
}

update = (id, body) => {
  const post = helpers.post(id)
  const posts = helpers.readDatabase()

  if (!post || !body) {
    return {
      status: 404, 
      message: `post was not found, title or content is/are not there or updated properly`,
      errors: `Not found or required`
    }
  } else {
    const update = {
      id, 
      title: body.title || post.title,
      content: body.content || post.content,
    }
    const postIndex = posts.findIndex(a => a.id === post.id)
    posts[postIndex] = update
    helpers.writeDatabase(posts)
    return update
  }
}

deleteById = (id) => {
  const posts = helpers.readDatabase()
  const errors = []
  
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      posts.splice(i, 1);
      helpers.writeDatabase(posts)
      return {message: `post is now deleted`}
    }
  }
  errors.push('Could not delete post')
  return { errors }
}

module.exports = { create, getAll, getById, update, deleteById }
