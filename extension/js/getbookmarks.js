
function processNode(node) {
	var bookmarks = [];
	if(node.children) {
		node.children.forEach(function(child) { 
			bookmarks.concat(processNode(child)); 
		});
	} else {
	    bookmarks.push(node.url);	
	}

	return bookmarks;
}

function getbookmarks() {
	var bookmarks = [];
	chrome.bookmarks.getTree(function(itemTree){
		itemTree.forEach(function(item){
			bookmarks.concat(processNode(item));
			console.log(bookmarks);
		});

		return bookmarks;
	});
	
}