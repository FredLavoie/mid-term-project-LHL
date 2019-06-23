//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function() {
  let userNum = window.location.pathname;

  // loadFavourites(userNum);
  // loadContributions(userNum);

});

//****************************** FAVOURITES ***********************************/
//*****************************************************************************/

// fetch favourites from database (favourites table)
function loadFavourites(userNum){

  $.ajax({
    method: 'GET',
    url: userNum
  })
    .then(function (data) {
    });
}

//***************************** CONTRIBUTIONS *********************************/
//*****************************************************************************/


// fetch favourites from database (favourites table)
function loadContributions(userNum){
  $.ajax({
    method: 'GET',
    url: userNum
  })
    .then(function (data) {
    });
}
