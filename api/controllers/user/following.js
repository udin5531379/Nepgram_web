module.exports = async function(req, res) {
  console.log("Folowing button pressed "+req.param('postIdFromRoutesForFollowing'));
  //Add to collection

  const currentUserID = req.session.userId
  const userIDCurrentUserIsFollowing = req.param('postIdFromRoutesForFollowing')

  //this id for the following, last parameter is an array which is userIDCurrentUserIsFollowing
  await User.addToCollection(currentUserID, 'following', userIDCurrentUserIsFollowing)

  const postForUserImFollowing = await Post.find({user: userIDCurrentUserIsFollowing})

  postForUserImFollowing.forEach(async p => {
    console.log(p.text)
    //current user ko id ma chahe followed user ko post id populate garna khojeyko yo chahe
    await FeedItem.create({
      post: p.id, //this is the post id for particular posts from the userthat i am following
      user: currentUserID,
      postOwner: userIDCurrentUserIsFollowing,
      postCreatedAt: p.createdAt
    })
    console.log(p.id)
    console.log(currentUserID)
  })


  //this is for the followers, last parameter is an array which is the currentUserID
  await User.addToCollection(userIDCurrentUserIsFollowing, 'followers', currentUserID)

  res.end('Successfully followed user')
}
