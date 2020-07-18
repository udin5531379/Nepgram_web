module.exports = async function(req, res) { //req is and object contaning information about HTTP request that raised the event.

  console.log("This is the updating page");

  const fullName = req.body.fullName
  const bio = req.body.bio
  const file = req.file('imageUrl') //if Sending nothing the isNoop property insdie the file will be true from which the crash occurs

  console.log(fullName);
  console.log(bio);
  console.log(file);

  //if the user does not have any avatar image crash huncha server thats why yo gareyko
  if(file.isNoop ==  true) {
    await User.update({id: req.session.userId}).set({fullName: fullName, bio: bio}) //yohalnu agadi customToJson file ma bio field halnu parcha whihc will create a seperate table in the dtabase for 'bio' information only
    file.upload({noop: true})
    return res.end()
  }

//this step is for uploading the profile Image in the user's data
  const options =
    { adapter: require('skipper-better-s3')
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

        if(err) {
          return res.serverError(err.toString())
        }

        //if upload is sucessful.
        const fileUrl = files[0].extra.Location
        const userId = req.session.userId
        await User.update({id: userId}).set({fullName: fullName, bio: bio, profileImageUrl: fileUrl})
        res.end()

      })
}
