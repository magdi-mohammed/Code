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
    
    // scroll magic initialize
    var controller = new ScrollMagic.Controller();
    
    ///////////////////////
    //      content     //
    //////////////////////
    
    $('#work-sec .content').each(function () {
        
        // build a tween 
        var tween = TweenMax.fromTo(this, 1, {y : 20, autoAlpha: 0}, {y: 0, autoAlpha: 1});
                
        // build a scene 
        var scene = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.9 // from the top to bottom of the screen 0 - 1

            })
                .setTween(tween)
                .addTo(controller);
    });
    
    ///////////////////////
    // parallax gradient //
    //////////////////////
    
    $('#work-sec').on('mousemove', function (e) {
        if (lg) {
            var x = e.clientX + 1300,
                v = $(window).width().toString(),
                vs = v.slice(0, v.length - 1),
                tx = (x / vs * 8).toFixed(0);
            $('#work-sec').css({background: 'linear-gradient(' + tx + 'deg' + ', #4954de 0%, #49ddd8 100%)'});
        } else if (!lg) {
            $('#work-sec').css({background: 'linear-gradient(135deg, #4954de 0%, #49ddd8 100%)'});
        }
    });
    
    ///////////////////////
    //     parallax     //
    //////////////////////
    
    $(document).on('mousemove', function (e) {

        if (lg) {
            var x = e.clientX,
                y = e.clientY,
                tx = (x / $('#work-sec .process').outerWidth());

            if (tx > 0) {
                $('#work-sec .process').children().each(function () {
                    var $thisP = $(this).data('parallax');
                    $(this).css({transform: 'translateX(' + tx * $thisP + 'px' + ')'});
                });
            }
        } else if (!lg) {
            $('#work-sec .process').children().each(function () {
                $(this).css({transform: 'none'});
            });
        }
    });

    $('#work-sec .process').on('mouseout', function () {
        $('#work-sec .process').children().each(function () {
            $(this).css({transform: 'none'});
        });
    });
        
});