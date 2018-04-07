Template.Football.helpers({
    footballRange: function () {
        var footballContent = Session.get("footballContent");

        if(footballContent == "field") {
            return Template.FootballRange;
        } else {
            return Template.Blank;
        }
    },
    footballContent: function () {
        var footballContent = Session.get("footballContent");

        switch(footballContent) {
            case "field":
                return Template.FootballField;
                break;
            case "gallery":
                return Template.FootballGallery;
                break;
            case "coverage":
                return Template.FootballCoverage;
                break;
            case "profile":
                return Template.FootballProfile;
                break;
        }
    },
    top: function() {
        var footballContent = Session.get("footballContent");

        if(footballContent == "field") {
            return "football-content-field"
        } else {
            return "football-content-controls"
        }
    }
});