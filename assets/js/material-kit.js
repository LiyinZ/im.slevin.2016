var transparent = true;

var fixedTop = false;

var navbar_initialized = false;

// var activeHash = '';

$(document).ready(function(){

    // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
    $.material.init();


    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
	$('.carousel').carousel({
      interval: 400000
    });

  $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);

  $('.scroll').click(function(ev) {
    ev.preventDefault();
    // if (activeHash != this.hash) {
      var dest = 0;
      var heightDiff = $(document).height() - $(window).height();
      if ($(this.hash).offset().top > heightDiff) {
        dest = heightDiff - 70;
      } else {
        dest = $(this.hash).offset().top - 70;
      }
      // go to destination
      $('html, body').animate({
        scrollTop: dest
      }, 400, 'swing');
      // activeHash = this.hash;
    // }
  });
});

materialKit = {
    misc:{
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > 260 ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                }
            }
    }, 17)
}


var big_image;

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};
