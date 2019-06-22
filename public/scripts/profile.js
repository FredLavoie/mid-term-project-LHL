//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function() {
  let userNum = window.location.pathname;

  // loadFavourites(userNum);
  // loadContributions(userNum);

});

//****************************** FAVOURITES ***********************************/
//*****************************************************************************/

// // append each item to favourites
// function renderFavourites(data) {
//   let favourites = data.favourites;
//   for(let fav of favourites) {
//     let returnedFav = createFavouritesElement(fav);
//     $('#favourites').prepend(returnedFav);
//   }
// }

// // create HTML for favourites list
// function createFavouritesElement(fav) {
//   let title = fav.title;
//   console.log(title);
//   // create all tags to be appended and assign the values where needed
//   let $article = $('<article>').addClass('TEMP');
//   let $title = $('<h5>').addClass('favourites').text(title);

//   // append all tags in reverse order (starting with furthest nested tags)
//   $($article).append($title);

//   return $article;
// }

// fetch favourites from database (favourites table)
function loadFavourites(userNum){

  $.ajax({
    method: 'GET',
    url: userNum
  })
    .then(function (data) {
      // renderFavourites(data);
    });
}

//***************************** CONTRIBUTIONS *********************************/
//*****************************************************************************/


// // append each item to contributions
// function renderContributions(data) {
//   let contributions = data.contributions;

//   for(let con of contributions) {
//     let returnedCon = createContributionsElement(con);
//     $('#contributions').prepend(returnedCon);
//   }

// }

// // create HTML for contributions list
// function createContributionsElement(con) {

// }

// fetch favourites from database (favourites table)
function loadContributions(userNum){
  $.ajax({
    method: 'GET',
    url: userNum
  })
    .then(function (data) {
      // renderContributions(data);
    });
}
