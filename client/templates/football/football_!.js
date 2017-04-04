Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent in px
    left: '50%' // Left position relative to parent in px
};

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
        self.subscribe('modelsUser');
        self.subscribe('modelsShared');
        self.subscribe('customsUser');
        self.subscribe('customsShared');
        //self.subscribe('footballTarget', footballId);
        //self.subscribe('footballTargetFeed', footballId);
        //self.subscribe('footballValuations', footballId);
    });
});