Template.ValuationBlock.events({
    'click .btn-block-toggle': function(e) {
        e.preventDefault();

        var state = Template.instance().state.get('block');
        switch(state) {
            case "results":
                Template.instance().state.set('block', "build");
                break;
            case "build":
                Template.instance().state.set('block', "results");
                break;
        }
    },
    'click .menu-result-build': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var selection = $(e.target).text();
        var footballId = Template.parentData(1)._id;

        Meteor.call('valuationBuildSelect', currentValuationId, selection, footballId, function(error, result) {});
    }
});

Template.ValuationBlock.helpers({
    blockToggle: function() {
        var state = Template.instance().state.get('block');
        switch(state) {
            case "results":
                return "Show Build";
                break;
            case "build":
                return "Show Results";
                break;
        }
    },
    isResults: function() {
        var state = Template.instance().state.get('block');
        if(state == "results") {
            return true;
        }
    },
    isBuild: function() {
        var state = Template.instance().state.get('block');
        if(state == "build") {
            return true;
        }
    }
});

Template.ValuationBlock.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('block', "build");
});