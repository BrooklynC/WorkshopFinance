Template.CoverageContentMessage.helpers({
    coverageMessage: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "Targets":
                return "You haven't added any targets yet.";
                break;
            case "Footballs":
                return "You haven't created any footballs yet.";
                break;
            case "Valuations":
                return "You haven't selected any favorite valuations yet.";
                break;
        }
    }
});
