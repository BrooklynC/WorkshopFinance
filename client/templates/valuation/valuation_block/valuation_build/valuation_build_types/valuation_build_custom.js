Session.set('sessionBuildElement', 'Value');

Template.ValuationBuildCustom.events({
    //'submit form': function(e) {
    //    e.preventDefault();
    //
    //    var currentFootballId = Template.parentData(1)._id;
    //    var currentValuationId = this._id;
    //    var fieldName = $(e.target).find('[id=customNameAdd]');
    //    var fieldStat = $(e.target).find('[id=customStatAdd]');
    //    var fieldValue = $(e.target).find('[id=customValueAdd]');
    //
    //    var selectionName = fieldName.val();
    //    var menuStat = fieldStat.val();
    //    var selectionValue = fieldValue.val();
    //
    //    if(selectionName == "" || selectionValue == "") {
    //        alert("You must include a name, stat and value.")
    //    } else {
    //        fieldName.val('');
    //        fieldStat.val('');
    //        fieldValue.val('');
    //
    //        var ownerId = this.ownerId;
    //        var currentUserId = Meteor.userId();
    //
    //        var valuationSelections = this.valuationSelections;
    //        var count = valuationSelections.length;
    //        var existingCustom = this.existingCustom;
    //
    //        getStat = function() {
    //            if(count > 0) {
    //                return existingCustom;
    //            } else {
    //                return menuStat
    //            }
    //        };
    //        var selectionStat = getStat();
    //
    //        if(currentUserId == ownerId) {
    //            return Meteor.call('valuationBuildCustomAdd', currentFootballId, currentValuationId, selectionName, selectionStat, selectionValue, function(error, result) {
    //            });
    //        }
    //    }
    //}
    'click .menu-build-element': function(e) {
        e.preventDefault();

        var element = $(e.target).text();

        Template.instance().state.set('element', element);
        //Session.set('sessionBuildElement', element);
    },
    'submit form': function(e) {
        e.preventDefault();

        var currentFootballId = Template.parentData(1)._id;
        var currentValuationId = this._id;
        var fieldName = $(e.target).find('[id=customNameAdd]');
        var fieldStat = Template.instance().state.get('element');
        var fieldValue = $(e.target).find('[id=customValueAdd]');

        var selectionName = fieldName.val();
        var menuStat = fieldStat;
        var selectionValue = fieldValue.val();

        if(selectionName == "" || selectionValue == "") {
            alert("You must include a name, stat and value.")
        } else {
            fieldName.val('');
            fieldValue.val('');

            var ownerId = this.ownerId;
            var currentUserId = Meteor.userId();

            var valuationSelections = this.valuationSelections;
            var count = valuationSelections.length;
            var existingCustom = this.existingCustom;

            getStat = function() {
                if(count > 0) {
                    return existingCustom;
                } else {
                    return menuStat
                }
            };
            var selectionStat = getStat();

            if(currentUserId == ownerId) {
                return Meteor.call('valuationBuildCustomAdd', currentFootballId, currentValuationId, selectionName, selectionStat, selectionValue, function(error, result) {
                });
            }
        }
    }
});

Template.ValuationBuildCustom.helpers({
    buildElement: function() {
        return Session.get('sessionBuildElement');
    },
    isCount: function() {
        var selections = this.valuationSelections;
        var count = selections.length;
        if(count > 0) {
            return true;
        }
    }
});

Template.ValuationBuildCustom.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('element', null);
});