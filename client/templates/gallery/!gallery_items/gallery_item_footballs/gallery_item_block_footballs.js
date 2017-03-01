Template.GalleryItemBlockFootballs.helpers({
    valuationCount: function () {
        var valuations = Footballs.findOne({_id:this._id}).footballValuations;
        if(valuations) {
            return valuations.length;
        }
    },
    owner: function() {
        var ownerId = this.ownerId;
        return Meteor.users.findOne({_id:ownerId}).username;
    }
});

Template.GalleryItemBlockFootballs.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var footballId = Template.parentData(0)._id;
        self.subscribe('galleryFootballsItem', footballId);
        self.subscribe('galleryFootballsItemTargetCompanyFeed', footballId);
        self.subscribe('galleryFootballsItemTargetTeamFeed', footballId);
        self.subscribe('users');
    });
});