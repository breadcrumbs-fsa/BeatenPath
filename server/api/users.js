const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // const users = await User.findAll({
    //   // explicitly select only the id and email fields - even though
    //   // users' passwords are encrypted, it won't help if we just
    //   // send everything to anyone who asks!
    //   attributes: ['id', 'email']
    // })
    console.log('user: ', req.user)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = await User.findByPk(req.params.userId)
    if (userId) {
      res.json(userId)
    } else {
      res.send('user not found')
    }
  } catch (err) {
    next(err)
  }
})
