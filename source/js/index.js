'use strict';

let preloader = (function() {
  let percentsTotal = 0,
    preloader = $('.preloader');

  let imagePath = $('*').map(function(index, element) {
    let background = $(element).css('background-image'),
      image = $(element).is('img'),
      path = '';

    if (background != 'none') {
      path = background.replace('url("', '').replace('")', '');
    }

    if (image) {
      path = $(element).attr('src');
    }

    if (path) return path
  });

  let setPercents = function(total, current) {
    let percents = Math.ceil(current / total * 100);

    $('.preloader__percents').text(percents + '%');

    if (percents == 100) preloader.fadeOut(1000);
  }

  let loadImages = function(images) {
    if (!images.length) preloader.fadeOut(1000);

    images.forEach(function(img, i, images) {
      let fakeImage = $('<img>', {
        attr: {
          src: img
        }
      });

      fakeImage.on('load error', function(){
        percentsTotal++;

        setPercents(images.length, percentsTotal);
      });
    });
  }

  return {
    init: function() {
      let imageArray = imagePath.toArray();

      loadImages(imageArray);
    }
  }

}());

$(function() {
  preloader.init();
});