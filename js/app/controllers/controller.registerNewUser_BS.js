/**
 * This controller use for Bootstrap styled form
 */
define(
    [
        'jquery',
        'angular',
        'appModule',
        'maskInput',
        'jqueryAutoComplete'
    ],
    function ($, angular, app) {

        'use strict';

        app.controller('registerNewUserController_BS',function ($http, $scope) {
            var self = this, props = {},
                inputs = getElements($("[data-register]"),'register');

            self.changePhoneCode = changePhoneCode;
            self.registerUser  = registerUser;
            $scope.user = {};
            prepareForm();

            /**
             * Load list of professions from JSON file or API
             * And after that we put some data in models and init phone mask
             */
            function prepareForm() {
                $http.get('js/app/storage/data.json').success(function (response) {
                    $scope.props = $.extend(
                        {phoneCodes:response.codes},
                        {phoneCode:response.codes[0].sign}
                    );
                    // Init some jquery plugins
                    props.code = $scope.props.phoneCodes[0].code;
                    props.mask = $scope.props.phoneCodes[0].mask;
                    $(inputs['phone']).mask(props.mask,{placeholder:props.code});
                    $("[data-watch='input']").html(props.code);
                    //
                    var mask    = '+7 495 123-45-67',
                        mask_arr = mask.split(''),
                        values  = '';

                    $('body').on('keydown',inputs['phone'],function (e) {
                        setTimeout(function () {
                            var elems = $(inputs['phone']).val().split(''), index;
                            if (elems.length == 0) {
                                $("[data-watch='input']").html(mask);
                            }
                            for (var i = 0; i < elems.length; i++) {
                                values += elems[i];
                                index = i;
                            }
                            for (var k = index+1; k < mask_arr.length; k++) {
                                values += mask_arr[k];
                            }
                            $("[data-watch='input']").html(values);
                            values = ''; elems = [];
                        },3)
                    });
                    //
                    //
                    $(inputs['profession']).autocomplete({
                        lookup:response.professions,
                        autoSelectFirst:true,
                        appendTo:$('#query_result'),
                        onSelect: function (profession) {
                            $scope.user.profession = profession.value;
                        }
                    });
                });
            }

            /**
             *
             * @param els
             * @param mask
             * @returns {{}}
             */
            function getElements(els,mask) {
                var obj = {};
                $.each(els,function (index, item) {
                    var name = $(item).data(mask);
                    if (name != undefined) {
                        obj[name] = item;
                    }
                });
                return obj;
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
                $(inputs['phone']).prop({value:'',placeholder:''});
                props.code = $scope.props.phone.code;
                $(inputs['phone']).mask(props.code,{placeholder:props.code});
                $("[data-watch='input']").html(props.code);
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