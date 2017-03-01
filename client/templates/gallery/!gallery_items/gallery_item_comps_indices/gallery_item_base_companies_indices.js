Template.GalleryItemBaseCompsIndices.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var indexId = Template.parentData(0)._id;
        self.subscribe('galleryCompsIndicesItem', indexId);
    });
});