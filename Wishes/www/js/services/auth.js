serviceModule.

service('auth', function auth($http, $state, $ionicPopup, session, apis, $window, wicache) {
    this.login = function(data, handler){
        if (data === undefined) {
            handleLoginFailure(handler)
        } else {
            apis.login.post({}, {
                username: data.username,
                password: data.password
            }).success(function(response){
                if (response.message === "Authentication failed") {
                    handleLoginFailure(handler)
                } else {
                    handleLoginSuccess(response, handler)
                }
            }).error(function(response){
                handleLoginFailure(handler)
            })
        }
    };

    function handleLoginFailure(handler) {
        $ionicPopup.show({
            title: 'Login Failed',
            buttons: [{text: 'OK'}]
        });
        handler(false);
    }

    function handleLoginSuccess(data, handler) {
        setCurrentUser(data);
        handler(true);
    }

    this.logout = function() {
        destroyCurrentUser()
    }

    setCurrentUser = function(data) {
        delete data.password;
        delete data.password_digest;
        session.save({ currentUser: data });
    }

    destroyCurrentUser = function() {
        session.save(null);
        wicache.clear();
        $window.location.reload();
    }

    this.isUserValid = function() {
        var currentUser = session.currentUser()
        return currentUser !== undefined && currentUser !== null;
    }
})