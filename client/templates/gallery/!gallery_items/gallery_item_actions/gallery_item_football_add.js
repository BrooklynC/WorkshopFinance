Template.GalleryItemFootballAdd.events({
    'click .football-add': function(e) {
        e.preventDefault();

        var marketType = Session.get('sessionCoverageScreenType');
        var target = Template.parentData(0);
        var valuations = [];
        var footballType = "target";

        Meteor.call('footballAdd', marketType, target, valuations, footballType, function(error, result) {
        });
    }
});