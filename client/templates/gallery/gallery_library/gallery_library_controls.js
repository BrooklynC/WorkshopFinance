Template.LibraryControls.helpers({
    indicesCreate: function() {
        var username = Meteor.user().username;
        if (username == "workshop") {
            var indicesComps = FeedCompaniesIndices.find({values:{$exists:true}});
            if(indicesComps.count() === 0) {
                return Template.GalleryIndicesComps;
            } else {
                var indicesDeals = FeedDealsIndices.find({values:{$exists:true}});
                if(indicesDeals.count() === 0) {
                    return Template.GalleryIndicesDeals;
                } else {
                    return Template.FootballBlank;
                }
            }
        } else {
            return Template.FootballBlank;
        }
    }
});