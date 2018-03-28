Template.FootballOpenControls.events({
    'click .open-controls': function(e) {
        e.preventDefault();

        Session.set("footballContent", "controls")
    }
});

Template.FootballOpenControls.helpers({
});

Template.FootballOpenControls.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('open', null);
});