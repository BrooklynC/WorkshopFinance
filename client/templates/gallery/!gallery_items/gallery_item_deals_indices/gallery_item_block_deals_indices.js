Template.GalleryItemBlockDealsIndices.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var indexId = Template.parentData(0)._id;
        self.subscribe('galleryDealsIndicesItem', indexId);
    });
});