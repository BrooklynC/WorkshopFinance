Template.GalleryItemBaseDeals.events({
});

Template.GalleryItemBaseDeals.helpers({
    dealName: function() {
        return this.companyName;
    }
});

Template.GalleryItemBaseDeals.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var dealId = Template.parentData(0)._id;
        self.subscribe('galleryDealsItem', dealId);
    });
});