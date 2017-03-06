//Each new user is assigned an Options document, where user-specific info (target list, active football) is stored
Meteor.users.after.insert(function () {
    var optionsId = Options.insert({ownerId: this._id});
    var footballId = Footballs.insert({
        ownerId:this._id
    });
    var optionsActive = Options.update({_id:optionsId},{$set:{footballActive:footballId}});

    Meteor.users.update({_id:this._id},{$set:{profile:{tier:"A"}}});

    return {
        _id: optionsActive
    };
});

//Aggregation method to calculate multiples is rerun on any change to Valuation document
Valuations.after.update(function (userId, doc) {
    var valuationId = doc._id;
    if (doc.valuationSelections !== this.previous.valuationSelections || doc.valuationName !== this.previous.valuationName) {
        Meteor.call('valuationAggregate', valuationId, function (error, result) {
        });
    }
});


Valuations.after.update(function (userId, doc) {
    var valuationId = doc._id;
    if (doc.multiples !== this.previous.multiples) {
        Meteor.call('valuationActiveUpdate', valuationId, function (error, result) {
        });
    }
});

//Any new Football created is set as active football.  This filters out footballs that are sent to other users
// (which are new Footballs)
Footballs.after.insert(function () {
    var currentFootballId = this._id;
    var oldOwnerId = Meteor.userId();
    var newOwnerId = Footballs.findOne({_id:currentFootballId}).ownerId;

    if(newOwnerId == oldOwnerId) {
        Options.update({ownerId:oldOwnerId}, {$set: {footballActive: currentFootballId}}, function () {
        });
    }
});

//Meteor.loginWithPassword(username, password, function(){
//    var currentUserId = Meteor.userId();
//    var football = Footballs.findOne({
//        ownerId: currentUserId,
//        footballType:"market",
//        footballValuations:{$size:0}
//    });
//    var footballId = football._id;
//    Options.update({ownerId:currentUserId},{$set:{footballActive:footballId}});
//});