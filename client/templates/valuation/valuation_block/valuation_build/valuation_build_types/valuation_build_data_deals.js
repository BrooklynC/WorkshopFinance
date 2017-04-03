Template.ValuationBuildDataDeals.events({
    'click .build-deal-sector': function(e) {
        e.preventDefault();

        var sector = $(e.target).text();

        Template.instance().state.set('sector', sector);
    },
    'click .build-deal-deal': function(e) {
        e.preventDefault();

        var deal = this._id;

        Template.instance().state.set('deal', deal);
    },
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var selection = Template.instance().state.get('deal');

        Template.instance().state.set('deal', null);

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            return Meteor.call('valuationBuildDataAdd', currentFootballId, currentValuationId, selection, function(error, result) {
            });
        }
        //Template.instance().state.set('sector', null);
        Template.instance().state.set('deal', null);
    }
});

Template.ValuationBuildDataDeals.helpers({
    sectorTitle: function() {
        var sector = Template.instance().state.get('sector');
        if(sector == null) {
            return "Sector:"
        } else {
            return sector;
        }
    },
    dealTitle: function() {
        var deal = Template.instance().state.get('deal');
        if(deal == null) {
            return "Deal:"
        } else {
            return FeedDeals.findOne({_id:deal}).companyName;
        }
    },
    deals: function() {
        var sector = Template.instance().state.get('sector');
        return FeedDeals.find({sector:sector});
    }
});

Template.ValuationBuildDataDeals.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('sector', null);
    this.state.set('deal', null);
});