//This is used once by user "workshop" after database reset
Template.GalleryAddData.events({
    'submit form': function(e) {
        e.preventDefault();

        var comps = FeedCompanies.find({});
        if(comps.count() === 0) {
            Meteor.call('addComps', function (error, result) {
            });
        } else {
            var deals = FeedDeals.find({});
            if(deals.count() === 0) {
                Meteor.call('addDeals', function (error, result) {
                });
            } else {
                var indicesComps = FeedCompaniesIndices.find({});
                if (indicesComps.count() === 0) {
                    Meteor.call('addIndicesComps', function (error, result) {
                    });
                } else {
                    var indicesDeals = FeedDealsIndices.find({});
                    if (indicesDeals.count() === 0) {
                        Meteor.call('addIndicesDeals', function (error, result) {
                        });
                    } else {
                        var teams = FeedTeams.find({});
                        if(teams.count() === 0) {
                            Meteor.call('addTeams', function (error, result) {
                            });
                        }
                    }
                }
            }
        }
    }
});

Template.GalleryAddData.helpers({
    data: function() {
        var comps = FeedCompanies.find({});
        if(comps.count() === 0) {
            return "Comps";
        } else {
            var deals = FeedDeals.find({});
            if(deals.count() === 0) {
                return "Deals";
            } else {
                var indicesComps = FeedCompaniesIndices.find({});
                if (indicesComps.count() === 0) {
                    return "Comps Indices";
                } else {
                    var indicesDeals = FeedDealsIndices.find({});
                    if (indicesDeals.count() === 0) {
                        return "Deals Indices";
                    } else {
                        var teams = FeedTeams.find({});
                        if(teams.count() === 0) {
                            return "Teams";
                        } else {
                            return "";
                        }
                    }
                }
            }
        }
    }
});