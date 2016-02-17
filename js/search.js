function showResponse(elements) {
    
    var container = document.createElement('div');
  container.className = 'container';
  
  
  for (var i=0; i<15; i++){
    var galleryItem = document.createElement('div');
    galleryItem.className = 'galleryItem';
    container.appendChild(galleryItem);

    var a = document.createElement('a');
    a.href = 'https://www.youtube.com/watch?v='+elements.items[i].id;
    galleryItem.appendChild(a);

    var h4 = document.createElement('h4');
    h4.innerHTML = elements.items[i].snippet.title;
    a.appendChild(h4);

    var img = document.createElement('img');
    img.src = elements.items[i].snippet.thumbnails.default.url;
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
    
    /*var aChanel = document.createElement('a');
    aChanel.class = 'chanel';
    aChanel.href = 'http://youtube.com';
    galleryItem.appendChild(aChanel);*/

    var h5 = document.createElement('h5');
    h5.class = 'viewCount';
    h5.innerHTML = 'Просмотров: '+elements.items[i].statistics.viewCount;
    galleryItem.appendChild(h5);
    
    var h6 = document.createElement('h6');
    h6.class = 'likeCount';
    h6.innerHTML = 'Liks: '+elements.items[i].statistics.likeCount;
    galleryItem.appendChild(h6);
    
  }
  document.body.appendChild(container);

  
//  for (var i=0; i<2; i++){
    
  //    parentElement.appendChild(galleryItem);
    
 // };
        //container.className = 'container';
    /*for(...) container.appendChild(div);   // сначала вставить узлы
document.body.appendChild(ul); // затем в документ*/
   
        

 // parentElem.appendChild(container);
  
/*  var gallery = document.createElement('div');
    gallery.clasName = 'GalleryItem';
  parentElem.container.appendChild(gallery);*/
  
/*  var a = document.createElement('a');
  for (var i=0; i<=15; i++){
        a.href = response.items[i].snippet.thumbnails.default.url;
}
  
  var img = document.createElement('img');
  for (var i=0; i<=15; i++){
        img.src = response.items[i].snippet.thumbnails.default.url;
}*/
    
  
  //  result.innerHTML += elements;
    
    /*alert( string.items[0].snippet.title); //сработало!*/
}

/*var img = document.createElement('img'); 
img.src = response.items[1].snippet.thumbnails.default.url; 
document.getElementById('response').appendChild(img);*/

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyDydcKXefY4Zcn0m4fFybaEIK0pw-bJtTs');
    search();
}

function search() {
    var search = document.getElementById('search').value;
    var request = gapi.client.youtube.search.list({
        part: 'id, snippet',
        maxResults: 15,
        q: search
    });
    request.execute(loadStats);
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
/*
function onSearchResponse(response) {
    var elements = [];
    //for (var i=1; i>=5; i++) {
  /*  elements.push(response.items[1].snippet.title,
                                    response.items[1].snippet.description,
                    response.items[1].snippet.channelTitle);
  //  }

    showResponse(response);
  

}

/* function showResponse(response) {
    document.getElementById('response').innerHTML += response.items[0].snippet.title+"/";
    document.getElementById('response').innerHTML += response.items[1].snippet.title+"/";
    document.getElementById('response').innerHTML += response.items[2].snippet.title+"/";
    
    /*alert( string.items[0].snippet.title); //сработало!

}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyDydcKXefY4Zcn0m4fFybaEIK0pw-bJtTs');
    search();
}

function search() {
    var search = document.getElementById('search').value;
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: search
    });
    request.execute(showResponse);
}

function onSearchResponse(response) {
    showResponse(response);
} */