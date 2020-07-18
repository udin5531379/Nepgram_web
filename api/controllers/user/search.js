//display all the currently registred users
module.exports = async function(req, res){
    console.log("Displaying registered that the logged in user is following");
    const users = await User.find({
      id: {'!=': req.session.userId} //yesley chahe currently logged ]In user display bata haataucha
    })

    const currentUser = await User.findOne({id: req.session.userId}).populate('following')
    currentUser.following.forEach((f) => {
      console.log(f.fullName)
      console.log("This is f.id ", f.id)

      users.forEach((u) => { //this user is from line 4
        console.log("This is u.id ", u.id)
        if (f.id == u.id){
          console.log("Since the f.id and u.id is same the logged in user is following: ", f.fullName);
          u.isFollowing = true
        }
      })

    })

    //this sanitizedUser prevents the browswer from over exposing the the user data and only expose id  id, fullName isFollowing ets
    const sanitizedUser = users.map(u => {
      return {id : u.id, fullName : u.fullName, emailAddress: u.emailAddress, isFollowing: u.isFollowing}
    })

   if (req.wantsJSON){
     return res.send(sanitizedUser) // yo chahe JSON file return garna for iOS app
   }

   res.view('pages/user/search', {
      layout: 'layouts/nav-layout-for-search',
      users: sanitizedUser
    })
}
