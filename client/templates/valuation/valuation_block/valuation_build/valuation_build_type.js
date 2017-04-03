Template.ValuationBuildType.events({
    'click .build-type li': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var option = $(e.target).text();

        Meteor.call('valuationBuildOptions', currentValuationId, option, function(error, result) {});
    }
});

Template.ValuationBuildType.helpers({
    type: function() {
        var valuationType = this.valuationType;
        var valuationElement = this.valuationElement;
        switch(valuationType) {
            case "comps":
                switch(valuationElement) {
                    case "security":
                        return "Comps";
                        break;
                    case "index":
                        return "Comps Indices";
                }
                break;
            case "deals":
                switch(valuationElement) {
                    case "security":
                        return "Deals";
                        break;
                    case "index":
                        return "Deals Indices";
                }
                break;
            case "models":
                return "Models";
                break;
            case "custom":
                return "Custom";
                break;
        }
    }
});