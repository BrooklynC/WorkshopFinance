Template.ValuationBuildDataComps.events({
    'click .build-comp-sector': function(e) {
        e.preventDefault();

        var sector = $(e.target).text();

        Template.instance().state.set('sector', sector);
    },
    'click .build-comp-comp': function(e) {
        e.preventDefault();

        var comp = this._id;

        Template.instance().state.set('comp', comp);
    },
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var selection = Template.instance().state.get('comp');

        Template.instance().state.set('comp', null);

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            return Meteor.call('valuationBuildDataAdd', currentFootballId, currentValuationId, selection, function(error, result) {
            });
        }
    }
});

Template.ValuationBuildDataComps.helpers({
    sectorTitle: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == null) {
            return "Sector:"
        } else {
            return sector;
        }
    },
    compTitle: function() {
        var comp = Template.instance().state.get('comp');
        if(comp == null) {
            return "Comp:"
        } else {
            return FeedCompanies.findOne({_id:comp}).ticker;
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
    this.state.set('comp', null);
});