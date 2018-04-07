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
    },
    controlsSelected: function() {
        var currentUserId = Meteor.userId();
        var theme = Options.findOne({ownerId: currentUserId}).theme;
        var footballGalleryContent = Session.get('footballGalleryContent');
        if(footballGalleryContent == "controls") {
            switch (theme) {
                case "light":
                    return "is-selected-light";
                    break;
                case "dark":
                    return "is-selected-dark";
                    break;
            }
        } else {
            switch (theme) {
                case "light":
                    return "is-notselected-light";
                    break;
                case "dark":
                    return "is-notselected-dark";
                    break;
            }
        }
    },
    librarySelected: function() {
        var currentUserId = Meteor.userId();
        var theme = Options.findOne({ownerId: currentUserId}).theme;
        var footballGalleryContent = Session.get('footballGalleryContent');
        if(footballGalleryContent == "library") {
            switch (theme) {
                case "light":
                    return "is-selected-light";
                    break;
                case "dark":
                    return "is-selected-dark";
                    break;
            }
        } else {
            switch (theme) {
                case "light":
                    return "is-notselected-light";
                    break;
                case "dark":
                    return "is-notselected-dark";
                    break;
            }
        }
    }
});