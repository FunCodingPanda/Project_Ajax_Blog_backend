const model = require('../models/posts')

create = (req, res, next) => {
  const post = model.create(req.body)

  if(post.errors){
    return next ({
      status:404,
      message: `Could not create post`,
      errors: post.errors
    })
  }

  res.status(201).json({ post })
}

getAll = (req, res, next) => {
  const posts = model.getAll(req.query.all)

  if(posts.error) {
    return next ({
      status: 404, 
      message: `Get all posts denied`,
      error: posts.error
    })
  }
  res.status(200).json( { posts } )
}

getById = (req, res, next) => {
  const id = req.params.id
  const post = model.getById(id)

  if (post.error) {
    return next({
      status: 404,
      message: `Couldn't get post by id`,
      error: post.error
    })
  }

  res.status(200).json({ post })
}

update = (req, res, next) => {
  const id = req.params.id
  const updatedPost = model.update(id, req.body)

  if (updatedPost.errors) {
    return next({
      status: 404,
      message: ``,
      errors: updatedPost.errors
    })
  }

  res.status(200).json({ post: updatedPost })
}

deleteById = (req, res, next) => {
  const id = req.params.id
  const deleteById = model.deleteById(id)

  if (deleteById.errors) {
    return next({
      status: 404,
      message: `Was not able to delete post`,
      error: deleteById.errors
    })
  }

  res.status(204).json({ post: deleteById })
}

module.exports = { create, getAll, getById, update, deleteById }
