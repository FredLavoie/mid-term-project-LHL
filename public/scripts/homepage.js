//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function(event) {

  loadMapName();
  event.preventDefault();

});

//******************************* FUNCTIONS ***********************************/
//*****************************************************************************/

// append each point to points-container
function renderMapName(mapNames) {
  for(let mapKey of mapNames) {
    // console.log("mapkey is: ", mapKey);
    // console.log('This is the map id for the point: ' + mapKey.title);
    let returnedPoint = createMapElement(mapKey.title, mapKey.id);
    // event.preventDefault();
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
  let $favButton = $('<button>').attr('type', 'submit').addClass('btn btn-default');
  let $addSpan = $('<span>').addClass("glyphicon glyphicon-heart");
  let $form = $('<form>').attr('method', 'POST').attr('action', `/maps/${idOfMap}/favourites/new`);

  $favButton.append($addSpan).text('Favourite');

  $form.append($favButton);

  $article
    .append($button)
    .append($form);

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


