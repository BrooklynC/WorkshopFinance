Template.GalleryLibrary.events({
    'click #gallery-library-accordion': function(e) {
        e.preventDefault();

        var sessionGalleryExisting = Session.get('sessionGallery');
        Session.set('sessionGallery', "library");
        var sessionGalleryNew = Session.get('sessionGallery');

        if(sessionGalleryExisting !== sessionGalleryNew) {
            localSelections.remove({})
        }
    }
});

