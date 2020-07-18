module.exports = async function(req, res) {
  const id = req.param('userIdFromProfileLink')
  const user = await User.findOne({id: id}).populate('following').populate('followers') // findOne() yesle chahe array return gardaina
  console.log("id of the user", user.fullName)

  const posts = await Post.find({user: id}).populate('user').sort('createdAt DESC')
  // this is to check i fthe current logge in user is foolowing that oerson or not.. first checks the followers list of that user and if th follower id matches the id of the current logge din user, the current logged in user isFollowing is true

  user.posts = posts

  user.followers.forEach(f => {
   if (f.id === req.session.userId) {
     user.isFollowing = true
   } else {
     user.isFollowing = false
   }
  })

  const sanitizedUsers = JSON.parse(JSON.stringify(user))// This is done to pass only the selected items that we can show in the browser

  sanitizedUsers.isFollowing = user.isFollowing





   if (req.wantsJSON) {
    return res.send(sanitizedUsers)
   }

   res.view('pages/user/publicprofile', {
    layout: 'layouts/layout-for-homeJS',
    user: sanitizedUsers
  })
}
