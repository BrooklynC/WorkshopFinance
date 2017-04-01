Session.set('sessionIsSelectedId', null);

Template.CoverageItem.events({
    'click .gallery-item-detail': function() {
        var coverage = Session.get('sessionCoverageType');

        if(coverage == "Footballs") {
            var currentUserId = Meteor.userId();
            var currentFootballId = Options.findOne({ownerId:currentUserId}).footballActive;
            var newFootballId = this._id;
            Session.set('sessionIsSelectedId', newFootballId);

            console.log("CurrentFootballId: ", currentFootballId);
            console.log("NewFootballId: ", newFootballId);
            Meteor.call('footballOpen', currentFootballId, newFootballId, function() {
            });
        } else {
            var id = this._id;
            if(localSelections.findOne({_id:id})) {
                localSelections.remove({_id:id});
            } else {
                localSelections.insert({_id:id});
            }

            //var state = Template.instance().state.get('isSelectedId');
            //var id = this._id;
            //switch (state) {
            //    case null:
            //        Template.instance().state.set('isSelectedId', this._id);
            //        console.log(Template.instance().state.get('isSelectedId'));
            //        localSelections.insert({_id:id});
            //        break;
            //    case id:
            //        Template.instance().state.set('isSelectedId', null);
            //        console.log(Template.instance().state.get('isSelectedId'));
            //        localSelections.remove({_id:id});
            //        break;
            //}
        }
    }
});

Template.CoverageItem.helpers({
    itemBase: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "Footballs":
                return Template.GalleryItemBaseFootballs;
                break;
            case "Valuations":
                return Template.GalleryItemBaseValuations;
                break;
            case "Targets":
                return Template.GalleryItemBaseTargets;
                break;
        }
    },
    itemBlock: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "Footballs":
                return Template.GalleryItemBlockFootballs;
                break;
            case "Valuations":
                return Template.GalleryItemBlockValuations;
                break;
            case "Targets":
                return Template.GalleryItemBlockTargets;
                break;
        }
    },
    collapseId: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "Footballs":
                return this._id;
                break;
            case "Valuations":
                return this._id;
                break;
            case "Targets":
                return this.targetId;
                break;
        }
    },
    itemAction: function() {
        var coverage = Session.get('sessionCoverageType');
        switch(coverage) {
            case "Footballs":
                var currentUserId = Meteor.userId();
                var currentFootballId = Template.parentData(0)._id;
                var notification = Notifications.findOne({receiverId:currentUserId,itemId:currentFootballId});
                if(!notification) {
                    return Template.GalleryItemSelect;
                } else {
                    var read = notification.read;
                    switch(read) {
                        case true:
                            return Template.GalleryItemSelect;
                            break;
                        case false:
                            return Template.GalleryItemFootballReceive;
                            break;
                    }
                }
                break;
            case "Valuations":
                return Template.GalleryItemSelect;
                break;
            case "Targets":
                return Template.GalleryItemFootballAdd;
                break;
        }
    },
    isSelected: function() {
        var currentUserId = Meteor.userId();
        var id = this._id;
        var theme = Options.findOne({ownerId: currentUserId}).theme;
        var coverage = Session.get('sessionCoverageType');
        switch (coverage) {
            case "Footballs":
                var selected = Session.get('sessionIsSelectedId');
                switch (theme) {
                    case "light":
                        if (id == selected) {
                            return "is-selected-light"
                        } else {
                            return "is-notselected-light"
                        }
                        break;
                    case "dark":
                        if (id == selected) {
                            return "is-selected-dark"
                        } else {
                            return "is-notselected-dark"
                        }
                }
                break;
            case "Valuations":
                switch(theme) {
                    case "light":
                        if (localSelections.findOne({_id: id})) {
                            return "is-selected-light"
                        } else {
                            return "is-notselected-light"
                        }
                        break;
                    case "dark":
                        if (localSelections.findOne({_id: id})) {
                            return "is-selected-dark"
                        } else {
                            return "is-notselected-dark"
                        }
                }
                //switch (theme) {
                //    case "light":
                //        return this._id === Template.instance().state.get('isSelectedId') ? 'is-selected-light' : 'is-notselected-light';
                //        break;
                //    case "dark":
                //        return this._id === Template.instance().state.get('isSelectedId') ? 'is-selected-dark' : 'is-notselected-dark';
                //        break;
                //}
                break;
            case "Targets":
                return "";
                break;
        }
    }
});

Template.CoverageItem.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('isSelectedId', null);
});