/*global $*/
$(document).ready(function () {
    "use strict";
    
    var lg;
    
    // screen size detect     
    function responsive() {
        if ($(window).outerWidth() > 991) {
            lg = true;
        } else {
            lg = false;
        }
    }
    responsive();
    $(window).on('resize', function () {responsive(); });
    
    // fire the owl carousel plugin on the small screens 
    
    if (!lg) {
        $('#slideContainer').addClass('owl-carousel');
        $(".owl-carousel").owlCarousel({
            loop: false,
            nav: false,
            dots : false,
            autoplay: false,
            responsive : {
                0: {
                    items : 1
                }
            }
        });
    }
        
    // nav tabs
            
    $('.button-more').on('click', function () {
            
        $('.sections-nav .nav-tab[data-target="#about-me-sec"]').addClass('active').siblings().removeClass('active');
                      
        if (lg) {
            var wipeAnimationA = new TimelineMax()
                // animate to second panel
                .to("#slideContainer", 0.5, {z: -150})		// move back in 3D space
                .to("#slideContainer", 1,   {x: '-25%'})    // move in to first panel // this.index  + 1 * 25
                .to("#slideContainer", 0.5, {z: 0});
        } else {
            
            var wipeAnimationC = new TimelineMax()
                .to(".owl-stage", 1,   {x: '-25%'});
        }

    });
    
    $('.sections-nav .nav-tab').each(function () {
        var target = $($(this).data('target')),
            index = target.index();
        $(this).attr('data-offset', index * 25);
                
    });
    
    $('.sections-nav .nav-tab').on('click', function () {
                
        $(this).addClass('active').siblings().removeClass('active');
                
        var nav = $('.sections-nav').clone(true),
            target = $($(this).data('target'));
        
        // if this is the same section .. don't remove the nav
        
        if (!$('.sections-nav').closest(target).length) {
            if ($(this).data('offset') >= 25) {
                $('.sections-nav').remove();
                nav.prependTo(target);
            } else {
                $('.sections-nav').remove();
                nav.prependTo($('#about-me-sec'));
            }
        }
                 
        var wipeAnimationB = new TimelineMax()
            // animate to second panel
            .to("#slideContainer", 0.5, {z: -150})		// move back in 3D space
            .to("#slideContainer", 1,   {x: -$(this).data('offset') + '%'})    // move in to first panel // this.index  + 1 * 25
            .to("#slideContainer", 0.5, {z: 0});
    });
});

$(window).on('load', function () {
    "use strict";
    
    var tl = new TimelineMax(),
        int = setInterval(function () {
            if ($('body').hasClass('pace-done')) {
                $('.pre-loader').animate({opacity: 0}, function () {
                    $('.pre-loader').remove();
                });
                tl
                    .fromTo('#home-sec .left-section .content .logo', 0.5, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1})
                    .fromTo('#home-sec .left-section .content .head', 0.5, {y: -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=0.25')
                    .fromTo('#home-sec .left-section .content .button', 0.5, {y : -20, autoAlpha: 0}, {y: 0, autoAlpha: 1}, '-=0.25')
                    .fromTo('#home-sec .right-section .content .head', 0.5, {x : -20, autoAlpha: 0}, {x: 0, autoAlpha: 1}, '-=0.25');
                clearInterval(int);
            }
        }, 50);
});