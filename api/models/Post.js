module.exports = {

  customToJSON : function() {
    //this function is to create "posted certain hours ago..."
    const forNow = sails.moment(this.createdAt).fromNow()
    this.fromNow = forNow
    return this
  },
  attributes: {

    text: {
      type: 'string', required: true
    },

    user: {
      model: 'user' //this represents the User.js model
    },

    imageUrl: {
      type: 'string',
      defaultsTo: '',
    }

  }
}
