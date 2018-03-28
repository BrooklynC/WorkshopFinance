Template.Football.helpers({
    footballContent: function () {
        var footballContent = Session.get("footballContent");

        switch(footballContent) {
            case "field":
                return Template.FootballField;
                break;
            case "controls":
                return Template.GalleryVisualMobile;
                break;
        }
    }
});