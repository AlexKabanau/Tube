
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

function slider () {

    var slider = document.body;
    slider.onmousedown = function(event){
        var shiftX = event.clientX;
        slider.onmouseup = function(event){
            var upX = event.clientX;
            if ((shiftX-upX)>100){
                showItemsNext();
            } else if ((shiftX-upX)<-100){
                showItemsPrevious();
            }
        }
    }
    slider.ondragstart = function() {
      return false;
    };
}

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




function showItemsNext() {
    for (var i=0; i<document.getElementsByClassName('container')[1].childNodes.length; i++){var elementes = document.getElementsByClassName('galleryItem'); if (elementes[i].getBoundingClientRect().left>document.documentElement.clientWidth*0.9){var next = i; break;}};
    var reSearch = document.body.getElementsByClassName('container');
    nCol = (0.9*document.documentElement.clientWidth - (0.9*document.documentElement.clientWidth % 300))/300;
    var widthClient = next*0.9*document.documentElement.clientWidth/nCol;
      reSearch[1].style.transform = 'translate(-' + widthClient + 'px)';
}

function showItemsPrevious() {
    for (var i=(document.getElementsByClassName('container')[1].childNodes.length)-1; i>=0; i--){var elementes = document.getElementsByClassName('galleryItem'); if (elementes[i].getBoundingClientRect().left < 0){var previous = i+1; break;}};
    var reSearch = document.body.getElementsByClassName('container');
    nCol = (0.9*document.documentElement.clientWidth - (0.9*document.documentElement.clientWidth % 300))/300;
    var widthClient = (previous-nCol)*0.9*document.documentElement.clientWidth/nCol;
      reSearch[1].style.transform = 'translate(-' + widthClient + 'px)';
}


function showResponse(elements) {
    

var article = document.createElement('article');
var teil = document.createElement('div');
    teil.className = 'teil';
var container = document.createElement('div');
  container.className = 'container';
 // container.style.width = 300 + '%';
  
    ////////style();////////
    var widthClient = 0.9*document.documentElement.clientWidth;
    window.onresize = function ()
{
    alert('Размер окна был изменен!');
    widthClient = 0.9*document.documentElement.clientWidth;
}
    var nCol = (widthClient - (widthClient % 300))/300;/*nunmer of column*/
    if (nCol>5) {nCol = 5};
    var widthItem = widthClient/(nCol) - 3*2/**/;/*6=3px*2padding*/
    if (widthItem<300) {widthItem = 300};
  
  
  for (var i=0; i<elements.items.length; i++){
    var galleryItem = document.createElement('div');
    galleryItem.className = 'galleryItem';
    galleryItem.style.width = (widthItem) + 'px';
    container.appendChild(galleryItem);

     

    var a = document.createElement('a');/*https://www.youtube.com/watch?v=Ukg_U3CnJWI*/
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
  teil.appendChild(container);
  article.appendChild(teil);
  document.body.appendChild(article)

  var buttonNext = document.createElement('button');
    buttonNext.id = 'buttonNext';
    buttonNext.innerHTML = 'Далее';
    buttonNext.style = 'position: relative; left: 100%; margin-left: -80px;'

    document.body.appendChild(buttonNext);

    document.getElementById("buttonNext").addEventListener("click", function(event) {
      showItemsNext();
    });

    var buttonPrevious = document.createElement('button');
    buttonPrevious.id = 'buttonPrevious';
    buttonPrevious.innerHTML = 'Назад';
    buttonPrevious.style = 'position: relative; margin-left: 20px;'

    document.body.appendChild(buttonPrevious);

    document.getElementById("buttonNext").addEventListener("click", function(event) {
      showItemsNext();
    });

    document.getElementById("buttonPrevious").addEventListener("click", function(event) {
      showItemsPrevious();
    });

    slider();

}

function onClientLoad() {
    if (document.querySelector('article')!=null) {
        var removeArticle = document.querySelector('article');
        var removeBottons = document.querySelectorAll('button');
        removeArticle.parentNode.removeChild(removeArticle);
        removeBottons[2].parentNode.removeChild(removeBottons[2]);
        removeBottons[1].parentNode.removeChild(removeBottons[1]);
};
    
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
