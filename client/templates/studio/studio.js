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
    },
    headerLogin: function() {
        var currentUser = Meteor.user();
        console.log(currentUser);
        if(currentUser == null) {
            return "header-logout"
        } else {
            return "header-login"
        }
    },
    footerLogin: function() {
        var currentUser = Meteor.user();
        console.log(currentUser);
        if(currentUser == null) {
            return "footer-logout"
        } else {
            return "footer-login"
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