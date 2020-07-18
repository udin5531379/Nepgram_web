module.exports = async function(req, res) {
  console.log("Creating Comment...")
  const postid = req.param('id') //current post ko id in which we want to post the comment
  const userID = req.session.userId //current loggedin user ko userID

  await CommentModel.create({
    text: req.body.commentText, // yo chahe html form comment.ejs bata aako in which the form has textArea of name="commentText"
    post: postid,
    user: userID
  })

  res.redirect('/post/' + postid)
}
