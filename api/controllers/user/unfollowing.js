module.exports = async function(req, res){
  const currentUserID = req.session.userId
  const userIDCurrentUserIsUnfollowing = req.param('postIdFromRoutesForUnfollowing') //this is the slug from the routes

  await User.removeFromCollection(currentUserID, 'following', userIDCurrentUserIsUnfollowing)

  await FeedItem.destroy({postOwner: userIDCurrentUserIsUnfollowing})

  await User.removeFromCollection(userIDCurrentUserIsUnfollowing, 'followers', currentUserID)

  res.end('Successfully unfollowed the user')
}
