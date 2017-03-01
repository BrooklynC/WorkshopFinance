////WORKSPACE

Meteor.publish('users', function() {
    return Meteor.users.find({},{fields:{
        username:1,
        profile: 1
    }});
});

Meteor.publish('options', function() {
    var currentUserId = this.userId;
    return Options.find({ownerId:currentUserId});
});

Meteor.publish('footballs', function() {
    var currentUserId = this.userId;
    return Footballs.find({ownerId:currentUserId},{fields:{_id:1}});
});

//Meteor.publish('targetsUserAll', function() {
//    var currentUserId = this.userId;
//    return TargetsCompanies.find({ownerId:currentUserId});
//});
//
//Meteor.publish('targetsSharedAll', function() {
//    var currentUserId = this.userId;
//    return TargetsCompanies.find({viewers:{$in:[currentUserId]}});
//});