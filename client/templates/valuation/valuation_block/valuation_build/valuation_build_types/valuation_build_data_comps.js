Template.ValuationBuildDataComps.events({
    'change .build-comps-sector': function(e) {
        e.preventDefault();

        var sector = $(e.target).val();
        console.log("Sector: ", sector);

        Template.instance().state.set('sector', sector);

        var x = Template.instance().state.get('sector');
        console.log("X: ", x);
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
    }
});

Template.ValuationBuildDataComps.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('sector', null);
});