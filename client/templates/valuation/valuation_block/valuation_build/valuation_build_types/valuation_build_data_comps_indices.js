Template.ValuationBuildDataCompsIndices.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var selection = $(".build-comps-index option:selected").val();
        console.log(selection);

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            return Meteor.call('valuationBuildDataAdd', currentFootballId, currentValuationId, selection, function(error, result) {
            });
        }
    }
});

Template.ValuationBuildDataCompsIndices.helpers({
    indices: function() {
        return FeedCompaniesIndices.find({});
    }
});