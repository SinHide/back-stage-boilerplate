const ADMIN_JSON = {
  id: 1, 
  name: 'Admin', 
  authorities: 'admin',
}
const USER_JSON = {
  id: 2, 
  name: 'User', 
  authorities: 'user',
}

module.exports = (req, res, next) => {
  console.warn(req.path)
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'admin' && req.body.password === '123456') {
      res.status(200).json(ADMIN_JSON)
    } else if (req.body.username === 'user' && req.body.password === '123456') {
      res.status(200).json(USER_JSON)
    } else {
      res.status(400).json({ error: 'wrong password' })
    }
  } else {
    next()
  }
}