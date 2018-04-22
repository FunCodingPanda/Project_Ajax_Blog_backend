const model = require('../models/blogs')

create = (req, res, next) => {
  const blog = model.create(req.body)

  if(blog.errors){
    return next ({
      status:404,
      message: `Could not create blog`,
      errors: blog.errors
    })
  }

  res.status(201).json({ blog })
}

getAll = (req, res, next) => {
  const blogs = model.getAll(req.query.all)

  if(blogs.error) {
    return next ({
      status: 404, 
      message: `Get all blogs denied`,
      error: blogs.error
    })
  }
  res.status(200).json( { blogs } )
}

getById = (req, res, next) => {
  const id = req.params.id
  const blog = model.getById(id)

  if (blog.error) {
    return next({
      status: 404,
      message: `Couldn't get blog by id`,
      error: blog.error
    })
  }

  res.status(200).json({ blog })
}

update = (req, res, next) => {
  const id = req.params.id
  const updatedBlog = model.update(id, req.body)

  if (updatedBlog.errors) {
    return next({
      status: 404,
      message: ``,
      errors: updatedBlog.errors
    })
  }

  res.status(200).json({ blog: updatedBlog })
}

deleteById = (req, res, next) => {
  const id = req.params.id
  const deleteById = model.deleteById(id)

  if (deleteById.errors) {
    return next({
      status: 404,
      message: `Was not able to delete blog`,
      error: deleteById.errors
    })
  }

  res.status(204).json({ blog: deleteById })
}

module.exports = { create, getAll, getById, update, deleteById }
