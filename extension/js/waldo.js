var app = angular.module('Waldo', []);

var pageuri = '';
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      pageuri = request.uri;
      chrome.extension.getBackgroundPage().location.reload();
      sendResponse({ uri: pageuri });
  });

app.controller('ChromeTab', ['$scope', 'IDOLService', 'ChromeService', function($scope, IDOLService, ChromeService) {
    $scope.test = "Hello World";
    $scope.currentUrl = "";
    $scope.bookmarksList = [];
    $scope.bmList = [];

    function processNode(node) {
        var bookmarks =  [] ;

        if(node.children) {
            node.children.forEach(function(child) { 
                bookmarks = bookmarks.concat(processNode(child)); 
            });
        } else {
            addIndex(node.url, indexName);
            bookmarks.push(node.url);   
        }

        return bookmarks;
    }

    function getBookmarks() {
        // var list = ChromeService.getBookmarks();
        var list = [];
        chrome.bookmarks.getTree(function(itemTree){
            itemTree.forEach(function(item){
                list = list.concat(processNode(item));
            });
        });        
    };

    function findSimilar(indexName) {
        
        // var testURL = "http://automatic.com";
        // var indexName =  "news_eng";
        IDOLService.findSimilar($scope.currentUrl, indexName)

        .success(function(res) {
            console.log("Success: finding similar of URL " + $scope.currentUrl + " in index " + indexName + ". " );
            console.log(res);
             $scope.$apply(function() {
                $scope.bmList = res;

            });
                             $scope.bmList = res;
                             chrome.tabs.executeScript(null, { code: "InjectSimilarStuff("+JSON.stringify(res)+");" });
        })
        .error(function(err) {
            $scope.$apply(function() {
                $scope.bmList = err;
            });
                            $scope.bmList = err;

        });
    };

    function createIndex(indexName) {
        // indexName =  "news_eng";
        IDOLService.createIndex(indexName)

        .success(function(res) {
            console.log("Success: connecting to Create Text Index API : " + indexName + ". ");
            console.log(res);
        });
    };

    function addIndex(url, indexName) {
        // var indexName =  "news_eng";
        IDOLService.addIndex(url, indexName)
        .success(function(res) {
            console.log("Success: connecting to Add to Text Index API : " + indexName + " with URL : " + url);
            console.log(res);
        });
    }


    var indexName = "Waldo";

    if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("lastname", "HTML 5 Supported");
        // Retrieve
        $scope.result = localStorage.getItem("lastname");
    } else {
        $scope.result = "Sorry, your browser does not support Web Storage...";
    }

    chrome.tabs.getSelected(null, function(tab) {
        // $scope.$apply(function() {
    $scope.currentUrl = tab.url; //pageuri;

        // });
          


            var createdIndex = localStorage.getItem("createdIndex");
            $scope.result = createdIndex;
            // createdIndex = false;
            // localStorage.setItem("createdIndex", false);    

            if ( !createdIndex ) {
                localStorage.setItem("createdIndex", true);    
                createIndex(indexName);
                getBookmarks();
                $scope.gotBookmark = "true";
            }

            indexName = "news_eng";
            $scope.findingSim = "Finding Similar";
            findSimilar(indexName);

    });

}]);

app.factory('ChromeService', function() {

    var service = {};


    service.processNode = function (node) {
        var bookmarks = [];
        if(node.children) {
            node.children.forEach(function(child) { 
                bookmarks.concat(processNode(child)); 
            });
        } else {
            bookmarks.push(node.url);   
        }

        return bookmarks;
    };

    service.getBookmarks = function() {
        chrome.bookmarks.getTree(function(itemTree){
            // itemTree.forEach(function(item){
            //     bookmarkList.concat(processNode(item));
            //     alert(bookmarkList);
            // });

            return itemTree;
        });
    };

    return service;
});

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
            .concat("&indexes=").concat(indexName).concat("&max_results=4");

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