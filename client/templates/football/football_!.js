//All publications should be checked.
Template.Football.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var footballId = Template.parentData(0)._id;
        self.subscribe('football', footballId);
        self.subscribe('valuationsUser');
        self.subscribe('valuationsShared');
        self.subscribe('feedCompaniesAll');
        self.subscribe('feedCompaniesIndicesAll');
        self.subscribe('feedDealsAll');
        self.subscribe('feedDealsIndicesAll');
        self.subscribe('feedTeamsAll');
        self.subscribe('feedModelsUser');
        self.subscribe('customs');
        //self.subscribe('footballTarget', footballId);
        //self.subscribe('footballTargetFeed', footballId);
        //self.subscribe('footballValuations', footballId);
    });
});