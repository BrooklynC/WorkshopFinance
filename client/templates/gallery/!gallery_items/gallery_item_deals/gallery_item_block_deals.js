Template.GalleryItemBlockDeals.events({
});

Template.GalleryItemBlockDeals.helpers({
    //Show different fields if Deal or Deal Index
    annDate: function() {
        var date = this.dealTerms.annDate;
        return moment(date, ["MM-DD-YYYY"]);
    }
});

Template.GalleryItemBlockDeals.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var dealId = Template.parentData(0)._id;
        self.subscribe('galleryDealsItem', dealId);
    });
});