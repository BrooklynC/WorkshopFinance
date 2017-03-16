Template.ValuationBuildModel.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var fieldName = $(e.target).find('[id=modelNameAdd]');
        var fieldStat = $(e.target).find('[id=modelStatAdd]');
        var fieldValue = $(e.target).find('[id=modelValueAdd]');

        var selectionName = fieldName.val();
        var selectionStat = fieldStat.val();
        var selectionValue = fieldValue.val();

        if(selectionName == "" || selectionStat == "" || selectionValue == "") {
            alert("You must include a name, stat and value.")
        } else {
            fieldName.val('');
            fieldStat.val('enterpriseValue');
            fieldValue.val('');

            var ownerId = this.ownerId;
            var currentUserId = Meteor.userId();

            if(currentUserId == ownerId) {
                return Meteor.call('valuationBuildModelAdd', currentFootballId, currentValuationId, selectionName, selectionStat, selectionValue, function(error, result) {
                });
            }
        }
    }
});

Template.ValuationBuildModel.helpers({
    stat: function() {
        var existingModel = this.existingModel;
        switch(existingModel) {
            case "evRevenueLtm":
                return "EV/Revenue (LTM)";
                break;
            case "evRevenueFY1":
                return "EV/Revenue (FY1)";
                break;
            case "evRevenueFY2":
                return "EV/Revenue (LTM)";
                break;
            case "evEbitdaLtm":
                return "EV/EBITDA (LTM)";
                break;
            case "evEbitdaFy1":
                return "EV/EBITDA (FY1)";
                break;
            case "evEbitdaFy2":
                return "EV/EBITDA (FY2)";
                break;
            case "priceEarningsLtm":
                return "Price/Earnings (LTM)";
                break;
            case "priceEarningsFy1":
                return "Price/Earnings (FY1)";
                break;
            case "priceEarningsFy2":
                return "Price/Earnings (FY2)";
                break;
        }
    },
    disabledMarket: function() {
        var footballType = Template.parentData(1).footballType;
        if(footballType == "market") {
            return "disabled";
        }
    }
});