Template.SettingsContent.helpers({
    settingsPage: function() {
        var users = Meteor.users.find({});
        if (!users) {
            return Template.SettingsContentMessage;
        } else {
            return Template.SettingsContentList;
        }
    }
});

Template.SettingsContent.onCreated (function () {
    var self = this;
    self.autorun(function() {
    });
});