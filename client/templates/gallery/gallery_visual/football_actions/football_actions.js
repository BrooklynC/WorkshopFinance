//sessionActions toggles template showing input box for username to save/send/share football
//BC-note: perhaps replace with ReactiveVar
Session.set('sessionActions', "none");

Template.FootballActions.events({
    'click .btn-send': function(e) {
        e.preventDefault();

        var existingValuations = this.footballValuations;
        var existingValuationsLength = existingValuations.length;
        var existingValuationsFull = Valuations.findOne({
            _id: {$in: existingValuations},
            $nor: [
                {valuationSelections: {$size: 0}}
            ]
        });
        if(existingValuationsLength > 0 && existingValuationsFull) {
            return Session.set('sessionActions', "send");
        } else {
            alert("You should add some valuations to this Football Field before sending.");
            Session.set('sessionActions', "none");
        }
    },
    'click .btn-share': function(e) {
        e.preventDefault();

        var existingValuations = this.footballValuations;
        var existingValuationsLength = existingValuations.length;
        var existingValuationsFull = Valuations.findOne({
            _id: {$in: existingValuations},
            $nor: [
                {valuationSelections: {$size: 0}}
            ]
        });
        if(existingValuationsLength > 0 && existingValuationsFull) {
            return Session.set('sessionActions', "share");
        } else {
            alert("You should add some valuations to this Football Field before sending.");
            Session.set('sessionActions', "none");
        }
    },
    'click .btn-delete': function(e) {
        e.preventDefault();

        Session.set('sessionActions', "delete");
    }
});

Template.FootballActions.helpers({
    //Toggle to add input for sending or sharing football
    actionsInput: function() {
        var sessionActions = Session.get('sessionActions');
        if(sessionActions == "none") {
            return Template.FootballBlank;
        } else {
            return Template.FootballActionsOption;
        }
    },
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