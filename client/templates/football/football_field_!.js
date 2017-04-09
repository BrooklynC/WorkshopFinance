Template.FootballField.helpers({
    fieldScroll: function() {
        var sessionValuations = Session.get('sessionValuations');
        if(sessionValuations == "array") {
            return "football-field-valuations-scroll"
        }
    }
});