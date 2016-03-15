
(function (){

    var main = document.createElement('main');


    var container = document.createElement('div');
        container.className = 'container';
    var inputSearch = document.createElement('input');
        inputSearch.id = 'search';
        inputSearch.type = 'search';
        inputSearch.setAttribute('value', '');
        inputSearch.placeholder = "Я ищу...";
        inputSearch.addEventListener('keydown', function(event) {
            if (event.keyCode == 13) {
                clickSearch();
                event.preventDefault();
            }
        });

        container.appendChild(inputSearch);

    var buttonSearch = document.createElement('button');
        buttonSearch.id = 'buttonSearch';
        buttonSearch.innerHTML = 'Поиск';
        buttonSearch.addEventListener('click', function() {
            clickSearch();
        });

        container.appendChild(buttonSearch);

    main.appendChild(container);

    document.body.appendChild(main);

})()


var selectContainer;

document.getElementById('search').focus();


function clickSearch (){
    if (document.querySelector('article')!=null) {
        removeElements('button');
        removeElements('[name=toggle]');
        removeElements('label');
        removeElements('.slider-controls');
        removeElements('article');
    }
    showResponse();
    onClientLoad();
}


function showResponse() {

    window.onresize = function() {   
        widthClientWindow();
        var galleryItem = document.getElementsByClassName('galleryItem');

        for (var i=0; i<galleryItem.length; i++){
            galleryItem[i].style.width = (widthItem) + 'px';
        };
        
        removeElements('[name=toggle]');
        removeElements('label');

        addLabels(galleryItem);

        document.querySelector('label[for="btn-0"]').style.background = '#666';
    };

    var article = document.createElement('article');

    var container = document.createElement('div');
        container.className = 'container';

    widthClientWindow();

    article.appendChild(container);
    document.body.appendChild(article);

    addButtons();

    slider();
}

function showItemsNext() {
    selectContainer = document.getElementsByClassName('container')[1];
    selectContainerChildLength = selectContainer.childNodes.length;

    for (var i=0; i<selectContainerChildLength; i++) {
        var items = document.getElementsByClassName('galleryItem');
        if (items[i].getBoundingClientRect().left > document.documentElement.clientWidth * 0.9) {
            next = i; break;
        }
    };
    widthClientWindow();

    widthClient = next*0.9*document.documentElement.clientWidth/nCol;
    selectContainer.style.transform = 'translate(-' + widthClient + 'px)';
    labels = document.querySelectorAll('label');
    labelsLength = labels.length;
    
    for (var i = 0; i < labelsLength; i++){
        labels[i].style.background = '#ccc';
    }

    document.querySelector('label[for="btn-'+ (next/nCol) + '"]').style.background = '#666';
    
    if ((next/nCol) == labelsLength-2){
        penultLabelClick();
    };
}

function showItemsPrevious() {
    selectContainer = document.getElementsByClassName('container')[1];
    selectContainerChildLength = selectContainer.childNodes.length;

    for (var i = selectContainerChildLength - 1; i >= 0; i--) {
        var items = document.getElementsByClassName('galleryItem'); 
        if (items[i].getBoundingClientRect().left < 0) {
            previous = i + 1; break;
        }
    };
    widthClientWindow();

    widthClient = (previous - nCol) * 0.9 * document.documentElement.clientWidth / nCol;
    selectContainer.style.transform = 'translate(-' + widthClient + 'px)';
    labels = document.querySelectorAll('label');
    labelsLength = labels.length;

    for (var i = 0; i < labelsLength; i++){
        labels[i].style.background = '#ccc';
    }

    document.querySelector('label[for="btn-'+ ((previous/nCol)-1) + '"]').style.background = '#666';
}

function penultLabelClick(){
    penultLabel();
    //alert('сейчас удалится пэйджинг');
    removeElements('[name=toggle]');
    removeElements('label');
    removeElements('.slider-controls');
    //alert('удалил пэйджинг');
}

function widthClientWindow () {
    widthClient = 0;
    widthClient = 0.9 * document.documentElement.clientWidth;
    nCol = (widthClient - (widthClient % 300)) / 300;  //number of column
    if (nCol > 5) {nCol = 5};
    widthItem = widthClient/(nCol) - 3 * 2;    //6=3px*2padding
    if (widthItem < 300) {
        nCol = nCol - 1;
        widthItem = widthClient/(nCol) - 3 * 2;
    };
}

function addFragmentItems (elements) {

        var fragment = document.createDocumentFragment();
        container = document.getElementsByClassName('container')[1];
        length = elements.items.length; 
        
        for (var i = 0; i<length; i++){
            var galleryItem = document.createElement('div');
            galleryItem.className = 'galleryItem';
            galleryItem.style.width = (widthItem) + 'px';
            fragment.appendChild(galleryItem);

            var a = document.createElement('a');   //https://www.youtube.com/watch?v=Ukg_U3CnJWI
            a.href = 'https://www.youtube.com/watch?v=' + elements.items[i].id;
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
            aChanel.href = 'http://www.youtube.com/channel/' + elements.items[i].snippet.channelId;
            galleryItem.appendChild(aChanel);

            var h5 = document.createElement('h5');
            h5.innerHTML = elements.items[i].snippet.channelTitle;
            aChanel.appendChild(h5);

            var h5 = document.createElement('h5');
            h5.class = 'viewCount';
            h5.innerHTML = 'Просмотров: ' + elements.items[i].statistics.viewCount;
            galleryItem.appendChild(h5);

            var h6 = document.createElement('h6');
            h6.class = 'likeCount';
            h6.innerHTML = 'Likes: ' + elements.items[i].statistics.likeCount;
            galleryItem.appendChild(h6);

        }
          container.appendChild(fragment);
}

function addButtons(){
    var buttonNext = document.createElement('button');
        buttonNext.id = 'buttonNext';
        buttonNext.innerHTML = 'Далее';
        buttonNext.addEventListener("click", function(event) {
          showItemsNext();
        });

    document.body.appendChild(buttonNext);

    var buttonPrevious = document.createElement('button');
        buttonPrevious.id = 'buttonPrevious';
        buttonPrevious.innerHTML = 'Назад';
        buttonPrevious.addEventListener("click", function(event) {
          showItemsPrevious();
        });

    document.body.appendChild(buttonPrevious);
}

function slider() {

    var slider = document;
    slider.onmousedown = function(event){
        var shiftX = event.clientX;
        slider.onmouseup = function(event){
            var upX = event.clientX;
            if ((shiftX - upX) > 100){
                showItemsNext();
            } else if ((shiftX - upX) < -100){
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
    selectContainer = document.getElementsByClassName('container')[1];
    widthClientWindow();
    numberInput = (videoElement.length)/nCol;
    if (document.getElementsByClassName('container')[1]!=null) {
        numberInput = (document.getElementsByClassName('galleryItem').length)/nCol;
    };
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
    if (selectContainer.style.transform == ''){
        document.querySelector('label[for="btn-0"]').style.background = '#666';
    }
    addLabelClick(videoElement);
}

function addLabelClick(videoElement){
    widthClientWindow();
    numberInput = (videoElement.length)/nCol;
    if (document.getElementsByClassName('container')[1]!=null) {
        numberInput = (document.getElementsByClassName('galleryItem').length)/nCol;
    };
    labels = document.getElementsByTagName('label');
        for (i = 0; i < numberInput; i++) {
            function labelClick(arg) {
                labels[arg].addEventListener('click', function () {
                    for (j=0; j<numberInput; j++) {
                        document.querySelector('label[for="btn-'+ j + '"]').style.background = '#ccc';
                    }
                    //эвент лиснер тарген????
                    widthClientWindow();
                    document.querySelector('label[for="btn-'+ arg + '"]').style.background = '#666';
                    document.body.getElementsByClassName('container')[1].style.transform = 'translate(-' + arg*widthClient + 'px)';
                    if (arg == document.querySelectorAll('label').length-2){
                        penultLabelClick();
                    };
                });
            };
            labelClick(i);
            
        }
}

function penultLabel(){
    var newSearch = nextPageToken;
    searchYouTube(newSearch);
}

function removeElements(element){

    var removeElem = document.querySelectorAll(element);
    var lengthElem = removeElem.length;
    var i=0;
    if (element == 'button' || element == 'container'){ i=1; };
    for (i; i<lengthElem; i++){
        removeElem[i].parentNode.removeChild(removeElem[i]);
    }
}

function onClientLoad() {

    if (document.querySelectorAll('container')[1]!=null) {
        removeElements('container');
    };
    
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyDydcKXefY4Zcn0m4fFybaEIK0pw-bJtTs');
    searchYouTube(null);
}

function searchYouTube(page) {
    var search = document.getElementById('search').value;
    if (search != ''){
    var request = gapi.client.youtube.search.list({
        part: 'id, snippet',
        maxResults: 15,
        q: search,
        pageToken: page
    });
    // Send the request to the API server,
    // and invoke loadStats() with the response.
    request.execute(loadStats);
    };
}

function loadStats(searchResult) { 
    var videoIds = []; 
    nextPageToken = searchResult.nextPageToken;
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
    // Send the request to the API server,
    // and invoke showResponse() with the response.
    // Called automatically with the response of the YouTube API request.
    request.execute(saveResults); 
}

function saveResults (ResultOS){
    /*myResults =[];
    for (i=0; i<ResultOS.items.length; i++){
        myResults.push(ResultOS.items[i])
    };*/
    showElements(ResultOS);
}

function showElements (elements){
    addFragmentItems(elements);
    addLabels(elements.items);
}