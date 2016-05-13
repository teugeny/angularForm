define(
    [
        'angular',
        'appModule',
        'controllers/controller.registerNewUser_BS',
        'controllers/controller.registerNewUser_MT'
    ],
    function(angular,app){

        'use strict';

        app.config(function ($routeProvider) {
            $routeProvider
                .when('/',{
                    templateUrl:'js/app/views/page.home.html'
                })
                .when('/material',{
                    templateUrl:'js/app/views/form.material.register.html'
                })
                .when('/bootstrap',{
                    templateUrl:'js/app/views/form.bootstrap.register.html'
                })
        });

        return angular.bootstrap(document,['app']);
    }
);