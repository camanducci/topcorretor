
var module = angular.module('poc', []);


function safeDigest(scope) {
    if(!scope.$$phase && !scope.$root.$$phase)
      scope.$digest();
}