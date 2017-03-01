Template.GalleryItemBlockComps.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var companyId = Template.parentData(0)._id;
        self.subscribe('galleryCompaniesItem', companyId);
    });
});