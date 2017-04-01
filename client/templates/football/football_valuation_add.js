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
                var existingId = existingValuationsEmpty._id;
                Session.set('sessionValuations', existingId);
            } else {
                var marketType = this.marketType;
                var type = "comps";
                var element = "security";
                var metric = getValuationInfo(marketType).metric;
                var period = getValuationInfo(marketType).period;
                var output = getValuationInfo(marketType).output;
                var outputPeriod = getValuationInfo(marketType).outputPeriod;
                var selections = [];
                var activated = Footballs.findOne({_id:currentFootballId}).footballActivated;
                Meteor.call('valuationAdd', marketType, type, element, metric, period, output, outputPeriod, selections, currentFootballId, activated, function () {
                });
            }
        }
    }
});

Template.FootballValuationAdd.helpers({
});