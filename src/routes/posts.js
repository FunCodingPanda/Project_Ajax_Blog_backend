const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/posts')

router.post('/', postCtrl.create)
router.get('/', postCtrl.getAll)
router.get('/:id', postCtrl.getById)
router.put('/:id', postCtrl.update)
router.delete('/:id', postCtrl.deleteById)

module.exports = router
