Template.GalleryItemUsersActive.events({
    'click #active-change': function(e) {
        e.preventDefault();

        var userId = Template.parentData(0)._id;

        Meteor.call('userActiveChange', userId, function (error, result) {
        });
    }
});

Template.GalleryItemUsersActive.helpers({
    active: function() {
        var userId = Template.parentData(0)._id;
        return Meteor.users.findOne({_id: userId}).profile.active;
    }
});