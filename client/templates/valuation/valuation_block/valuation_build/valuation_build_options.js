Template.ValuationBuildOptions.events({
    'change .build-type': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var option = $(e.target).val();

        Meteor.call('valuationBuildOptions', currentValuationId, option, function(error, result) {});
    }
});

Template.ValuationBuildOptions.helpers({
    isPremium: function() {
        var currentUserId = Meteor.userId();
        var tier = Meteor.users.findOne({_id:currentUserId}).profile.tier;
        if(tier == "B") {
            return true;
        }
    },
    selectedComps: function() {
        var valuationType = this.valuationType;
        var valuationElement = this.valuationElement;
        if(valuationType == "comps" && valuationElement == "security") {
            return "selected";
        }
    },
    selectedCompsIndices: function() {
        var valuationType = this.valuationType;
        var valuationElement = this.valuationElement;
        if(valuationType == "comps" && valuationElement == "index") {
            return "selected";
        }
    },
    selectedDeals: function() {
        var valuationType = this.valuationType;
        var valuationElement = this.valuationElement;
        if(valuationType == "deals" && valuationElement == "security") {
            return "selected";
        }
    },
    selectedDealsIndices: function() {
        var valuationType = this.valuationType;
        var valuationElement = this.valuationElement;
        if(valuationType == "deals" && valuationElement == "index") {
            return "selected";
        }
    },
    selectedModels: function() {
        var valuationElement = this.valuationType;
        if(valuationElement == "models") {
            return "selected";
        }
    },
    selectedCustom: function() {
        var valuationElement = this.valuationType;
        if(valuationElement == "custom") {
            return "selected";
        }
    },
    disableMarket: function() {
        var marketType = this.marketType;
        switch(marketType) {
            case "company":
                return "";
                break;
            case "team":
                return "disabled";
                break;
        }
    },
    disableType: function() {
        var footballType = Template.parentData(1).footballType;
        switch(footballType) {
            case "target":
                return "";
                break;
            case "market":
                return "disabled";
                break;
        }
    }
});