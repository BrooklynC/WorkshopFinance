Template.GalleryItemTierUsers.events({
    'click #tier-change': function(e) {
        e.preventDefault();

        var userId = Template.parentData(0)._id;

        Meteor.call('userTierChange', userId, function (error, result) {
        });
    }
});

Template.GalleryItemTierUsers.helpers({
    tier: function() {
        var userId = Template.parentData(0)._id;
        var tier = Meteor.users.findOne({_id: userId}).profile.tier;
        console.log("Tier: ", tier);
        return tier;
    }
});