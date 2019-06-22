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
    console.log("mapkey",mapKey);
    
    console.log('This is the map id for the point: ' + mapKey.title);;

    

      let returnedPoint = createMapElement(mapKey.title);
      $('#map_container').prepend(returnedPoint);
    
  }
}

// create HTML for points in sidebar
function createMapElement(point) {

  // assign point information to variables
  let title = point;
  console.log("title", title)
  
  // create all tags to be appended and assign the values where needed

   let $button = $('<button>').attr('type', 'button').addClass('btn btn-primary btn-lg btn-block').text(title);


  return $button;
}

// fetch points from database (points table)
function loadMapName(map){
  $.ajax({
    method: 'GET',
    url: '/maps'
  })
    .then(function (data) {
      console.log(data)
      renderMapName(data, map);
    });
}


