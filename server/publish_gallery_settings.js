////GALLERY SETTINGS

//Meteor.publish('galleryUsersFootballs', function(ownerId) {
//    check(ownerId, String);
//    return Footballs.find({ownerId: ownerId});
//});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
});