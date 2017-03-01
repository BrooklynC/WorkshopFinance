Session.set('sessionTargetType', "none");

//Changes Football Output options and updates Football document
Template.FootballTargetType.events({
    'change #target-type-selection': function(e) {
        e.preventDefault();

        var currentFootballId = this._id;
        var currentFootball = Footballs.findOne({_id:currentFootballId});
        var valuations = currentFootball.footballValuations;
        var valuationsCount = valuations.length;

        var typeSelection = $(e.target).val();
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            if(typeSelection == "none") {
                if (valuationsCount > 0) {
                    var saveCopy = confirm("Do you want to save a copy of this football first?");
                    Meteor.call('footballTypeUpdateAndCopy', currentFootballId, saveCopy, function (error, result) {
                    });
                    Session.set('sessionTargetType', typeSelection);
                } else {
                    Meteor.call('footballTypeUpdate', currentFootballId, function (error, result) {
                    });
                    Session.set('sessionTargetType', typeSelection);
                }
            } else {
                Session.set('sessionTargetType', typeSelection);
            }
        }
    }
});

Template.FootballTargetType.helpers({
    targetNone: function() {
        var targetType = this.footballTarget.targetType;
        if(targetType == "none") {
            return "selected";
        }
    },
    targetCompany: function() {
        var targetType = this.footballTarget.targetType;
        if(targetType == "company") {
            return "selected";
        }
    },
    targetTeam: function() {
        var targetType = this.footballTarget.targetType;
        if(targetType == "team") {
            return "selected";
        }
    }
});