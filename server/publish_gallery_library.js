////GALLERY PUBLICATIONS

//COMPANY GALLERY --> check all fields
Meteor.publish('galleryCompanies', function() {
    return FeedCompanies.find({},{fields:{_id:1, sector: 1}});
});

Meteor.publish('galleryCompaniesIndices', function() {
    return FeedCompaniesIndices.find({}, {fields:{_id:1}});
});

Meteor.publish('galleryCompaniesItem', function(companyId) {
    check(companyId, String);
    return FeedCompanies.find({_id:companyId});
});

Meteor.publish('galleryCompsIndicesItem', function(indexId) {
    check(indexId, String);
    return FeedCompaniesIndices.find({_id:indexId});
});

//DEAL GALLERY --> check all fields
Meteor.publish('galleryDeals', function() {
    return FeedDeals.find({}, {fields:{_id:1, sector:1}});
});

Meteor.publish('galleryDealsIndices', function() {
    return FeedDealsIndices.find({}, {fields:{_id:1}});
});

Meteor.publish('galleryDealsItem', function(dealId) {
    check(dealId, String);

    return FeedDeals.find({_id:dealId});
});

Meteor.publish('galleryDealsIndicesItem', function(indexId) {
    check(indexId, String);
    return FeedDealsIndices.find({_id:indexId});
});

//VALUATION GALLERY
Meteor.publish('galleryValuationsUser', function() {
    var currentUserId = this.userId;
    return Valuations.find({$and:[{ownerId: currentUserId},{valuationFavorite:true}]}, {fields:{_id:1, ownerId:1, valuationFavorite:1}});
});

Meteor.publish('galleryValuationsShared', function() {
    var currentUserId = this.userId;
    return Valuations.find({viewers:{$in:[currentUserId]}});
});

Meteor.publish('galleryValuationsItem', function(valuationId) {
    check(valuationId, String);
    return Valuations.find({_id:valuationId});
});