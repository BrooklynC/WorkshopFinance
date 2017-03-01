Template.CoverageContentList.helpers({
    coverage: function() {
        var currentUserId = Meteor.userId();
        var sessionCoverage = Session.get('sessionCoverageType');
        var sessionCoverageScreen = Session.get('sessionCoverageScreenType');
        switch (sessionCoverage) {
            case "footballs":
                return Footballs.find(
                    {marketType: sessionCoverageScreen}
                );
                break;
            case "valuations":
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
            case "targets":
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
            //return Options.findOne({ownerId: currentUserId}).targets;
        }
    }
});