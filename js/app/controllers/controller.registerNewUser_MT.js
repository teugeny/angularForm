/**
 * This controller use for AngularMaterial styled form
 */
define(
    [
        'jquery',
        'appModule',
        'maskInput'
    ],
    function ($,app) {

        'use strict';

        app.controller('registerNewUserController_MT', function ($timeout, $q, $http, $scope) {
            var self = this;
            self.querySearch = querySearch;
            self.selectedItemChange = selectedItemChange;
            self.changePhoneCode = changePhoneCode;
            self.registerUser  = registerUser;
            $scope.user = {};
            prepareForm();

            /**
             * Base function to search matches
             * @param query
             * @returns {Promise}
             */
            function querySearch(query) {
                var results = query ? self.professions.filter(createFilterFor(query)) : self.professions, deferred;
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            }

            /**
             * This methods calls when user choice a profession from searched list
             * Then we put a result to user model
             * @param item
             */
            function selectedItemChange(item) {
                $.extend($scope.user,{profession:item.value});
            }

            /**
             * Switch phone code mask when country flag selected
             */
            function changePhoneCode() {
                $.each($scope.props.phoneCodes,function (index, item) {
                    if ($scope.props.phoneCode == item.sign) {
                        $scope.props.phone = item;
                    }
                });
                $("[data-app='phone']").val();
            }

            /**
             * Load list of professions from JSON file or API
             * And after that we put some data in models and init phone mask
             */
            function prepareForm() {
                $http.get('js/app/storage/data.json').success(function (response) {
                    $scope.props = $.extend(
                        response,
                        {phoneCodes:response.codes},
                        {phoneCode:response.codes[0].sign});

                    self.professions = response.professions.map(function(profession){
                        return {
                            value:profession
                        }
                    });
                    $("[data-app='phone']").mask($scope.props.phoneCodes[0].mask);
                });
            }

            /**
             * And this magic method we lock matches
             * Of cause we use Lowercase because user can type profession like Dev or dev
             * @param query
             * @returns {filterFn}
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(profession) {
                    return angular.lowercase(profession.value).indexOf(lowercaseQuery) === 0;
                };
            }

            /**
             * And at last the method of register new user.
             * Here we can use $http.put() to send data to the server
             */
            function registerUser() {
                console.log($scope.user);
            }
        });
    }
);