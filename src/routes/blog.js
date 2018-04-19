const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blog')

router.post('/', blogCtrl.create)
router.get('/', blogCtrl.getAll)
router.get('/:id', blogCtrl.getById)
router.put('/:id', blogCtrl.update)
router.delete('/:id', blogCtrl.deleteById)

module.exports = router 