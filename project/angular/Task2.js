var app = angular.module('myValidForm', []);

app.directive('ageValid', function() {
    var re = /^1[8-9]$|^[2-5]\d$|^6[0-5]$/;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            
            ctrl.$validators.integer = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (re.test(viewValue)) {
                    return true;
                }
                return false;
            };
        }
    };
});

app.directive('nameValid', function() {
    var re = /^[A-Z][a-z]{3,}$/;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            
            ctrl.$validators.name = function (modelValue, viewValue) {  
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (re.test(viewValue)) {
                    return true;
                }
                return false;
            };
        }
    };
});

app.directive('dateValid', function() {
    var re = /^[0-9]{3}[1-9]\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {  
            ctrl.$validators.dating = function (modelValue, viewValue) {  
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (re.test(viewValue)) {
                    return true;
                }
                return false;
            };
        }
    };
});