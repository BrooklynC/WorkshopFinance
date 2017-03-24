//Changes Football Output options and updates Football document
Template.FootballOutput.events({
    'click .menu-output-text': function(e) {
        e.preventDefault();

        var newFootballOutput = $(e.target).text();

        var currentFootballId = this._id;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            Meteor.call('footballOutputUpdate', currentFootballId, newFootballOutput, function(error, result) {
            });
        }
    }
});

Template.FootballOutput.helpers({
    //These options (Enterprise Value, Price per Share) are disabled if there is no target.  Multiple is only option
    noTargetDisable: function() {
        var footballType = this.footballType;
        if(footballType == "market") {
            return "disabled";
        }
    }
});