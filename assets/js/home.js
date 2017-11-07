/*global $*/
$(document).ready(function () {
    "use strict";
    // general vars 
    var borderBg = $('.border-bg '),
        rightSec = $('.right-section'),
        leftSec = $('.left-section'),
        elem = borderBg,
        elem2 = rightSec;
    
    /////////////////////////////
    //      Main Parallax      //
    /////////////////////////////
    
    function mainParallax() {
        // righ section mouse enter function 
        rightSec.on('mouseover', function () {

            borderBg.addClass('m-right animated');
            borderBg.removeClass('m-left');
            setTimeout(function () {
                borderBg.removeClass('animated');
            }, 300);
            
        });

        // left section mouse enter function
        leftSec.on('mouseover', function () {

            borderBg.addClass('m-left animated');
            borderBg.removeClass('m-right');
            setTimeout(function () {
                borderBg.removeClass('animated');
            }, 300);


        });
        
        // border and bg parallax

        $(document).on('mousemove', function (e) {

            var x = e.clientX - borderBg.offset().left,
                y = e.clientY - borderBg.offset().top,
                tx = (x / borderBg.width()) * 12,
                ty = (y / borderBg.height()) * 12;
            
            if (tx > 0 && ty > 0) {
//                borderBg.css({transform: 'translateX(' + tx + 'px' + ') translateY(' + ty + 'px' + ')'});

                // right section mouse enter 

                if (borderBg.hasClass('m-right')) {
                    $('#right-section-before').css({transform: 'translateX(' + -tx + 'px' + ') translateY(' + -ty + 'px' + ')'});
                }

                // left section mouse enter 

                if (borderBg.hasClass('m-left')) {
                    $('#left-section-before').css({transform: 'translateX(' + -tx + 'px' + ') translateY(' + -ty + 'px' + ')'});
                }
            }

            
        });

        borderBg.on('mouseout', function () {
            borderBg.css({transform: 'none'});
            $('#right-section-before').css({transform: 'none'});
            $('#left-section-before').css({transform: 'none'});
        });
    }
    
    // devise detection 
    function responsive() {
        
        if ($(window).outerWidth() > 991) {
            $('body').addClass('lg');
            $('body').removeClass('sm');
            mainParallax();
        } else {
            $('body').addClass('sm');
            $('body').removeClass('lg');
        }
    }
    responsive();
    $(window).on('resize', function () {responsive(); });
});