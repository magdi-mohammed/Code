/*global $*/
$(document).ready(function () {
    "use strict";
        
        // tabs vars
    var li = $('#about-me-sec .tabs .tab-item'),
        nfLi = $('#about-me-sec .tabs .tab-item:not(:first-of-type)'),
        nfLiInfo = nfLi.find($('.tab-info')),
        info = $('#about-me-sec #info-tap'),
        // circle percentage vars
        item = $('.technical-skills-list-item'),
        RADIUS = item.find('.progress-stroke').attr('r'),
        CIRCUMFERENCE = 2 * Math.PI * RADIUS,
        lg;
    
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
    
    // tab info text / icons
    
    if ($(window).outerWidth() < 590) {
        nfLiInfo.text('');
    }
    
    $(window).on('resize', function () {
        if ($(window).outerWidth() < 590) {
            nfLiInfo.text('');
        } else {
            $('#about-me-sec .tabs .tab-item:nth-of-type(2) .tab-info').text('Me');
            $('#about-me-sec .tabs .tab-item:nth-of-type(3) .tab-info').text('Soft Skills');
            $('#about-me-sec .tabs .tab-item:nth-of-type(4) .tab-info').text('Technical Skills');
        }
    });
    
    // set the z index layers
        
    li.each(function () {
        $(this).css({zIndex : $(this).data('index')});
    });
    
    // set the data target and the taps
    
    nfLi.each(function () {
        $(this).attr('data-target', '#' + $(this).attr('id') + '-item');
        $(this).on('click', function () {
            $($(this).data('target')).addClass('active').siblings().removeClass('active');
            
            if (lg) {
                $('#about-me-sec').animate({
                    scrollTop : 220
                });
            } else {
                $('#about-me-sec').parent().animate({
                    scrollTop : 220
                });
            }
            
        });
    });
    
    // expand the taps and some debug
    
    info.on('click', function () {
        nfLi.toggleClass('animated');
        nfLi.removeClass('active');
        $(".info-item").removeClass('active');
    });
    
    // taps styling
    
    nfLi.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    // circle percentage function 
    
    item.each(function () {
        
        var $this = $(this),
            bigWord,
            sliced;
        
        // turning percentage into value
                
        if ($this.data('percentage') < 34) {
            $this.attr('data-value', 'novice');
        }
        
        if ($this.data('percentage') >= 34 && $this.data('percentage') < 90) {
            $this.attr('data-value', 'intermediate');
        }
        
        if ($this.data('percentage') >= 90) {
            $this.attr('data-value', 'expert');
        }
        
        // slice the long length words

        $this.find($('.percent')).text($this.data('value'));
        
        if ($this.data('value').length > 7) {
            $this.find($('.percent')).text($this.data('value').slice(0, 7) + '..');
            
            $this.find($('.percent')).on('mouseover', function () {
                $(this).text($this.data('value'));
            });
            $this.find($('.percent')).on('mouseout', function () {
                $(this).text($this.data('value').slice(0, 7) + '..');
            });
        }

        function progress(value) {
            var progressVal = value / 100,
                dashoffset = CIRCUMFERENCE * (1 - progressVal);
    
            $this.find($('.circle-progress')).css({strokeDashoffset: dashoffset});
        }

        $this.find($('.circle-progress')).css({strokeDasharray: CIRCUMFERENCE});
        progress($this.data('percentage'));
    });
    
    // ripple effect
    
	$('.ripple-about').on('click', function (e) {

		if ($(this).find('span.r').length === 0) {

			$(this).append('<span class="r"></span>');

			var ripple = $(this).find('span.r'),
				size = ($(this).innerWidth() > $(this).innerHeight()) ? $(this).innerWidth() * 2 : $(this).innerHeight() * 2,
				clickY = $(this).offset().top,
				clickX = $(this).offset().left,
				x = e.pageX - clickX,
				y = e.pageY - clickY;

			ripple.css({
				'top': y + 'px',
				'left': x + 'px'
			});

			ripple.animate({
				'width': size + 'px',
				'height': size + 'px',
				'margin-top': -size / 2 + 'px',
				'margin-left': -size / 2 + 'px',
				'opacity': 0
			}, 600, function () {
				$(this).remove();
			});
		}
	});
    
    ///////////////////////
    // parallax gradient //
    //////////////////////
    
    $('#about-me-sec').on('mousemove', function (e) {
        if (lg) {
            var x = e.clientX + 1300,
                v = $(window).width().toString(),
                vs = v.slice(0, v.length - 1),
                tx = (x / vs * 8).toFixed(0);
            $('#about-me-sec').css({background: 'linear-gradient( ' + tx + 'deg' + ', #573da5 0%, #4c2da2 20%, #3b257c 80%)'});
        } else if (!lg) {
            $('#about-me-sec').css({background: 'linear-gradient(141deg, #573da5 0%, #4c2da2 20%, #3b257c 80%)'});
        }
    });
    
});