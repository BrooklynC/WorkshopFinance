//Adds new Comps valuation by default, valuationType can be changed within Valuation
//Will not add new Valuation if empty Valuation exists
Template.FootballValuationAdd.events({
    'click #valuation-add': function(e) {
        e.preventDefault();

        var currentFootballId = this._id;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            var existingValuations = this.footballValuations;
            var existingValuationsEmpty = Valuations.findOne({
                _id: {$in: existingValuations},
                valuationSelections: {$size: 0}
            });
            if(existingValuationsEmpty) {
                alert("You should add some selections to the existing Valuation first.");
            } else {
                var marketType = this.marketType;
                var type = "comps";
                var element = "security";
                var metric = getValuationInfo(marketType).metric;
                var period = getValuationInfo(marketType).period;
                var output = getValuationInfo(marketType).output;
                var outputPeriod = getValuationInfo(marketType).outputPeriod;
                var selections = [];
                Meteor.call('valuationAdd', marketType, type, element, metric, period, output, outputPeriod, selections, currentFootballId, function () {
                });
            }
        }
    }
});

Template.FootballValuationAdd.helpers({
});