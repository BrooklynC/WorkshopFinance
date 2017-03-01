Template.CoverageItem.events({
    'click .gallery-item-detail': function() {
        var coverage = Session.get('sessionCoverageType');

        if(coverage == "footballs") {
            var currentFootballId = this._id;

            Meteor.call('footballOpen', currentFootballId, function() {
            });
        } else {
            var state = Template.instance().state.get('isSelectedId');
            var id = this._id;
            switch (state) {
                case null:
                    Template.instance().state.set('isSelectedId', this._id);
                    localSelections.insert({_id:id});
                    break;
                case id:
                    Template.instance().state.set('isSelectedId', null);
                    localSelections.remove({_id:id});
                    break;
            }
        }
    }
});

Template.CoverageItem.helpers({
    itemBase: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "footballs":
                return Template.GalleryItemBaseFootballs;
                break;
            case "valuations":
                return Template.GalleryItemBaseValuations;
                break;
            case "targets":
                return Template.GalleryItemBaseTargets;
                break;
        }
    },
    itemBlock: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "footballs":
                return Template.GalleryItemBlockFootballs;
                break;
            case "valuations":
                return Template.GalleryItemBlockValuations;
                break;
            case "targets":
                return Template.GalleryItemBlockTargets;
                break;
        }
    },
    collapseId: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "footballs":
                return this._id;
                break;
            case "valuations":
                return this._id;
                break;
            case "targets":
                return this.targetId;
                break;
        }
    },
    select: function() {
        var currentUserId = Meteor.userId();
        var theme = Options.findOne({ownerId:currentUserId}).theme;
        switch(theme) {
            case "light":
                return this._id === Template.instance().state.get('isSelectedId') ? 'is-selected-light' : 'is-notselected-light';
                break;
            case "dark":
                return this._id === Template.instance().state.get('isSelectedId') ? 'is-selected-dark' : 'is-notselected-dark';
                break;
        }
    },
    itemAction: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "footballs":
                var currentUserId = Meteor.userId();
                var currentFootballId = Template.parentData(0)._id;
                var notification = Notifications.findOne({receiverId:currentUserId,itemId:currentFootballId});
                if(!notification) {
                    return Template.FootballBlank;
                } else {
                    var read = notification.read;
                    switch(read) {
                        case true:
                            return Template.FootballBlank;
                            break;
                        case false:
                            return Template.GalleryItemFootballReceive;
                            break;
                    }
                }
                break;
            case "valuations":
                return Template.GalleryItemSelect;
                break;
            case "targets":
                return Template.GalleryItemFootballAdd;
                break;
        }
    }
});

Template.CoverageItem.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('isSelectedId', null);
});