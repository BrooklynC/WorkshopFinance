Template.ValuationBuildDataDeals.events({
    'change .build-deals-sector': function(e) {
        e.preventDefault();

        var sector = $(e.target).val();

        Template.instance().state.set('sector', sector);
    },
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var selection = $(".build-deals-deal option:selected").val();
        console.log(selection);

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            return Meteor.call('valuationBuildDataAdd', currentFootballId, currentValuationId, selection, function(error, result) {
            });
        }
    }
});

Template.ValuationBuildDataDeals.helpers({
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
    selectedHighTech: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "High Technology") {
            return "selected";
        }
    },
    selectedMedia: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Media and Technology") {
            return "selected";
        }
    },
    selectedFinancials: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Financials") {
            return "selected";
        }
    },
    selectedRealEstate: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Real Estate") {
            return "selected";
        }
    },
    selectedConsumerStaples: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Consumer Staples") {
            return "selected";
        }
    },
    selectedConsumerProducts: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Consumer Products and Services") {
            return "selected";
        }
    },
    selectedRetail: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Retail") {
            return "selected";
        }
    },
    selectedEnergy: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Energy and Power") {
            return "selected";
        }
    },
    selectedTelecom: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == "Telecommunications") {
            return "selected";
        }
    },
    deals: function() {
        var sector = Template.instance().state.get('sector');
        console.log(sector);
        return FeedDeals.find({sector:sector});
    }
});

Template.ValuationBuildDataDeals.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('sector', null);
});