Template.CoverageContent.helpers({
    coverage: function() {
        var currentUserId = Meteor.userId();
        var sessionCoverage = Session.get('sessionCoverageType');
        var sessionCoverageScreen = Session.get('sessionCoverageScreenType');
        switch (sessionCoverage) {
            case "Footballs":
                return Footballs.find(
                    {marketType: sessionCoverageScreen}
                );
                break;
            case "Valuations":
                return Valuations.find({
                    $and: [
                        {
                            ownerId: currentUserId
                        },
                        {
                            marketType: sessionCoverageScreen
                        },
                        {
                            valuationFavorite: true
                        }
                    ]
                });
                break;
            case "Targets":
                var targets = Options.findOne({ownerId: currentUserId}).targets;
                var companies = [];
                var teams = [];
                targets.forEach(function (t) {
                    var type = t.targetType;
                    switch(type) {
                        case "company":
                            companies.push(t);
                            break;
                        case "team":
                            teams.push(t);
                            break;
                    }
                });
                switch(sessionCoverageScreen) {
                    case "company":
                        return companies;
                        break;
                    case "team":
                        return teams;
                        break;
                }
        }
    }
});

Template.CoverageContent.onCreated (function () {
    var self = this;
    self.autorun(function() {
        //Footballs needs to be refined
        self.subscribe('galleryFootballs');
        self.subscribe('galleryFootballsUser');
        self.subscribe('galleryFootballsShared');
        self.subscribe('galleryTargetsUser');
        self.subscribe('galleryTargetsShared');
        self.subscribe('galleryValuationsUser');
        self.subscribe('galleryValuationsShared');
    });
});
