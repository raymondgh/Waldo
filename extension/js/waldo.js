var app = angular.module('Waldo', []);

app.controller('ChromeTab', ['$scope', 'IDOLService', function($scope, IDOLService) {
    $scope.test = "Hello World";
    $scope.currentUrl = "";
    // chrome.tabs.getSelected(windowId, function(tab) {
    //     console.log("current:"+tab.url);
    //     $scope.currentUrl = tab.url;
    // });

    $scope.findSimilar = function() {
        var testURL = "http://automatic.com";
        var indexName =  "news_eng";
        IDOLService.findSimilar($scope.currentUrl, indexName)

        .success(function(res) {
            console.log("Success: finding similar of URL " + $scope.currentUrl + " in index " + indexName + ". " );
            console.log(res);
        });
    };

    $scope.createIndex = function() {
        var indexName =  "news_eng";
        IDOLService.createIndex(indexName)

        .success(function(res) {
            console.log("Success: connecting to Create Text Index API : " + indexName + ". ");
            console.log(res);
        });
    };

    $scope.addIndex = function() {
        var indexName =  "news_eng";
        IDOLService.addIndex($scope.currentUrl, indexName)

        .success(function(res) {
            console.log("Success: connecting to Add to Text Index API : " + indexName + " with URL : " + $scope.currentUrl);
            console.log(res);
        });
    };

}]);

app.factory('IDOLService', function($http) {

    var service = {},
        api = {
            key: "541a94d3-1528-4cc2-928d-4f05ef7f7ae2",
            findSimilar: "https://api.idolondemand.com/1/api/sync/findsimilar/v1?",
            createIndex: "https://api.idolondemand.com/1/api/sync/createtextindex/v1?",
            addIndex: "https://api.idolondemand.com/1/api/sync/addtotextindex/v1?"
        };

    service.findSimilar = function(url, indexName) {

        var apiRequest = api.findSimilar
            .concat("&apiKey=").concat(api.key)
            .concat("&url=").concat(url)
            .concat("&indexes=").concat(indexName);

        console.log("Find Similar Request: " + apiRequest);
        return $http.get(apiRequest);
    };

    service.createIndex = function (indexName) {
        var apiRequest = api.findSimilar
            .concat("&apiKey=").concat(api.key)
            .concat("&flavor=explorer")
            .concat("&index=").concat(indexName);

        console.log("Create Index Request: " + apiRequest);
        return $http.get(apiRequest);

    };

    service.addIndex = function (url, indexName) {
        var apiRequest = api.findSimilar
            .concat("&apiKey=").concat(api.key)
            .concat("&url=").concat(url)
            .concat("&index=").concat(indexName);

        console.log("Add Index Request: " + apiRequest);
        return $http.get(apiRequest);
    };

    return service;
});