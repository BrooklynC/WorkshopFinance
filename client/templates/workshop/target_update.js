Template.TargetUpdate.events({
    'click #target-existing': function(e) {
        e.preventDefault();

        var targetSelection = Session.get('sessionTargetSelection');
        var currentFootballId = Session.get('sessionTargetFootballId');
        var ownerId = Session.get('sessionOwnerId');

        var currentUserId = Meteor.userId();

        var targetObject = getTarget(currentFootballId, targetSelection);
        var footballType = getFootballType(targetSelection);

        if(currentUserId == ownerId) {
            Meteor.call('footballTargetUpdate', currentFootballId, targetObject, footballType, function (error, result) {
            });
        } else {
            alert("You cannot update this football field.")
        }
    },
    'click #target-new': function(e) {
        e.preventDefault();

        var targetSelection = Session.get('sessionTargetSelection');
        var currentFootballId = Session.get('sessionTargetFootballId');

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        var saveCopy = true;

        var targetObject = getTarget(currentFootballId, targetSelection);
        var footballType = getFootballType(targetSelection);

        if (currentUserId == ownerId) {
            Meteor.call('footballTargetUpdateAndCopy', currentFootballId, targetObject, footballType, saveCopy, function (error, result) {
            });
        } else {
            return Meteor.call('footballSave', currentFootballId, targetSelection, footballType, function () {
            });
        }
    }
});

