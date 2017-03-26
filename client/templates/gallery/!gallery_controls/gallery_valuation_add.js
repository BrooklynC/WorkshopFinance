//Creates new Valuation in Gallery using selected Comps or Deals
Template.GalleryValuationAdd.events({
    'click #valuation-new': function(e) {
        e.preventDefault();

        var field = $(e.target).find('[id=galleryValuationAdd]');

        var marketType = this.marketType;

        var type = getValuationSelect().type;
        console.log("Type: ", type);
        var element = getValuationSelect().element;

        var metric = getValuationInfo(marketType).metric;
        var period = getValuationInfo(marketType).period;

        var output = getValuationInfo(marketType).output;
        var outputPeriod = getValuationInfo(marketType).outputPeriod;

        var selections = [];
        var compsSelect = localSelections.find({});
        //Push ids of selections in new array
        compsSelect.forEach(function (c) {
            var compId = c._id;
            selections.push(compId);
        });
        var length = selections.length;
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();
        var currentFootballId = Options.findOne({ownerId:currentUserId}).footballActive;


        if(marketType == "company") {
            if(ownerId == currentUserId) {
                if(length > 0) {
                    Meteor.call('valuationAdd', marketType, type, element, metric, period, output, outputPeriod, selections, currentFootballId, function(error, result) {
                    });
                    field.val('');
                    localSelections.remove({});
                } else {
                    alert("You haven't selected any comps.")
                }
            }
        } else {
            alert("You can't add these to this Football.")
        }
    }
});