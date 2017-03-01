//Changes Football Output options and updates Football document
Template.FootballOutput.events({
    'change #output-selection': function(e) {
        e.preventDefault();

        var currentFootballId = this._id;

        var newFootballOutput = $(e.target).val();
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            Meteor.call('footballOutputUpdate', currentFootballId, newFootballOutput, function(error, result) {
            });
        }
    }
});

Template.FootballOutput.helpers({
    isCompany: function() {
        var marketType = this.marketType;
        if(marketType == "company") {
            return true;
        }
    },
    outputEv: function() {
        var footballOutput = this.footballOutput;
        if(footballOutput == "Enterprise Value") {
            return "selected";
        }
    },
    outputPrice: function() {
        var footballOutput = this.footballOutput;
        if(footballOutput == "Price per Share") {
            return "selected";
        }
    },
    outputMultiple: function() {
        var footballOutput = this.footballOutput;
        if(footballOutput == "Multiple") {
            return "selected";
        }
    },
    //These options (Enterprise Value, Price per Share) are disabled if there is no target.  Multiple is only option
    noTargetDisable: function() {
        var footballType = this.footballType;
        if(footballType == "market") {
            return "disabled";
        }
    }
});