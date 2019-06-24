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
  let $article = $('<article>').addClass('mapFav');
  let $button = $('<a>').attr('href', `/maps/${idOfMap}`).attr('role', 'button')
  .addClass('btn btn-primary btn-lg btn-block').attr('id','mapTitle').text(titleOfMap);

  let $favButton = $('<button>').attr('type', 'button').addClass('btn btn-default btn-sm');
  let $addSpan = $('<span>').addClass("glyphicon glyphicon-star")
  
  $favButton.append($addSpan).text('Favourite');

  $article
        .append($button)
        .append($favButton);

  //<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-star"></span> Favorite</button>

    
  return $article;
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


