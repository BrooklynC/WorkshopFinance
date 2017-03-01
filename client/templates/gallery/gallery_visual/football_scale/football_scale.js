//Toggle between millions and billions
//BC-NOTE: add disable option
Template.FootballScale.events({
    'click #scale-toggle': function(e) {
        e.preventDefault();

        var currentFootballId = this._id;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if (currentUserId == ownerId) {
            Meteor.call('footballScaleToggle', currentFootballId, function (error, result) {
            });
        }
    }
});

Template.FootballScale.helpers({
});
