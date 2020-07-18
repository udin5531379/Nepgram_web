module.exports = async function(req, res) {
  //res.send("A new world")
  const users = await User.find({})

  res.send(users)
}
