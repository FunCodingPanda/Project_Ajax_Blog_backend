const model = require('../models/blog')

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
  const blog = model.getAll(req.query.all)

  if(blog.error) {
    return next ({
      status: 404, 
      message: `Get all blogs denied`
      error: blog.error
    })
  }
  res.status(200).json( { blog } )
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
  const updatedAccount = model.updateAccount(id, req.body)

  if (updatedAccount.errors) {
    return next({
      status: 404,
      message: ``,
      errors: updatedAccount.errors
    })
  } else if (updatedAccount.error) {
    return next({
      status: 404,
      message: ``,
      error: updatedAccount.error
    })
  }

  res.status(200).json({ account: updatedAccount })
}

deleteById = (req, res, next) => {
  const id = req.params.id
  const deleteById = model.deleteById(id)

  if (.errors) {
    return next({
      status: 404,
      message: `Was not able to delete blog`,
      error: deleteById.errors
    })
  }

  res.status(204).json({ blog: deleteById })
}

module.exports = { create, getAll, getById, update, deleteById }

