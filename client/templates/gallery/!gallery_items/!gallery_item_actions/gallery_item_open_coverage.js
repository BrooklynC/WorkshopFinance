Template.GalleryItemOpenCoverage.helpers({
    collapseId: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "targets":
                return this.targetId;
                break;
            case "footballs":
                return this._id;
                break;
            case "valuations":
                return this._id;
                break;
        }
    }
});