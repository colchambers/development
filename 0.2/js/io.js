/*
 * refactored from embeddable chart. Defines basic input output functions. Needs refactoring to a class. 
 */

function sendAndDraw() {
  // Send the query with a callback function.
  data.query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  data.response = response;
drawVisualization(visualisationType);
}

function setQuery() {
    alert('setQuery');
  // Query language examples configured with the UI
data.query = new google.visualization.Query(data.url);
data.query.setQuery(data.statement);
  sendAndDraw();
}

function parseQueryString(){
	var href = $(location).attr('href');
	queryString = href.substring(href.indexOf('?')+1, href.length).toString();
	//alert('queryString  = '+queryString );
	var items = queryString.split("&");
	var item = null;
	for(var i=0; i<items.length; i++){
		item = items[i].split('=');
		//alert(item[0]+' = '+unescape(item[1]));;
		queryStringValues[item[0]]=unescape(item[1]);
	}
}