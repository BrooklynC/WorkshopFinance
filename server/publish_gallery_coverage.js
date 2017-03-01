////GALLERY PUBLICATIONS

//TARGET GALLERY
Meteor.publish('galleryTargetsUser', function() {
    var currentUserId = this.userId;
    return TargetsCompanies.find({ownerId: currentUserId}, {fields:{_id:1, ownerId:1}});
});

Meteor.publish('galleryTargetsShared', function() {
    var currentUserId = this.userId;
    return TargetsCompanies.find({viewers:{$in:[currentUserId]}}, {fields:{_id:1, viewers:1}});
});

Meteor.publish('galleryTargetsItemFeed', function(targetId) {
    check(targetId, String);
    return FeedCompanies.find({_id:targetId});
});

//FOOTBALL GALLERY
//THIS NEEDS TO BE REFINED
Meteor.publish('galleryFootballs', function() {
    var currentUserId = this.userId;
    return Footballs.find({ownerId: currentUserId});
});

Meteor.publish('galleryFootballsUser', function() {
    var currentUserId = this.userId;
    return Footballs.find({ownerId: currentUserId}, {fields:{_id:1, ownerId:1}});
});

Meteor.publish('galleryFootballsShared', function() {
    var currentUserId = this.userId;
    return Footballs.find({viewers:{$in:[currentUserId]}});
});

Meteor.publish('galleryFootballsItem', function(footballId) {
    check(footballId, String);
    return Footballs.find({_id:footballId});
});

Meteor.publish('galleryFootballsItemTargetCompanyFeed', function(footballId) {
    check(footballId, String);
    var targetId = Footballs.findOne({_id:footballId}).footballValuations.targetId;
    return FeedCompanies.find({_id: targetId});
});
Meteor.publish('galleryFootballsItemTargetTeamFeed', function(footballId) {
    check(footballId, String);
    var targetId = Footballs.findOne({_id:footballId}).footballValuations.targetId;
    return FeedTeams.find({_id: targetId});
});

//NOTIFICATIONS
Meteor.publish('notifications', function() {
    var currentUserId = this.userId;
    return Notifications.find({receiverId: currentUserId});
});