//Toggle between millions and billions
Template.ValuationCalc.events({
    'click .btn-calc': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if (currentUserId == ownerId) {
            Meteor.call('valuationCalcUpdate', currentValuationId, function (error, result) {
            });
        }
    }
});

Template.ValuationCalc.helpers({
    calc: function() {
        var valuationCalc = this.valuationCalc;
        switch(valuationCalc) {
            case "average":
                return "Average";
                break;
            case "median":
                return "Median";
                break;
            case "high":
                return "High";
                break;
            case "low":
                return "Low";
                break;
        }
    }
});

