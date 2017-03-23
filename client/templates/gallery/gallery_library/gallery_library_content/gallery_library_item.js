Template.LibraryItem.events({
    'click .gallery-item-detail': function() {

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
});

Template.LibraryItem.helpers({
    itemBase: function() {
        var libraryType = Session.get('sessionLibraryType');
        switch(libraryType) {
            case "Comps":
                return Template.GalleryItemBaseComps;
                break;
            case "Comps Indices":
                return Template.GalleryItemBaseCompsIndices;
                break;
            case "Deals":
                return Template.GalleryItemBaseDeals;
                break;
            case "Deals Indices":
                return Template.GalleryItemBaseDealsIndices;
                break;
        }
    },
    itemBlock: function() {
        var libraryType = Session.get('sessionLibraryType');
        switch(libraryType) {
            case "Comps":
                return Template.GalleryItemBlockComps;
                break;
            case "Comps Indices":
                return Template.GalleryItemBlockCompsIndices;
                break;
            case "Deals":
                return Template.GalleryItemBlockDeals;
                break;
            case "Deals Indices":
                return Template.GalleryItemBlockDealsIndices;
                break;
        }
    },
    isSelected: function() {
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
    }
});

Template.LibraryItem.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('isSelectedId', null);
});