//sessionActions toggles template showing input box for username to save/send/share football
//BC-note: perhaps replace with ReactiveVar
Session.set('sessionActions', "none");

Template.FootballActions.events({
    'click .btn-send': function(e) {
        e.preventDefault();

        var currentUserId = Meteor.userId();
        var ownerId = this.ownerId;
        if(currentUserId == ownerId) {
            var currentFootballId = this._id;
            var currentActive = Footballs.findOne({_id:currentFootballId}).footballActivated;
            if(currentActive == true) {
                Session.set('sessionActions', "send");
            }
        }
    },
    'click .btn-share': function(e) {
        e.preventDefault();

        var currentUserId = Meteor.userId();
        var ownerId = this.ownerId;
        if(currentUserId == ownerId) {
            var currentFootballId = this._id;
            var currentActive = Footballs.findOne({_id:currentFootballId}).footballActivated;
            if(currentActive == true) {
                Session.set('sessionActions', "share");
            }
        }
    },
    'click .btn-delete': function(e) {
        e.preventDefault();

        var currentUserId = Meteor.userId();
        var ownerId = this.ownerId;
        if(currentUserId == ownerId) {
            Session.set('sessionActions', "delete");
        }
    }
});

Template.FootballActions.helpers({
    //Toggle to add input for sending or sharing football
    //Only the owner of football can Send, Share, or Remove, disable these options for others
    disabledEmpty: function() {
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();
        var currentFootballId = Options.findOne({ownerId:currentUserId}).footballActive;
        var activated = Footballs.findOne({_id:currentFootballId}).footballActivated;

        if(currentUserId !== ownerId) {
            return "disabled"
        } else {
            if(activated == false) {
                return "disabled"
            }
        }
    },
    disabledOwner: function() {
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId !== ownerId) {
            return "disabled"
        }
    }
});