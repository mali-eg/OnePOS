/* Pages Name and urls configruations  */
(function() {
//     var partialsFolder = '/angular-assets/partials/';
    var partialsFolder = '/assets/javascripts/app/partials/';
    this.partialsConfig = {
        layouts: {
            login: partialsFolder + 'layouts/login.html',
        },
        login: {
            index: partialsFolder + 'login/index.html',
            mtan: partialsFolder + 'login/mtan.html',
            passwordForgot: partialsFolder + 'login/passwordForgot.html',
            passwordReset: partialsFolder + 'login/passwordReset.html',
            unauthorizedUser: partialsFolder + 'login/unauthorizedUser.html',
        }

    };
}).call(this);
