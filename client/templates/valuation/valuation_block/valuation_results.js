Template.ValuationResults.helpers({
    valuationResultsOutput: function() {
        var valuationType = this.valuationType;
        switch(valuationType) {
            case "comps":
                return Template.ValuationResultsOutput;
                break;
            case "deals":
                return Template.ValuationResultsOutput;
                break;
            case "models":
                return Template.ValuationResultsBuild;
                break;
            case "custom":
                return Template.FootballBlank;
                break;
        }
    },
    valuationResultsBuild: function() {
        var valuationType = this.valuationType;
        switch(valuationType) {
            case "comps":
                return Template.ValuationResultsBuild;
                break;
            case "deals":
                return Template.ValuationResultsBuild;
                break;
            case "models":
                var footballType = Template.parentData(1).footballType;
                switch(footballType) {
                    case "target":
                        var footballOutput = Template.parentData(1).footballOutput;
                        switch(footballOutput) {
                            case "Enterprise Value":
                                return Template.FootballBlank;
                                break;
                            case "Price per Share":
                                return Template.FootballBlank;
                                break;
                            case "Multiple":
                                return Template.FootballBlank;
                                break;
                        }
                        break;
                    case "market":
                        return Template.FootballBlank;
                        break;
                }
                break;
            case "custom":
                return Template.FootballBlank;
                break;
        }
    },
    dateOption: function() {
        var ownerId = Template.parentData(0).ownerId;
        var currentUserId = Meteor.userId();
        var valuationType = this.valuationType;
        if(currentUserId == ownerId) {
            switch(valuationType) {
                case "comps":
                    return Template.ValuationDate;
                    break;
                case "deals":
                    return Template.FootballBlank;
                    break;
                case "models":
                    return Template.FootballBlank;
                    break;
                case "custom":
                    return Template.FootballBlank;
                    break;
            }
        } else {
            return Template.FootballBlank;
        }
    },
    result: function() {
        var footballId = Template.parentData(1)._id;
        var football = Footballs.findOne({_id:footballId});
        var output = football.footballOutput;
        var valuationId = this._id;
        var valuationSelections = this.valuationSelections;
        var scaleAdjust = getScale(footballId);
        if (valuationSelections.length > 0) {
            var valuationType = this.valuationType;
            if (valuationType == "comps" || valuationType == "deals" || valuationType == "models") {
                if (output == "Enterprise Value") {
                    return getResultValue(footballId, valuationId) / scaleAdjust;
                } else {
                    return getResultValue(footballId, valuationId);
                }
            } else {
                var existingCustom = this.existingCustom;
                if(existingCustom == "customValue") {
                    return getResultValue(footballId, valuationId) / scaleAdjust;
                } else {
                    return getResultValue(footballId, valuationId);
                }
            }
        }
    },
    scale: function() {
        var footballId = Template.parentData(1)._id;
        var football = Footballs.findOne({_id: footballId});
        var footballOutput = football.footballOutput;
        var footballScale = football.footballScale;
        if (footballOutput == "Enterprise Value") {
            switch (footballScale) {
                case "millions":
                    return "million";
                    break;
                case "billions":
                    return "billion";
                    break;
            }
        }
    },
    valuationId: function() {
        return this._id;
    }
});