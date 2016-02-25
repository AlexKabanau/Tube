/*var form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    onClientLoad();
    event.preventDefault();
  });


  function showNewItems () {
    var addTransform = document.body.getElementsByClassName('container');
      addTransform[1].style.transform = 'translate(-450px)';
document.getElementById("buttonReSearch").addEventListener("click", function() {
    window.onload = showNewItems();
    
 });
*/
(function addElements(){

var main = document.createElement('main');


var container = document.createElement('div');
    container.className = 'container';
var inputSearch = document.createElement('input');
    inputSearch.id = 'search';
    inputSearch.type = 'search';
    inputSearch.setAttribute('value', '');
    inputSearch.placeholder = "Я ищу...";
    
    container.appendChild(inputSearch);

var buttonSearch = document.createElement('button');
    buttonSearch.id = 'buttonSearch';
    buttonSearch.innerHTML = 'Поиск';

    container.appendChild(buttonSearch);

main.appendChild(container);

document.body.appendChild(main);

})()

document.getElementById('search').focus();



document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
      onClientLoad();
      event.preventDefault();
    }
});
document.getElementById("buttonSearch").addEventListener("click", function() {
      onClientLoad();
    });


function makeCounter() {
      var current = 1;
      return function() {return current++;};
    }
var counter = makeCounter();

function showItems(counter) {
    var reSearch = document.body.getElementsByClassName('container');
    var widthClient = counter()*0.9*document.documentElement.clientWidth;
      reSearch[1].style.transform = 'translate(-' + widthClient + 'px)';

}

function showResponse(elements) {
    

var article = document.createElement('article');
var container = document.createElement('div');
  container.className = 'container';
 // container.style.width = 300 + '%';
  
  
  for (var i=0; i<15; i++){
    var galleryItem = document.createElement('div');
    galleryItem.className = 'galleryItem';
    container.appendChild(galleryItem);
    ////////style();////////
    var widthClient = 0.9*document.documentElement.clientWidth;
    var nCol = (widthClient - (widthClient % 300))/300;/*nunmer of column*/
    if (nCol>5) {nCol = 5};
    var widthItem = widthClient/(nCol) - 3*2/**/;/*10=5px*2padding*/
    if (widthItem<300) {widthItem = 300};
    galleryItem.style.width = (widthItem) + 'px'; 

    var a = document.createElement('a');
    a.href = 'https://www.youtube.com/watch?v='+elements.items[i].id;
    galleryItem.appendChild(a);

    var h4 = document.createElement('h4');
    h4.innerHTML = elements.items[i].snippet.title;
    a.appendChild(h4);

    var img = document.createElement('img');
    img.src = elements.items[i].snippet.thumbnails.high.url;
    a.appendChild(img); 

    var p = document.createElement('p');
    p.innerHTML = elements.items[i].snippet.description;
    galleryItem.appendChild(p); 

    var aChanel = document.createElement('a');
    aChanel.href = 'http://www.youtube.com/channel/'+elements.items[i].snippet.channelId;
    galleryItem.appendChild(aChanel);

    var h5 = document.createElement('h5');
    h5.innerHTML = elements.items[i].snippet.channelTitle;
    aChanel.appendChild(h5);

    var h5 = document.createElement('h5');
    h5.class = 'viewCount';
    h5.innerHTML = 'Просмотров: '+elements.items[i].statistics.viewCount;
    galleryItem.appendChild(h5);
    
    var h6 = document.createElement('h6');
    h6.class = 'likeCount';
    h6.innerHTML = 'Liks: '+elements.items[i].statistics.likeCount;
    galleryItem.appendChild(h6);
    
  }
  article.appendChild(container);
  document.body.appendChild(article)

  var buttonNext = document.createElement('button');
    buttonNext.id = 'buttonNext';
    buttonNext.innerHTML = 'Далее';
    buttonNext.style = 'position: relative; left: 100%; margin-left: -80px;'



    document.body.appendChild(buttonNext);

    document.getElementById("buttonNext").addEventListener("click", function(event) {
      showItems(counter);
    //  event.preventDefault();
    });

}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyDydcKXefY4Zcn0m4fFybaEIK0pw-bJtTs');
    searchYouTube();
}

function searchYouTube() {
    var search = document.getElementById('search').value;
    if (search != ''){
    var request = gapi.client.youtube.search.list({
        part: 'id, snippet',
        maxResults: 15,
        q: search
    });
    request.execute(loadStats);
    };
}

function loadStats(searchResult) { 
var videoIds = []; 

//Collect Ids from search items
searchResult.items.map(function(i){ 
videoIds.push(i.id.videoId); 
}); 

//New request for statistics
var request = gapi.client.youtube.videos.list({ 
part: 'snippet, statistics', 
id: videoIds.join(',') 
}); 

//Show results with rich data
request.execute(showResponse); 
}
