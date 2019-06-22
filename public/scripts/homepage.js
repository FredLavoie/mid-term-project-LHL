//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function() {

  loadMapName();

});

//******************************* FUNCTIONS ***********************************/
//*****************************************************************************/

// append each point to points-container
function renderMapName(mapNames) {
  for(let mapKey of mapNames) {
    // console.log("mapkey is: ", mapKey);
    // console.log('This is the map id for the point: ' + mapKey.title);
    let returnedPoint = createMapElement(mapKey.title, mapKey.id);
    $('#map_container').prepend(returnedPoint);

  }
}

// create HTML for points in sidebar
function createMapElement(title, id) {

  // assign point information to variables
  let titleOfMap = title;
  let idOfMap = id;
  // console.log("title", title);

  // <a class="btn btn-primary" href="#" role="button">Link</a>

  // create all tags to be appended and assign the values where needed
  let $button = $('<a>').attr('href', `/maps/${idOfMap}`).attr('role', 'button').addClass('btn btn-primary btn-lg btn-block').text(titleOfMap);

  return $button;
}

// fetch points from database (points table)
function loadMapName(map){
  $.ajax({
    method: 'GET',
    url: '/maps'
  })
    .then(function (data) {
      // console.log(data);
      renderMapName(data, map);
    });
}


