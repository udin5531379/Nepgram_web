module.exports = async function(req, res){

  console.log("Comment Section Clicked")

  const postId = req.param('postIdForCommentSection')
  const post = await Post.findOne({id: postId}).populate('user')

  const comments= await CommentModel.find({
    post: postId
  }).sort('createdAt DESC').populate('user')

  //this is for comment section for time stamp
  comments.forEach(c => {
    c.fromNow = sails.moment(c.createdAt).fromNow()
  })

  post.comments = comments // post ma chahe comments append gareyko

  if(req.wantsJSON) {
      return res.send(post)
  }

  //and if we are not requesting JSON we will retun some view files

  res.view('pages/user/comment', {
    layout: 'layouts/nav-layout-for-search',
    post: JSON.parse(JSON.stringify(post))
  })

}
