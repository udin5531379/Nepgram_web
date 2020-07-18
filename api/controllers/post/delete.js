module.exports = async function(req, res) {

  console.log("Clicked Delete button")

  const postId = req.param('postIdFromRoutes')
  console.log("the id of the post user currenlty is deleting is: " + postId)


  try {

    await Post.destroy({id: postId})
    res.end()

  } catch (err) {

    res.serverError(err.toString())

  }

}
