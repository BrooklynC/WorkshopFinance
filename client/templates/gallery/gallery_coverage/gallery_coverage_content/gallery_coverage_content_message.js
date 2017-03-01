Template.CoverageContentMessage.helpers({
    coverageMessage: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "targets":
                return "You haven't added any targets yet.";
                break;
            case "footballs":
                return "You haven't created any footballs yet.";
                break;
            case "valuations":
                return "You haven't selected any favorite valuations yet.";
                break;
        }
    }
});
