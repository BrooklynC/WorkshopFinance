Template.GallerySettings.events({
    'click #theme-toggle': function(e) {
        e.preventDefault();

        Meteor.call('optionsThemeToggle', function (error, result) {
        });
    }
});

Template.GallerySettings.helpers({
    membership: function() {
        var currentUserId = Meteor.userId();
        var user = Meteor.users.findOne({_id:currentUserId});
        var username = user.username;
        var tier = user.profile.tier;
        if(username == "workshop") {
            return "Workshop Finance";
        } else {
            switch(tier) {
                case "A":
                    return "Basic";
                    break;
                case "B":
                    return "Premium";
                    break;
            }
        }
    },
    notificationCount: function() {
        var currentUserId = Meteor.userId();
        var notifications = Notifications.find({receiverId:currentUserId,read:false});
        return notifications.count();
    },
    sharedCount: function() {
        var currentUserId = Meteor.userId();
        var notifications = Notifications.find({receiverId:currentUserId,action:"share",read:false});
        return notifications.count();
    },
    sendCount: function() {
        var currentUserId = Meteor.userId();
        var notifications = Notifications.find({receiverId:currentUserId,action:"send",read:false});
        return notifications.count();
    },
    themeToggle: function() {
        var currentUserId = Meteor.userId();
        var theme = Options.findOne({ownerId:currentUserId}).theme;
        switch(theme) {
            case "light":
                return "Dark Theme";
                break;
            case "dark":
                return "Light Theme";
                break;
        }
    }
});

Template.GallerySettings.onCreated (function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('notifications');
    });
});