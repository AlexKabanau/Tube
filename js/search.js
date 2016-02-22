/*var form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    onClientLoad();
    event.preventDefault();
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
      window.onload = onClientLoad();
      event.preventDefault();
    }
});
document.getElementById("buttonSearch").addEventListener("click", function() {
      window.onload = onClientLoad();
    });


function showNewItems () {
    var addTransform = document.body.getElementsByClassName('container');
      addTransform[1].style.transform = 'translate(-450px)';
      return false;
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
/*    var widthClient = document.documentElement.clientWidth;
    var nCol = (widthClient - (widthClient % 300))/300;/*nunmer of column*/
/*    var widthItem = 100/(nCol) - 4;/*4=2%*2padding*/
/*    if ((widthClient-nCol*(widthClient*0.02)/nCol)<300) {widthItem = 33.33};
    galleryItem.style.width = (widthItem) + '%'; 
*/
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

  var buttonReSearch = document.createElement('button');
    buttonReSearch.id = 'buttonReSearch';
    buttonReSearch.innerHTML = 'Вперед';
    

    document.body.appendChild(buttonReSearch);

    document.getElementById("buttonReSearch").addEventListener("click", function() {
    window.onload = showNewItems();
    
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