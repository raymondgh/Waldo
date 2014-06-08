var uri = 'https://api.idolondemand.com/1/api/sync/createtextindex/v1?apikey=c50a67b4-1753-439c-bcb5-c72e5363253d&index=test&flavor=standard';

var textIndexKey;

function createTestIndex() {
    $.ajax({
        url: uri,
        type: "GET",
        crossDomain: true,
    }).done(function (msg) {
        console.log(msg);
    });
}

function storeDocument() {

}

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
  '<iframe id="' + iframeId + '" scrolling="no" frameborder="0" allowtransparency="false" ' +
    'style="background-color:white;position: fixed; width: 20%;border:none;z-index: 2147483647; top: 0px;' +
           'height: ' + height + ';right: 0px;filter:alpha(opacity=50);opacity: 0.50;">' +
  '</iframe>'
);
document.getElementById(iframeId).contentDocument.body.innerHTML =
  '<style type="text/css">\
    html, body {          \
      height: '+ height + '; \
      width: 100%;        \
      z-index: 2147483647;\
    }                     \
  </style>                \
  <p>Test Sidebar text!</p>';