
// sample call : https://api.idolondemand.com/1/api/sync/findsimilar/v1?&apiKey=541a94d3-1528-4cc2-928d-4f05ef7f7ae2&url=http://automatic.com&indexes=news_eng
function findSimilar(srcUrl, indexName) {
	var apiUrl = "https://api.idolondemand.com/1/api/sync/findsimilar/v1?";
	var apiKey = "541a94d3-1528-4cc2-928d-4f05ef7f7ae2";
	apiUrl += "&apiKey=" + apiKey + "&url=" + srcUrl + "&indexes=news_eng";

    $.ajax({
    url: apiUrl,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log("API URL " + apiUrl);
		  console.log("Success: finding similar of URL " + srcUrl + " in index " + indexName + ". " );
      	// console.log("Data 1 : " + data.documents);
    	return data.documents;
    },
    error: function (error) {
      alert("Error connecting to Find Similar API with source URL : "  + srcUrl + " : " + error);
    }});

}

function createIndex(indexName) {
	var apiUrl = "https://api.idolondemand.com/1/api/sync/createtextindex/v1?";
	var apiKey = "541a94d3-1528-4cc2-928d-4f05ef7f7ae2";
	apiUrl += "&apiKey=" + apiKey + "&index=" + indexName + "&flavor=explorer";	

    $.ajax({
    url: apiUrl,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
		console.log("Success: connecting to Create Text Index API : " + indexName + ". ");
      	return true;
    },
    error: function (error) {
      	alert("Error connecting to Create Text Index API : "  + indexName + ". Error: " + error);
      	return false;
    }});

}

function addIndex(srcUrl, indexName) {
	var apiUrl = "https://api.idolondemand.com/1/api/sync/addtotextindex/v1?";
	var apiKey = "541a94d3-1528-4cc2-928d-4f05ef7f7ae2";

	apiUrl += "&apiKey=" + apiKey + "&index=" + indexName + "&url=" + srcUrl;

    $.ajax({
    url: apiUrl,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
		console.log("Success: connecting to Add to Text Index API : " + indexName + " with URL : " + srcUrl);
      	return true;
    },
    error: function (error) {
      	alert("Error connecting to Create Text Index API : "  + indexName + " with URL : " + srcUrl + ". Error: " + error);
      	return false;
    }});
}