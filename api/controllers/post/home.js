//yesley chahe view load garcha
module.exports = async function (req, res){

  console.log('Loading data in the home Page...')

  //aba caheh post display garauna lai

  const userId = req.session.userId
  // const allPosts = await Post.find({user: userId}).populate('user').sort('createdAt DESC')
  const allPosts = []
  const feedItems = await FeedItem.find({user: userId}).sort('postCreatedAt DESC').populate('post').populate('postOwner')//yesma chahe current userID rakheyko kina bhaney current userId ko home ma current usser ley follow gareyko user ko post display garauney ho tei bhayera current user ko id and current user ley follow gareyko users ko post id fetch gareyko ho
  feedItems.forEach(fi => {

    if(fi.post){
      console.log(fi.post) //yesley chahe current user ko post ID matra print garcha if populate gareyna bhaneychahe
                          // populate('post') garesi chahe fi.post ley full information diplay garcha for post
      fi.post.user = fi.postOwner
      fi.post.canDelete = fi.post.user.id == req.session.userId //post bhitra ko user ko id chahe current user ko id sanga match huncha bhaye matra delete button appear garauney 
      allPosts.push(fi.post) // yo chahe aba gayera allPosts ma append gareyko which will diplay the post of all the followed user.
    }

  })


  // allPosts.forEach((p) => {
  //   p.canDelete = true
  // })


  //this is done to remove password and sensitive information frim browser
  const string = JSON.stringify(allPosts) //customToJSON use gareyko bhayera wa will not be printing out the password inthe web inspect
  const objects = JSON.parse(string) //string lai Json object ma convert gareyko ex: https://www.w3schools.com/js/tryit.asp?filename=tryjson_parse




//aba req pathauda jaslai JSON dta chahecha jason pathauney kaam chahe yesko
  if(req.wantsJSON){
    return res.send(allPosts)
  }

  res.view('pages/post/home', {
    allPosts: objects,
    layout:'layouts/layout-for-homeJS'
  })
  //console.log(allPosts)
//allPost chahe database bata aako sabai post haru ho which is passed to the "Below are my post:" in the UI which is home.ejs ma

}
