//Add selected Valuations to active Football
Template.GalleryFootballNew.events({
    'click #football-new': function(e) {
        e.preventDefault();

        var marketType = Session.get('sessionCoverageScreenType');

        var selections = [];
        var valuationsSelect = localSelections.find({});
        valuationsSelect.forEach(function (v) {
            var valuationId = v._id;
            selections.push(valuationId);
        });
        Meteor.call('footballValuationsNew', marketType, selections, function(error, result) {
        });
        localSelections.remove({});
    }
});