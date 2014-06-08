var app = angular.module('Waldo', []);

app.controller('ChromeTab', ['$scope', 'IDOLService', function($scope, IDOLService) {
    $scope.test = "Hello World";

    $scope.testButton = function() {
        var testURL = "http://automatic.com";
        IDOLService.findSimilar(testURL).success(function(res) {
            console.log(res);
        });
    }
}]);

app.factory('IDOLService', function($http) {

    var service = {},
        api = {
            key: "541a94d3-1528-4cc2-928d-4f05ef7f7ae2",
            findSimilar: "https://api.idolondemand.com/1/api/sync/findsimilar/v1?",
            createIndex: "https://api.idolondemand.com/1/api/sync/createtextindex/v1?",
            addIndex: "https://api.idolondemand.com/1/api/sync/addtotextindex/v1?"
        };

    service.findSimilar = function(url) {

        var apiRequest = api.findSimilar
            .concat("&apiKey=").concat(api.key)
            .concat("&url=").concat(url)
            .concat("&indexes=").concat("news_eng");

        console.log(apiRequest);

        return $http.get(apiRequest);
    };

    return service;
});