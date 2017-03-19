Template.GalleryItemBlockUsers.events({
});

Template.GalleryItemBlockUsers.helpers({
    footballCount: function() {
        var userId = this._id;
        var footballs = Footballs.find({ownerId:userId});
        return footballs.fetch().length;
    },
    valuationCount: function() {
        var userId = this._id;
        var valuations = Valuations.find({ownerId:userId});
        return valuations.fetch().length;
    }
});

Template.GalleryItemBlockUsers.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var ownerId = Template.parentData(0)._id;
        console.log(ownerId);
        self.subscribe('galleryFootballsOwner', ownerId);
        self.subscribe('galleryValuationsOwner', ownerId);
    });
});