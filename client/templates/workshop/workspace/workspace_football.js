Template.WorkspaceFootball.helpers({
    currentFootballId: function () {
        var currentUserId = Meteor.userId();
        var footballActive = Options.findOne({ownerId:currentUserId}).footballActive;
        return Footballs.findOne({_id:footballActive});
    }
});

Template.WorkspaceFootball.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var currentUserId = Meteor.userId();
        var footballId = Options.findOne({ownerId:currentUserId}).footballActive;
        self.subscribe('football', footballId);
    });
});