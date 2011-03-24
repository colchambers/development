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
  // Query language examples configured with the UI
data.query = new google.visualization.Query(data.url);
data.query.setQuery(data.statement);
  sendAndDraw();
}