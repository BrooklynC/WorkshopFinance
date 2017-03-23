Template.ValuationBuildDataComps.events({
    'change .build-comps-sector': function(e) {
        e.preventDefault();

        var sector = $(e.target).val();

        Template.instance().state.set('sector', sector);
    },
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var selectionField = $('#build' + currentValuationId + " " + 'option:selected');
        var selection = selectionField.val();

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            return Meteor.call('valuationBuildDataAdd', currentFootballId, currentValuationId, selection, function(error, result) {
            });
        }
        selectionField.val('');
    }
});

Template.ValuationBuildDataComps.helpers({
    selectedHealthcare: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Healthcare") {
            return "selected";
        }
    },
    selectedMaterials: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Materials") {
            return "selected";
        }
    },
    selectedIndustrials: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Industrials") {
            return "selected";
        }
    },
    selectedIt: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Information Technology") {
            return "selected";
        }
    },
    selectedFinancials: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Financials") {
            return "selected";
        }
    },
    selectedConsumerStaples: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Consumer Staples") {
            return "selected";
        }
    },
    selectedConsumerDisc: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Consumer Discretionary") {
            return "selected";
        }
    },
    selectedUtilities: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Healthcare") {
            return "selected";
        }
    },
    selectedEnergy: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Energy") {
            return "selected";
        }
    },
    selectedTelecom: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Telecommunication Services") {
            return "selected";
        }
    },
    comps: function() {
        var sector = Template.instance().state.get('sector');
        return FeedCompanies.find({sector:sector});
    },
    disableNoSector: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == null) {
            return "disabled";
        }
    }
});

Template.ValuationBuildDataComps.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('sector', null);
});