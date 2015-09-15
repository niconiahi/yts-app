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

  // $('ul').on('click', '.movie', function(beta) {
  //   var movieTitle = $(this).find('.movie-title').html();
  //   page('/movie/' + movieTitle );
  //   beta.preventDefault();
  //
  // });

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
            qualityToUse[x] = '<li class="movie-quality">' + movies[i].torrents[x].quality + '</li>';
          }
          var qualitiesToUse = $('<ul class="movie-qualityList"></ul>');

          // movieData.append(backgroundToUse);
          newMovie.append(imageToUse);
          newMovie.append(titleToUse);
          newMovie.append(yearToUse);
          qualitiesToUse.append(qualityToUse[0]);
          if (qualitiesToUse[1] !== 'undefined') {
            newMovie.append(qualitiesToUse[1]);
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

  function resetUrl() {
    urlSended = 'https://yts.to/api/v2/list_movies.json?&limit=8';
  }
});
