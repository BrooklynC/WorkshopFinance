//Toggle between millions and billions
//BC-NOTE: need to change values in Valuation Build and Results to reflect
//BC-NOTE: add disable option
Template.ValuationCalc.events({
    'click #calc-toggle': function(e) {
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

