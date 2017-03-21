Session.set('targetType', "company");
Session.set('targetData', "feed");

Template.GalleryFootballAdd.events({
    'click #btn-football-add': function(e) {
        e.preventDefault();

        var marketType = "company";

        var target = {
            targetId: "none",
            targetType: "none",
            targetData: "none"
        };
        var valuations = [];

        var footballType = "market";

        Meteor.call('footballAdd', marketType, target, valuations, footballType, function(error, result) {
        });
    }
});