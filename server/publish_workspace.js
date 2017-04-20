////WORKSPACE

Meteor.publish('users', function() {
    return Meteor.users.find({},{fields:{
        username:1,
        profile: 1,
        services: 1,
        status: 1
    }});
});

Meteor.publish('options', function() {
    var currentUserId = this.userId;
    return Options.find({ownerId:currentUserId});
});

//Meteor.publish('football', function() {
//    var currentUserId = this.userId;
//    return Footballs.find({ownerId:currentUserId},{fields:{_id:1}});
//});