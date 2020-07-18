module.exports = async function(req, res) {
  const currentUser = await User.findOne({id: req.session.userId}).populate('following').populate('followers')
  console.log(currentUser)

  //current user ko post, current user kasari nikalcha bhaney req.session.userId bata
  const posts = await Post.find({user: req.session.userId}).populate('user').sort('createdAt DESC')

  currentUser.posts = posts //extreme right ko posts is from User model

  const santizedUser = JSON.parse(JSON.stringify(currentUser)) //yo gareysi chahe all the sensetive information is gone because this stingify uses CustomToJSON function

  if (req.wantsJSON) {
    return res.send(currentUser)// returning the JSON file
  }

  res.view('pages/user/profile', {
    layout: 'layouts/nav-layout-for-search',
    user: santizedUser //for exposing the user in profile.ejs
  })
}
