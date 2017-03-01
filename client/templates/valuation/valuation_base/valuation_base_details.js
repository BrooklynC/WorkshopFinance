Template.ValuationBaseDetails.events({
    'click .valuation-name-value': function(e) {
        e.preventDefault();

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();
        var nameState = Template.instance().showName.get();

        if(currentUserId == ownerId) {
            if(nameState == true) {
                Template.instance().showName.set(false);
            }
        }
    },
    'submit .valuation-name-form': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var valuationName = $(e.target).find('[name=valuation-name-edit]').val();

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            Meteor.call('valuationNameUpdate', currentValuationId, valuationName, function(error, result) {
            });
            Template.instance().showName.set(true)
        }
    }
});

Template.ValuationBaseDetails.helpers({
    //Changes between button that displays name and input to change name
    showName: function() {
        return Template.instance().showName.get();
    },
    //Valuation Output matches Football Output if Enterprise Value or Price per Share, otherwise use Valuation Output
    detail: function() {
        var footballId = Template.parentData(1)._id;
        var football = Footballs.findOne({_id:footballId});
        var targetId = football.footballTarget.targetId;
        var footballType = football.footballType;
        var footballOutput = football.footballOutput;
        var valuationMetric = this.valuationMetric;
        var valuationOutput = this.valuationOutput;
        var valuationType = this.valuationType;
        switch(valuationType) {
            case "comps":
                if (targetId !== "none") {
                    return valuationOutput;
                } else {
                    return valuationMetric
                }
                break;
            case "deals":
                if (targetId !== "none") {
                    return valuationOutput;
                } else {
                    return valuationOutput
                }
                break;
            case "models":
                switch(footballType) {
                    case "market":
                        return "Models";
                        break;
                    case "target":
                        switch(footballOutput) {
                            case "Enterprise Value":
                                return "Enterprise Value";
                                break;
                            case "Price per Share":
                                return "Price per Share";
                                break;
                            case "Multiple":
                                return valuationOutput;
                                break;
                        }
                }
                break;
            case "custom":
                var existingCustom = this.existingCustom;
                switch(existingCustom) {
                    case "customValue":
                        return "Custom Value";
                        break;
                    case "customPrice":
                        return "Custom Price";
                        break;
                    case "customMultiple":
                        return "Custom Multiple";
                        break;
                }
                break;
        }
    },
    //Show Output Period if footballOutput is Multiple
    period: function() {
        var footballId = Template.parentData(1)._id;
        var football = Footballs.findOne({_id:footballId});
        var targetId = football.footballTarget.targetId;
        var footballOutput = football.footballOutput;
        var valuationType = this.valuationType;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        var valuationPeriod = this.valuationPeriod;
        switch(valuationType) {
            case "comps":
                if (targetId !== "none") {
                    return valuationOutputPeriod;
                } else {
                    return valuationPeriod
                }
                break;
            case "deals":
                if (targetId !== "none") {
                    return valuationOutputPeriod;
                } else {
                    return valuationPeriod
                }
                break;
            case "models":
                switch(footballOutput) {
                    case "Enterprise Value":
                        return "";
                        break;
                    case "Price per Share":
                        return "";
                        break;
                    case "Multiple":
                        return valuationPeriod;
                        break;
                }
                break;
            case "custom":
                return "";
                break;
        }
    },
    //Formatting helper to use around Output Period if shown
    paren: function() {
        var valuationType = this.valuationType;
        switch(valuationType) {
            case "comps":
                return {
                    open: "(",
                    close: ")"
                };
                break;
            case "deals":
                return {
                    open: "(",
                    close: ")"
                };
                break;
            case "models":
                var footballOutput = Template.parentData(1).footballOutput;
                switch(footballOutput) {
                    case "Enterprise Value":
                        return {
                            open: "",
                            close: ""
                        };
                        break;
                    case "Price per Share":
                        return {
                            open: "",
                            close: ""
                        };
                        break;
                    case "Multiple":
                        return {
                            open: "(",
                            close: ")"
                        };
                        break;
                }
                break;
            case "custom":
                return {
                    open: "",
                    close: ""
                };
                break;
        }
    },
    hold: function() {
        var valuationType = this.valuationType;
        if(valuationType == "custom") {
            var footballOutput = Template.parentData(1).footballOutput;
            var existingCustom = this.existingCustom;
            switch(footballOutput) {
                case "Enterprise Value":
                    if(existingCustom !== "customValue") {
                        return "*Not in calculations";
                    }
                    break;
                case "Price per Share":
                    if(existingCustom !== "customPrice") {
                        return "*Not in calculations";
                    }
                    break;
                case "Multiple":
                    if(existingCustom !== "customMultiple") {
                        return "*Not in calculations";
                    }
                    break;
            }
        }
    },
    asOf: function() {
        var valuationType = this.valuationType;
        if(valuationType == "comps") {
            return "as of";
        }
    },
    valuationDateComp: function() {
        var valuationType = this.valuationType;
        var valuationDate = this.valuationDate;
        if(valuationType == "comps") {
            return valuationDate;
        }
    },
    valuationId: function() {
        return this._id;
    }
});

Template.ValuationBaseDetails.onCreated (function () {
    this.showName = new ReactiveVar(true);
});