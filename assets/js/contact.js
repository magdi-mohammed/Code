/*global $*/
$(document).ready(function () {
    "use strict";
    
    // screen size detect 
    var lg;
    
    function responsive() {
        if ($(window).outerWidth() > 991) {
            lg = true;
        } else {
            lg = false;
        }
    }
    responsive();
    $(window).on('resize', function () {responsive(); });

    ///////////////////////
    // parallax gradient //
    //////////////////////
    
    $('#contact-sec').on('mousemove', function (e) {
        if (lg) {
            var x = e.clientX,
                v = $(window).width().toString(),
                vs = v.slice(0, v.length - 1),
                tx = (x / vs * 18).toFixed(0);
            $('#contact-sec').css({background: 'linear-gradient(' + tx + 'deg, rgb(0, 187, 126), rgba(0, 187, 126, 0.63))'});
        } else if (!lg) {
            $('#contact-sec').css({background: 'linear-gradient(135deg, rgb(0, 187, 126), rgba(0, 187, 126, 0.63))'});
        }
    });
    
    // fake place holder fix

    $('.fake-place-holder').on('click', function () {
        var input = $(this).parent().find('.input');
        input.focus();
    });
    
    $('.input').on('focus', function () {
        var span = $(this).parent().find('.fake-place-holder'),
            spanMw = parseInt(span.css('max-width'), 0);
        if (spanMw > 0) {
            span.css({maxWidth: 0});
        }
    });
    
    $('.input').on('blur', function () {
        var span = $(this).parent().find('.fake-place-holder'),
            spanMw = parseInt(span.css('max-width'), 0);
        if (spanMw < 180 && $(this).val().length === 0) {
            span.css({maxWidth: 180});
        }
    });
    
});