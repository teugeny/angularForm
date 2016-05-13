require.config({
    urlArgs: "myparam=" + (new Date()).getTime(),
    paths:
    {
        // VENDORS
        "jquery"        : "../vendors/jquery/jquery-2.1.4.min",
        "bootstrap"     : "../vendors/bootstrap/js/bootstrap.min",
        "angular"       : "../vendors/angular/angular",
        "ngAnimate"     : "../vendors/angular/angular-animate.min",
        "ngRoute"       : "../vendors/angular/angular-route",
        "ngAria"        : "../vendors/angular/angular-aria.min",
        "ngMessages"    : "../vendors/angular/angular-messages.min",
        "svgCache"      : "../vendors/angular/svg-assets-cache",
        "ngMaterial"    : "../vendors/angularMaterial/angular-material",

        // LOAD SOME JQUERY MODULES
        "maskInput"             : "../plugins/jquery.mask.min",
        "jqueryAutoComplete"    : "../plugins/jquery.autocomplete.min"
    },

    shim: {
        bootstrap:{
            deps:['jquery']
        },
        angular: {
            exports:'angular'
        },
        maskInput: {
            deps:['jquery']
        },
        jqueryAutoComplete: {
            deps:['jquery']
        },
        ngRoute: {
            exports: 'ngRoute',
            deps: ['angular']
        },
        ngAnimate: {
            deps: ['angular']
        },
        ngAria: {
            deps: ['angular']
        },
        ngMaterial: {
            exports: 'ngMaterial',
            deps: ['angular','ngAnimate','ngAria']
        }
    },

    deps: [
        './app'
    ]
});