Template.ValuationBaseBar.events({
    'click .valuation-bar-frame': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;

        var sessionValuations = Session.get('sessionValuations');
        if(sessionValuations == "array") {
            Session.set('sessionValuations', currentValuationId);
        } else {
            var footballValuations = Footballs.findOne({_id:currentFootballId}).footballValuations;
            var valuationsEmpty = Valuations.find(
                {
                    $and: [
                        {_id: {$in: footballValuations}},
                        {valuationSelections: {$size: 0}}
                    ]
                }
            ).fetch();
            var count = valuationsEmpty.length;
            if(count == 2) {
                Meteor.call('valuationRemove', currentFootballId, currentValuationId, function () {
                    Session.set('sessionValuations', "array");
                });
            } else {
                Session.set('sessionValuations', "array");
            }
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
                                    if (existingCustom == "Value") {
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
                                    if (existingCustom == "Price") {
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
                                    if (existingCustom == "Multiple") {
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