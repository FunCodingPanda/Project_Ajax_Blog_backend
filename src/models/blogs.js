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

    const blog = {
      id: uuid(),
      title: body.title,
      content: body.content
    }

    response = blog

    array.push(blog)
    helpers.writeDatabase(array)
  }
  return response 
}

getAll = (id) => { 
  return helpers.readDatabase();
}

getById = (id) => {
  const blog = helpers.blog(id);

  if (!blog) {
    response = {
      status: 404, 
      message: `Blog Id is not found`
    }
    return response;
  } else {
    return blog;
  }
}

update = (id, body) => {
  const blog = helpers.blog(id)
  const blogs = helpers.readDatabase()

  if (!blog || !body) {
    return {
      status: 404, 
      message: `blog was not found, title or content is/are not there or updated properly`,
      errors: `Not found or required`
    }
  } else {
    const update = {
      id, 
      title: body.title || blog.title,
      content: body.content || blog.content,
    }
    const blogIndex = blogs.findIndex(a => a.id === blog.id)
    blogs[blogIndex] = update
    helpers.writeDatabase(blogs)
    return update
  }
}

deleteById = (id) => {
  const blogs = helpers.readDatabase()
  const errors = []
  
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].id == id) {
      const foundblog = blogs[i];
      blogs.splice(i, 1);
      helpers.writeDatabase(blogs)
      return {message: `Blog is now deleted`}
    }
  }
  errors.push('Could not delete blog')
  return { errors }
}

module.exports = { create, getAll, getById, update, deleteById }
