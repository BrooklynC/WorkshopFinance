////GALLERY COVERAGE

//COVERAGE - FOOTBALLS
Meteor.publish('galleryFootballsUser', function() {
    var currentUserId = this.userId;
    return Footballs.find({ownerId: currentUserId}, {
        fields:{
            _id:1,
            footballName: 1
        }
    });
});

Meteor.publish('galleryFootballsShared', function() {
    var currentUserId = this.userId;
    return Footballs.find({viewers:{$in:[currentUserId]}}, {
        fields: {
            _id: 1,
            ownerId: 1,
            footballName: 1,
            footballValuations: 1
        }
    });
});

Meteor.publish('galleryFootballsItemTargetCompany', function(footballId) {
    check(footballId, String);
    var targetId = Footballs.findOne({_id:footballId}).footballValuations.targetId;
    return FeedCompanies.find({_id: targetId}, {fields: {
        _id: 1,
        companyName: 1,
        ticker: 1
    }});
});
Meteor.publish('galleryFootballsItemTargetTeam', function(footballId) {
    check(footballId, String);
    var targetId = Footballs.findOne({_id:footballId}).footballValuations.targetId;
    return FeedTeams.find({_id: targetId}, {
        fields: {
            _id: 1,
            teamName: 1,
            ticker: 1
        }
    });
});

//COVERAGE - VALUATIONS
Meteor.publish('galleryValuations', function() {
    var currentUserId = this.userId;
    return Valuations.find({$and:[{ownerId: currentUserId},{valuationFavorite:true}]}, {
        fields:{
            _id:1,
            ownerId: 1,
            marketType: 1,
            valuationName: 1,
            valuationType: 1,
            valuationElement: 1,
            valuationSelections: 1,
            valuationFavorite: 1
        }
    });
});

//COVERAGE - TARGETS
Meteor.publish('galleryTargetsItemBase', function(targetId) {
    check(targetId, String);
    return FeedCompanies.find({_id:targetId}, {
        fields: {
            _id: 1,
            companyName: 1,
            status: 1,
            ticker: 1
        }
    });
});

Meteor.publish('galleryTargetsItemBlock', function(targetId) {
    check(targetId, String);
    return FeedCompanies.find({_id:targetId}, {
        fields: {
            _id: 1,
            sector: 1,
            subSector: 1
        }
    });
});

//NOTIFICATIONS
Meteor.publish('notifications', function() {
    var currentUserId = this.userId;
    return Notifications.find({receiverId: currentUserId});
});