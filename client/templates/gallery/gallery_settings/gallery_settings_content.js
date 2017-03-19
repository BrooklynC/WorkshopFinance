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