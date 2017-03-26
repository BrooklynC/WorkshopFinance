Template.Studio.helpers({
    isActive: function() {
        var currentUserId = Meteor.userId();
        var currentUser = Meteor.users.findOne({_id:currentUserId});
        var username = currentUser.username;
        var active = currentUser.profile.active;
        if(username == "workshop" || username == "Workshop") {
            return true
        } else {
            if(active == "A") {
                return true
            }
        }
    }
});

Template.Studio.onCreated (function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('options');
        self.subscribe('users');
    });
});