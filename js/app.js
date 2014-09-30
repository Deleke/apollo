Apollo = {
    root: "http://ws.audioscrobbler.com/2.0",
    params: { api_key: 'c56d341e419af937337f42e83bf0daab', format: 'json' },
    
    //To be commented out later
    test: function(){
        Apollo.params.method = 'track.getSimilar';
        var artistName = $('#artist').val();
        var track = $('#track').val();
        Apollo.params.artist = artistName;
        Apollo.params.track = track;
        $.getJSON(Apollo.root, Apollo.params, function(response) {
            console.log(response.similartracks.track);
        });
    },

    //Get the top 50 songs
    fetchChart: function(){
        Apollo.params.method = 'chart.gettoptracks';
        $.getJSON(Apollo.root, Apollo.params, function(response){
            Apollo.loadItems(response, '.container')
        });
    },

    find: function(){
        $('.submit-button').click(function(e){
            e.preventDefault();
            var artistName = $('#artist').val();
            var track = $('#track').val();
            Apollo.params.artist = artistName;
            Apollo.params.track = track;
            $('.container').hide();
            $('.searchContainer').show();
            Apollo.fetchSimilar();
            Apollo.test();
            $('#track').val("");
            $('#artist').val("");
        });
    },

    fetchSimilar: function(){
        Apollo.params.method = 'track.getSimilar';
        $.getJSON(Apollo.root, Apollo.params, function(response){
            Apollo.loadSimilar(response, '.searchContainer')
        });
    },

    //load similar songs
    loadSimilar: function(response, container){
        // console.log(response.similartracks);
        // return false;
        $.each(response.similartracks.track, function(){
            
            var info = this;
            var link = "http://www.last.fm/music/" + info.artist.name + "/_/" + info.name
            var albumArt = info.image !== undefined ? info.image[3]["#text"] : "img/stock.jpg";
            var info_div = '<li class="info">' + '<a href=' + link + '>' + '<img src="' + albumArt +'">' + '<div class="title">' + info.name + '</div>' + '<div class="artist">' + info.artist.name + '</div>' + '</li>'
            // console.log(info_div);
            //Add the loaded information as an item to the unordered list with the class rig
            $('.searchContainer').append(info_div);

        });
    },

    //A function to load up music informtion into the html 
    loadItems: function(response, container){
        $.each(response.tracks.track, function(){
            
            var info = this;
            var link = "http://www.last.fm/music/" + info.artist.name + "/_/" + info.name
            var albumArt = info.image !== undefined ? info.image[3]["#text"] : "img/stock.jpg";
            var info_div = '<li class="info">' + '<a href=' + link + '>' + '<img src="' + albumArt +'">' + '<div class="title">' + info.name + '</div>' + '<div class="artist">' + info.artist.name + '</div>' + '</li>'
            // console.log(info_div);
            //Add the loaded information as an item to the unordered list with the class rig
            $('.container').append(info_div);
        })
    },

    //A function that initializes other functions on ready
    initialize: function(){
        Apollo.find();
        Apollo.fetchChart();
    }
}

$(document).ready(Apollo.initialize)
