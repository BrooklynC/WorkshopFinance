//sessionActions toggles template showing input box for username to save/send/share football
//BC-note: perhaps replace with ReactiveVar
Session.set('sessionActions', "none");

Template.FootballActions.events({
    'change .action-selection': function(e) {
        e.preventDefault();

        var selection = $(e.target).val();

        var currentFootballId = this._id;
        var existingValuations = this.footballValuations;
        var existingValuationsLength = existingValuations.length;
        var existingValuationsFull = Valuations.findOne({
            _id: {$in: existingValuations},
            $nor: [
                {valuationSelections: {$size: 0}}
            ]
        });

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        switch(selection) {
            case "football-cancel":
                return Session.set('sessionActions', "none");
                break;
            case "football-save":
                Session.set('sessionActions', "save");
                break;
            case "football-send":
                if(existingValuationsLength > 0 && existingValuationsFull) {
                    return Session.set('sessionActions', "send");
                } else {
                    alert("You should add some valuations to this Football Field before sending.");
                    Session.set('sessionActions', "none");
                }
                break;
            case "football-share":
                if(currentUserId == ownerId) {
                    return Session.set('sessionActions', "share");
                } else {
                    alert("You can't share this Football Field.  Save a copy first.");
                    Session.set('sessionActions', "none");
                }
                break;
            case "football-remove":
                if(currentUserId == ownerId) {
                    if (confirm("Delete this Football Field?")) {
                        Meteor.call('footballRemove', currentFootballId, function () {
                        });
                    }
                }
                break;
        }
    }
});

Template.FootballActions.helpers({
    //Toggle to add input for sending or sharing football
    actionsInput: function() {
        var sessionActions = Session.get('sessionActions');
        switch(sessionActions) {
            case "none":
                return Template.FootballBlank;
                break;
            case "save":
                return Template.FootballActionsOption;
                break;
            case "send":
                return Template.FootballActionsOption;
                break;
            case "share":
                return Template.FootballActionsOption;
                break;
        }
    },
    selectedNone: function() {
        var session = Session.get('sessionActions');
        if(session == "none") {
            return "selected";
        }
    },
    selectedSave: function() {
        var session = Session.get('sessionActions');
        if(session == "save") {
            return "selected";
        }
    },
    selectedSend: function() {
        var session = Session.get('sessionActions');
        if(session == "send") {
            return "selected";
        }
    },
    selectedShare: function() {
        var session = Session.get('sessionActions');
        if(session == "share") {
            return "selected";
        }
    },
    selectedDelete: function() {
        var session = Session.get('sessionActions');
        if(session == "delete") {
            return "selected";
        }
    },
    //Only the owner of football can Send, Share, or Remove, disable these options for others
    disabledOn: function() {
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId !== ownerId) {
            return "disabled"
        }
    },
    //Add text to drop-down showing "read-only" for non-owner
    readonlyOn: function() {
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId !== ownerId) {
            return "(read only)"
        }
    }
});