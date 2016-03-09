
(function (){

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




function showItemsNext() {
    for (var i=0; i<document.getElementsByClassName('container')[1].childNodes.length; i++) {
        var elementes = document.getElementsByClassName('galleryItem');
        if (elementes[i].getBoundingClientRect().left>document.documentElement.clientWidth*0.9) {
            next = i; break;
        }
    };
    widthClientWindow();

    var container = document.body.getElementsByClassName('container');
    widthClient = next*0.9*document.documentElement.clientWidth/nCol;
    container[1].style.transform = 'translate(-' + widthClient + 'px)';
    for (var i=0; i<document.querySelectorAll('label').length; i++){
        document.querySelector('label[for="btn-'+ i + '"]').style.background = '#ccc';
    }
    document.querySelector('label[for="btn-'+ (next/nCol) + '"]').style.background = '#666';
}

function showItemsPrevious() {
    for (var i=document.getElementsByClassName('container')[1].childNodes.length-1; i>=0; i--) {
        var elementes = document.getElementsByClassName('galleryItem'); 
        if (elementes[i].getBoundingClientRect().left < 0) {
            previous = i+1; break;
        }
    };
    widthClientWindow();
    var container = document.body.getElementsByClassName('container');
    widthClient = (previous-nCol)*0.9*document.documentElement.clientWidth/nCol;
    container[1].style.transform = 'translate(-' + widthClient + 'px)';
    for (var i=0; i<document.querySelectorAll('label').length; i++){
        document.querySelector('label[for="btn-'+ i + '"]').style.background = '#ccc';
    }
    document.querySelector('label[for="btn-'+ ((previous/nCol)-1) + '"]').style.background = '#666';
}

function widthClientWindow () {
    widthClient=0;
    widthClient = 0.9*document.documentElement.clientWidth;
    nCol = (widthClient - (widthClient % 300))/300;/*number of column*/
    if (nCol > 5) {nCol = 5};
    widthItem = widthClient/(nCol)-3*2/**/;/*6=3px*2padding*/
    if (widthItem < 300) {
        nCol = nCol - 1;
        widthItem = widthClient/(nCol)-3*2;
    };
}

function showResponse(elements) {
    
    var article = document.createElement('article');

    var container = document.createElement('div');
        container.className = 'container';
    var fragment = document.createDocumentFragment();
     
    widthClientWindow();

    window.onresize = function() {   
        //alert('Размер окна был изменен!');
        widthClientWindow();
        var galleryItem = document.getElementsByClassName('galleryItem');
        for (var i=0; i<elements.items.length; i++){
            galleryItem[i].style.width = (widthItem) + 'px';
        };
        removeElements('[name=toggle]');
        removeElements('label');

        addLabels(elements);

        document.querySelector('label[for="btn-0"]').style.background = '#666';

    };

      for (var i=0; i<elements.items.length; i++){
        var galleryItem = document.createElement('div');
        galleryItem.className = 'galleryItem';
        galleryItem.style.width = (widthItem) + 'px';
        fragment.appendChild(galleryItem);
        
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
        h6.innerHTML = 'Likes: '+elements.items[i].statistics.likeCount;
        galleryItem.appendChild(h6);
        
      }
      container.appendChild(fragment);
      article.appendChild(container);
      document.body.appendChild(article);

      var buttonNext = document.createElement('button');
        buttonNext.id = 'buttonNext';
        buttonNext.innerHTML = 'Далее';
        buttonNext.style = 'position: relative; left: 100%; top: 27px; margin-left: -80px;';

        document.body.appendChild(buttonNext);

        document.getElementById("buttonNext").addEventListener("click", function(event) {
          showItemsNext();
        });

        var buttonPrevious = document.createElement('button');
        buttonPrevious.id = 'buttonPrevious';
        buttonPrevious.innerHTML = 'Назад';
        buttonPrevious.style = 'position: relative; margin-left: 20px; top: 27px;'

        document.body.appendChild(buttonPrevious);

        addLabels(elements);
        //addLabelClick(elements);
        /*window.onresize = function() {
            removeElements('[name=toggle]');
            removeElements('label');
            addLabels(elements);
        };*/

        

        

        document.querySelector('label[for="btn-0"]').style.background = '#666';

        document.getElementById("buttonNext").addEventListener("click", function(event) {
          showItemsNext();
        });

        document.getElementById("buttonPrevious").addEventListener("click", function(event) {
          showItemsPrevious();
        });

        slider();

}

function slider() {

    var slider = document;
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

function addLabels(videoElement){
    var fragmentRadio = document.createDocumentFragment();
    widthClientWindow();
    numberInput = (videoElement.items.length)/nCol;
    for (var i = 0; i < numberInput; i++) {
        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = 'btn-'+ i;
        radio.name = 'toggle';
        fragmentRadio.appendChild(radio);
    }
    var sliderControls = document.createElement('div');
        sliderControls.className = 'slider-controls';

    for (i = 0; i < numberInput; i++) {
        var label = document.createElement('label');
            label.htmlFor = 'btn-'+ i;

        sliderControls.appendChild(label);
    }

    fragmentRadio.appendChild(sliderControls);

    document.body.appendChild(fragmentRadio);
    addLabelClick(videoElement);
}

function addLabelClick(videoElement){
    widthClientWindow();
    numberInput = (videoElement.items.length)/nCol;
    labels = document.getElementsByTagName('label');
        for (i = 0; i < numberInput; i++) {
            function labelClick(arg) {
                labels[arg].addEventListener('click', function () {
                    for (j=0; j<numberInput; j++) {
                        document.querySelector('label[for="btn-'+ j + '"]').style.background = '#ccc';
                    }
                    widthClientWindow();
                    document.querySelector('label[for="btn-'+ arg + '"]').style.background = '#666';
                    document.body.getElementsByClassName('container')[1].style.transform = 'translate(-' + arg*widthClient + 'px)';
                });
            };
            labelClick(i);
        }
}



function removeElements(element){

    var removeElem = document.querySelectorAll(element);
    var lengthElem = removeElem.length;
    var i=0;
    if (element == 'button'){ i=1; };
    for (i; i<lengthElem; i++){
        removeElem[i].parentNode.removeChild(removeElem[i]);
    }
}

function onClientLoad() {

    if (document.querySelector('article')!=null) {
        removeElements('button');
        removeElements('[name=toggle]');
        removeElements('label');
        removeElements('article');
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
