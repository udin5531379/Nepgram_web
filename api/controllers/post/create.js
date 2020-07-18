//yesley chahe post create garcha and save it to database
module.exports = async function(req, res) {

  const postBody  = req.body.postBody //rato postBody html bata aako ie home.ejs bata
  console.log('This is a create for POST: ' + postBody)

  //yo imagefile chahe home.ejs file bata aako in which onfilechange bhanney div bata
  const file = req.file('imagefile')
  console.log(file)

  //we want to upload the file above "imagefile" in the aws bucket using the code below
  const options =
    { // This is the usual stuff
      adapter: require('skipper-better-s3')
    , key: ''
    , secret: ''
    , bucket: 'nepgram-bucket'
      // Let's use the custom s3params to upload this file as publicly
      // readable by anyone
    , s3params:
      { ACL: 'public-read'
      }
      // And while we are at it, let's monitor the progress of this upload
    , onProgress: progress => sails.log.verbose('Upload progress:', progress)
    }

    //file.upload ko file chahe mathi bata aako
    file.upload(options, async(err, files) => {

        if(err) { return res.serverError(err.toString()) }

        //sucess bhako bhaey
        // res.send(files)
        // console.log(files)

        //if upload is sucessful.

        const fileUrl = files[0].extra.Location
        // console.log(fileUrl);
        // res.send(fileUrl)

        const userId = req.session.userId

        const record = await Post.create({
          text: postBody,
          user: userId,
          imageUrl: fileUrl}).fetch()

        await FeedItem.create({
          post: record.id,
          postOwner: userId,
          user: userId,
          postCreatedAt: record.createdAt
        })

        //this is done for continuous synchronization across all the followers
        const followersList = await User.findOne({id: userId}).populate('followers')
        followersList.followers.forEach(async f => {
          console.log(f.fullName)
          await FeedItem.create({
            post: record.id,
            postOwner: userId, //current user or logged in user
            user: f.id, //each followers ko user ID and user for whoch we want to insert the feeditem
            postCreatedAt: record.createdAt
          })
        })
        res.redirect('/post')
      })
}
    //   file.upload({
    //   adapter: require('skipper-s3'),
    //   key: 'AKIAIEARCOUXPL7U7CDA',
    //   secret: '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',
    //   bucket: 'nepgram-bucket'
    //   },
    //
    // function (err, filesUploaded) {
    //
    //   if (err) return res.serverError(err);
    //
    //   console.log(filesUploaded);
    //   return res.ok({
    //
    //     files: filesUploaded,
    //     textParams: req.allParams()
    //
    //   });
    //
    // });

  // return res.end()
  //
  //
  //
  // //waterline object

  // res.redirect('/post')
