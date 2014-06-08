var uri = 'https://api.idolondemand.com/1/api/sync/createtextindex/v1?apikey=c50a67b4-1753-439c-bcb5-c72e5363253d&index=news_eng&flavor=standard';

var textIndexKey = 'news_eng';

//function createTestIndex() {
//    $.ajax({
//        url: uri,
//        type: "GET",
//        crossDomain: true,
//    }).done(function (msg) {
//        console.log(msg);
//    });
//}
//createTestIndex();

//function addBookmarkToIndex() {
//    $.ajax({
//        url: uri,
//        type: "GET",
//        crossDomain: true,
//    }).done(function (msg) {
//        console.log(msg);
//    });
//}

//console.log(window.location.href);
chrome.runtime.sendMessage({ uri: window.location.href }, function (response) {
    //console.log(response.farewell);
    console.log(response.uri);
});

//height of top bar, or width in your case
var height = '100%';

//resolve html tag, which is more dominant than <body>
var html;
if (document.documentElement) {
    html = $(document.documentElement); //just drop $ wrapper if no jQuery
} else if (document.getElementsByTagName('html') && document.getElementsByTagName('html')[0]) {
    html = $(document.getElementsByTagName('html')[0]);
} else if ($('html').length > -1) {//drop this branch if no jQuery
    html = $('html');
} else {
    alert('no html tag retrieved...!');
    throw 'no html tag retrieved son.';
}
//position
if (html.css('position') === 'static') { //or //or getComputedStyle(html).position
    html.css('position', 'relative');//or use .style or setAttribute
}

//top (or right, left, or bottom) offset
var currentTop = html.css('top');//or getComputedStyle(html).top
if (currentTop === 'auto') {
    currentTop = 0;
} else {
    currentTop = parseFloat($('html').css('top')); //parseFloat removes any 'px' and returns a number type
}

var iframeId = 'waldoSidebar';
if (document.getElementById(iframeId)) {
    alert('id:' + iframeId + ' taken please dont use this id!');
    throw 'id:' + iframeId + ' taken please dont use this id!';
}

html.append(
  '<style type="text/css">\
    .arrow-right {\
        width: 0;\
        height: 0; \
    border-top: 10px solid transparent;\
    border-bottom: 10px solid transparent; \
    border-left:10px solid blue;\
}\
    .arrow-left {\
        width: 0;\
        height: 0; \
    border-top: 10px solid transparent;\
    border-bottom: 10px solid transparent; \
    border-right:10px solid blue;\
}\
  </style>                \
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>\
<div id="sidebarExpander"  onclick="$(\'#waldoSidebar\').width() ? $(\'#waldoSidebar\').css(\'width\', \'0px\') : $(\'#waldoSidebar\').css(\'width\', \'20%\');$(\'#waldoSidebar\').width() ? $(\'#sidebarExpander\').css(\'width\', \'22%\') : $(\'#sidebarExpander\').css(\'width\', \'20px\');localStorage.waldoSidebar = $(\'#waldoSidebar\').width();" style="background-color:#009DDC;position: fixed; width: 22%;border:none;z-index: 2147483647; top: 0px;' +
           'height: ' + height + ';right: 0px;filter:alpha(opacity=50);opacity: 0.50;"></div>\
<script>localStorage.waldoSidebar != 0 ? $(\'#waldoSidebar\').css(\'width\', \'20%\') : $(\'#waldoSidebar\').css(\'width\', \'0px\');localStorage.waldoSidebar != 0 ? $(\'#sidebarExpander\').css(\'width\', \'22%\') : $(\'#sidebarExpander\').css(\'width\', \'20px\');</script>\
  <iframe id="' + iframeId + '" scrolling="no" frameborder="0" allowtransparency="true" ' +
    'style="background-color:#009DDC;position: fixed; width: 20%;border:none;z-index: 2147483647; top: 0px;' +
           'height: ' + height + ';right: 0px;filter:alpha(opacity=80);opacity: 0.8;">' +
  '</iframe>'
);

document.getElementById(iframeId).contentDocument.body.innerHTML =
  '<style type="text/css">\
    html, body {          \
      height: '+ height + '; \
      width: 100%;        \
      z-index: 2147483647;\
    }                     \
  </style>';

var similarStuff = {};

function InjectSimilarStuff(results) {
    
    var documents = results.documents;
    var docList = "";
    function printDocs(element, index, array) {
        docList = docList + '<a target="_top" href="' + element.reference + '" style="font-size: 16px;">' + element.title + '</a></br>';// + JSON.stringify(element.links) + '</br></br>';
        var kw = "<p style='font-size: 11px; margin-top: 3px;'>" ;
        function parseLinks(element2, index2, array2) {
            kw += element2.toLowerCase();
            if (index2 < array2.length-1) kw += ', ';
        }
        var links = element.links;//.foreach(parseLinks);
        links.forEach(parseLinks);
        docList += kw + "</p>" + '</br></br>';
    }
    documents.forEach(printDocs); //TODO: make this more conservative on parse api calls

    document.getElementById(iframeId).contentDocument.body.innerHTML =
  '<style type="text/css">\
    html, body {          \
      height: '+ height + '; \
      width: 100%;        \
      z-index: 2147483647;\
      font-size:smaller;\
    }                     \
a {\
font-size:small;\
color: #FFFFFF;\
text-decoration: none;\
font-family:Arial,"Times New Roman",Georgia,Serif;\
}\
  </style>                \
      ' + docList + '<div style="bottom:0;text-align:center;position:absolute;width:100%;font-size:30px; color: white;">WALDO</div>';
}