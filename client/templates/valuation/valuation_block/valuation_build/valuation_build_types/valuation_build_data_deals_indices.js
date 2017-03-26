Template.ValuationBuildDataDealsIndices.events({
    'click .build-deal-index': function(e) {
        e.preventDefault();

        var index = this._id;

        Template.instance().state.set('index', index);
    },
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var selection = Template.instance().state.get('index');

        Template.instance().state.set('index', null);

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            return Meteor.call('valuationBuildDataAdd', currentFootballId, currentValuationId, selection, function(error, result) {
            });
        }
    }
});

Template.ValuationBuildDataDealsIndices.helpers({
    indexTitle: function() {
        var index = Template.instance().state.get('index');
        if(index == null) {
            return "Index:"
        } else {
            return FeedDealsIndices.findOne({_id:index}).indexName;
        }
    },
    indices: function() {
        return FeedDealsIndices.find({});
    }
});

Template.ValuationBuildDataDealsIndices.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('index', null);
});