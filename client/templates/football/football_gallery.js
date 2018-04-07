Session.set('footballGalleryContent', "controls");

Template.FootballGallery.events({
    'click .btn-controls': function (e) {
        e.preventDefault();

        Session.set('footballGalleryContent', "controls");
    },
    'click .btn-library': function (e) {
        e.preventDefault();

        Session.set('footballGalleryContent', "library");
    }
});

Template.FootballGallery.helpers({
    footballGalleryContent: function () {
        var footballGalleryContent = Session.get("footballGalleryContent");

        switch(footballGalleryContent) {
            case "controls":
                return Template.FootballGalleryVisual;
                break;
            case "library":
                return Template.FootballGalleryLibrary;
                break;
        }
    }
});