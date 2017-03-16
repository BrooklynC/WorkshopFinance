Template.ValuationBaseBar.events({
    'click .valuation-bar-frame': function(e) {
        e.preventDefault();

        var valuationId = this._id;

        var sessionValuations = Session.get('sessionValuations');
        if(sessionValuations == "array") {
            Session.set('sessionValuations', valuationId);
        } else {
            Session.set('sessionValuations', "array");
        }
    }
});

Template.ValuationBaseBar.helpers({
    barFrame: function() {
        var ownerId = this.ownerId;
        var selections = this.valuationSelections;
        var multiples = this.multiples;
        var currentUserId = Meteor.userId();
        //var tier = Meteor.users.findOne({_id:currentUserId}).profile.tier;
        if (!selections || selections.length == 0 || !multiples) {
            return Template.ValuationBaseBarEmpty;
        } else {
            var valuationType = this.valuationType;
            switch(valuationType) {
                case "comps":
                    return Template.ValuationBaseBarFull;
                    break;
                case "deals":
                    return Template.ValuationBaseBarFull;
                    break;
                case "models":
                    if(currentUserId == ownerId) {
                        //if(tier == "B") {
                            return Template.ValuationBaseBarFull;
                        //} else {
                        //    return Template.ValuationBaseBarHold;
                        //}
                    } else {
                        return Template.ValuationBaseBarFull;
                    }
                    break;
                case "custom":
                    if(currentUserId == ownerId) {
                        //if(tier == "B") {
                            var footballOutput = Template.parentData(1).footballOutput;
                            var existingCustom = this.existingCustom;
                            var count = selections.length;
                            switch(footballOutput) {
                                case "Enterprise Value":
                                    if (existingCustom == "customValue") {
                                        return Template.ValuationBaseBarFull;
                                    } else {
                                        if (count > 0) {
                                            return Template.ValuationBaseBarHold;
                                        } else {
                                            return Template.ValuationBaseBarEmpty;
                                        }
                                    }
                                    break;
                                case "Price per Share":
                                    if (existingCustom == "customPrice") {
                                        return Template.ValuationBaseBarFull;
                                    } else {
                                        if (count > 0) {
                                            return Template.ValuationBaseBarHold;
                                        } else {
                                            return Template.ValuationBaseBarEmpty;
                                        }
                                    }
                                    break;
                                case "Multiple":
                                    if (existingCustom == "customMultiple") {
                                        return Template.ValuationBaseBarFull;
                                    } else {
                                        if (count > 0) {
                                            return Template.ValuationBaseBarHold;
                                        } else {
                                            return Template.ValuationBaseBarEmpty;
                                        }
                                    }
                                    break;
                            }
                        //} else {
                        //    return Template.ValuationBaseBarHold;
                        //}
                    } else {
                        return Template.ValuationBaseBarFull;
                    }
                    break;
            }
        }
    },
    valuationId: function() {
        return this._id;
    }
});