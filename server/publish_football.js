////////FOOTBALL
Meteor.publish('football', function(footballId) {
    check(footballId, String);
    return Footballs.find({_id:footballId});
});

Meteor.publish('valuationsUser', function() {
    var currentUserId = this.userId;
    return Valuations.find({ownerId: currentUserId});
});

Meteor.publish('valuationsShared', function() {
    var currentUserId = this.userId;
    return Valuations.find({viewers:{$in:[currentUserId]}});
});

Meteor.publish('galleryValuationsOwner', function(ownerId) {
    check(ownerId, String);
    return Valuations.find({ownerId: ownerId});
});

Meteor.publish('feedCompaniesAll', function() {
    return FeedCompanies.find({});
});

Meteor.publish('feedCompaniesIndicesAll', function() {
    return FeedCompaniesIndices.find({});
});

Meteor.publish('feedDealsAll', function() {
    return FeedDeals.find({});
});

Meteor.publish('feedDealsIndicesAll', function() {
    return FeedDealsIndices.find({});
});
Meteor.publish('feedTeamsAll', function() {
    return FeedTeams.find({});
});

Meteor.publish('feedModelsUser', function() {
    var currentUserId = this.userId;
    return Models.find({ownerId:currentUserId});
});

Meteor.publish('customs', function() {
    var currentUserId = this.userId;
    return Customs.find({ownerId:currentUserId});
});

//Meteor.publish('footballTarget', function(footballId) {
//    check(footballId, String);
//    var targetId = Footballs.findOne({_id:footballId}).targetId;
//    return TargetsCompanies.find({_id: targetId});
//});
//
//Meteor.publish('footballTargetFeed', function(footballId) {
//    check(footballId, String);
//    var targetId = Footballs.findOne({_id:footballId}).targetId;
//    var target = TargetsCompanies.findOne({_id:targetId});
//    var feedId = target.feedId;
//    return FeedCompanies.find({_id:feedId});
//});
//
//Meteor.publish('footballValuations', function(footballId) {
//    check(footballId, String);
//    var valuations = Footballs.findOne({_id:footballId}).footballValuations;
//    return Valuations.find({_id: {$in: valuations}});
//});
//
