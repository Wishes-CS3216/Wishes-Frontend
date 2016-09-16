serviceModule.service('session', function session($window /*, $rootScope*/) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  
    // window.localStorage key
    var LOCAL_STORAGE_ID = 'WishesSession';

    function saveToDisk(data) {
        if (data) {
            $window.localStorage[LOCAL_STORAGE_ID] = JSON.stringify(data);
        } else {
            delete $window.localStorage[LOCAL_STORAGE_ID];
        }
    }

    function loadFromDisk() {
        try {
            return JSON.parse($window.localStorage[LOCAL_STORAGE_ID]);
        } catch (e) {
            return null;
        }
    }

    var _session = loadFromDisk(); 
  
    // Data contains read-only properties
    // Can be null to clear session
    this.save = function(data) {
        _session = data;
        saveToDisk(_session);
    };

    // Read-only getters
    this.currentUser = function () {
        if (!_session || !_session.currentUser) {
            return undefined
        }

        return _session.currentUser; 
    };

    this.currentUserDisplayName = function () {
        if (!_session || !_session.currentUser) {
            return undefined
        } else if (!_session.currentUser.display_name) {
            return _session.currentUser.username
        } else {
            return _session.currentUser.display_name;
        }
    };

    this.currentUserPoints = function () {
        if (!_session || !_session.currentUser || !_session.currentUser.points) {
            return 0;
        } else {
            return _session.currentUser.points
        }
    };

    this.currentUserPostedWishesCount = function() {
        if (!_session || !_session.currentUser || !_session.currentUser.posted_wishes_count) {
            return 0;
        } else {
            return _session.currentUser.posted_wishes_count
        }
    }

    this.currentUserPickedWishesCount = function() {
        if (!_session || !_session.currentUser || !_session.currentUser.picked_wishes_count) {
            return 0;
        } else {
            return _session.currentUser.picked_wishes_count
        }
    }
});