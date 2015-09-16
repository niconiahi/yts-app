$(document).ready(function() {
  'use strict';

  var urlSended = 'https://yts.to/api/v2/list_movies.json?limit=20';
  var movies;
  gatherInformation();

  ////////////////////////
  /// Search a film
  ////////////////////////

  $('#form').on('submit', function(alpha) {
    alpha.preventDefault();
    var movieToSearch = $('#search-field').val();
    var movieQuality = $('#quality').val();
    var movieGenre = $('#genre').val();

    console.log(movieToSearch);

    if (movieToSearch !== '') {
      urlSended += '&query_term=' + movieToSearch;
    } else {
      urlSended = urlSended;
    }

    if (movieQuality === 'both') {
      urlSended = urlSended;
    } else {
      urlSended += '&movie_quality=' + movieQuality;
    }

    if (movieGenre === 'all') {
      urlSended = urlSended;
    } else {
      urlSended += '&genre=' + movieGenre;
    }

    gatherInformation();
  });

  ////////////////////////
  /// Movie page
  ////////////////////////

  $('body').on('click', 'article', function(beta){
    selectedMovie();
  });

  ////////////////////////
  /// Functions
  ////////////////////////

  function gatherInformation() {
    console.log(urlSended);
    $.ajax({
      url: urlSended
    })
      .done(function(moviesData) {
        var list = $('#list');
        list.html('');
        movies = moviesData.data.movies;
        console.log(moviesData);
        console.log(movies);

        for (var i = 0; i < movies.length; i++) {
          var newMovie = $('<article class="movie-article"></article>');
          // var movieData = $('<a href="#" class="movie"></a>');
          var imageToUse = $('<figure class="movie-imageWrapper"><img class="movie-image" src=' + movies[i].medium_cover_image + '></img></figure>');
          var titleToUse = '<h2 class="movie-title">' + movies[i].title + '</h2>';
          var yearToUse = '<time class="movie-year">' + movies[i].year + '</time>';
          var qualityToUse = [];
          for (var x = 0; x < movies[i].torrents.length; x++) {
            qualityToUse[x] = '<li class="movie-quality"><a data-action="download" href="' + movies[i].torrents[x].url + '">' + movies[i].torrents[x].quality + '</a></li>';
          }
          var qualitiesToUse = $('<ul class="movie-qualityList"></ul>');

          newMovie.append(imageToUse);
          newMovie.append(titleToUse);
          newMovie.append(yearToUse);
          qualitiesToUse.append(qualityToUse[0]);
          if (qualityToUse[1] !== 'undefined') {
            qualitiesToUse.append(qualityToUse[1]);
          }
          newMovie.append(qualitiesToUse);
          list.append(newMovie);
        }
      })
      .fail(function(moviesError) {
        console.log(moviesError);
      });
      resetUrl();
  }

  function selectedMovie() {
    $('#container').html('');
  }

  function resetUrl() {
    urlSended = 'https://yts.to/api/v2/list_movies.json?&limit=20';
  }
});
