Template.Studio.onCreated (function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('options');
        self.subscribe('users');
    });
});