Template.ValuationResultsOutput.helpers({
    isValues: function() {
        var output = Template.parentData(1).footballOutput;
        if(output !== "Multiple") {
            return true;
        }
    },
    isMarket: function() {
        var footballId = Template.parentData(1)._id;
        var footballType = Footballs.findOne({_id:footballId}).footballType;
        if(footballType == "market") {
            return true;
        }
    },
    valueOption: function() {
        var footballId = Template.parentData(1)._id;
        var football = Footballs.findOne({_id:footballId});
        return football.footballOutput;
    },
    valuationResultsOutputMultiples: function() {
        var footballType = Template.parentData(1).footballType;
        switch(footballType) {
            case "target":
                return Template.ValuationResultsOutputMultiples;
                break;
            case "market":
                return Template.FootballBlank;
                break;
        }
    }
});