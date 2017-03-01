Template.ValuationControls.events({
    'click .btn-repeat': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var currentFootballId = Template.parentData(1)._id;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            Meteor.call('valuationRepeat', currentValuationId, currentFootballId, function(valuationId) {
            });
        }
    },
    'click .btn-remove': function(e) {
        e.preventDefault();

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            if (confirm("Delete this valuation?")) {
                var currentFootballId = Template.parentData(1)._id;
                var currentValuationId = this._id;
                Meteor.call('valuationRemove', currentFootballId, currentValuationId, function (error, result) {
                })
            }
        }
        Session.set('sessionValuations', "array");
    },
    'click .btn-favorite': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var valuationSelections = this.valuationSelections;
        var count = valuationSelections.length;

        if(count > 0) {
            Meteor.call('valuationFavorite', currentValuationId, function (valuationId) {
            });
        }
    }
});
Template.ValuationControls.helpers({
    isFavorite: function() {
        var fav = this.valuationFavorite;
        if(fav) {
            return "valuation-favorite-selected";
        }
    }
});