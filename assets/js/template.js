var w;

jQuery(document).ready(function() {
	w = getWindowWidth();

	/*******************************************
	 * HELPER FUNCTIONS *
	 *******************************************/

	/*
	 * Image lazy loading
	 * Further reading: https://www.appelsiini.net/projects/lazyload
	 * Example image tag:  <img class="lazy" data-original="img/example.jpg" width="640" height="480">
	 * Uncomment out the code below and in the index.php file to enable lazyloading
	 */

	// jQuery("img.lazy").lazyload({
	//     threshold : 200
	// });

	/*
	 * Check alt tags aren't empty for images
	 * For development use only
	 */

	// jQuery('img').each(function() {
	// 	console.log(jQuery(this).attr('alt'));
	// });

	// swap inline png for SVG graphics// SVG / PNG
	if (!Modernizr.svg) {
	    jQuery('img[src*="svg"]').attr('src', function () {
	    return jQuery(this).attr('src').replace('.svg', '.png');
	  });
	}


	/*******************************************
	 * RESPONSIVE NAV *
	 *******************************************/

	jQuery('.nav-btn').on('click', function() {
		jQuery('html').addClass('js-nav');
	});

	jQuery('.close-btn, .js-nav #innerwrap').on('click', function() {
		jQuery('html').removeClass('js-nav');
	});

	// add top menu to the main menu on phones (only with JS)
	if (jQuery('.js').length) {
		moveTopMenu();
	}

	/*******************************************
	 * Owl Carousel - latest news *
	 *******************************************/

	 // remove the three dots added by Joomla's truncate function
	jQuery('.latest-news .news-overlay').each(function() {
		var elem = jQuery(this);
		var newsOverlayContents = elem.html();
		 newsOverlayContents = newsOverlayContents.replace("...", "");
		 elem.empty().append(newsOverlayContents);
	})
	 
	 
	if (jQuery(".latest-news .latest-news-articles").length) {
		jQuery(".latest-news .latest-news-articles").owlCarousel({
			loop:false,
		    margin:20,
		    nav: true,
		    dots: false,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:1
		        },
		        520:{
		            items:2
		        },
		        920:{
		            items:3,
		            margin: 28
		        },
		        1360:{
		            margin: 35	            
		        }
		    }
		});
	}

	if (jQuery('#main .join-newsletter').length) {
		positionContentUnderNewsletterSignup();
	}

});

jQuery(window).resize(function() {
	w = getWindowWidth();

	// add top menu to the main menu on phones (only with JS)
	if (jQuery('.js').length) {
		moveTopMenu();
	}
	if (jQuery('#main .join-newsletter').length) {
		positionContentUnderNewsletterSignup();
	}
});

jQuery(window).load(function() {

	// CQC amends
	setTimeout(function() {
		jQuery('link[href="http://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/cleanslate.css"], link[href="http://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/cqc-widget-styles.css"]').prop("disabled", true);
		jQuery('.cqc-widget-inner').html(function(index, html) {
			return html.replace('Donna Louise Trust', '<span class="cqc-org-title">Donna Louise Trust</span>');
		});
		
		// remove empty <p> tags
		jQuery('.cqc p').each(function() {
			if (jQuery(this).html() == "") {
				jQuery(this).remove();
			}
		});
	}, 2000);

	/*******************************************
	 * Totaliser - one in a million *
	 *******************************************/

	 if (jQuery('#totaliser-container').length) {
	 	var totaliser = jQuery('#totaliser-container');
	 	var totalRaised = totaliser.attr('data-raised');
	 	var scaleValue = totalRaised/1000; 
	 	/* scale the total raised */
	 	totaliser.find('svg #raised-value').css('transform', 'scaleY(' + scaleValue + ')');
	 }

	 /*******************************************
	 * Count Down - one in a million *
	 *******************************************/

	 if (jQuery('.countdown-clock').length) {
	 	var clock;
		/* grab the current date */
		var currentDate = new Date();
		/* set the date for the campaign to finish */
		var finishDate = new Date("September 01 2017");
		/* calculate the difference in seconds */
		var diff = finishDate.getTime() / 1000 - currentDate.getTime() / 1000;			
		/* initiate coutdown clock */
		clock = jQuery('.countdown-clock').FlipClock({
	        clockFace: 'DailyCounter',
	        autoStart: false,
	        showSeconds: false
	    });
		/* set time to count down to and other settings */
	    clock.setTime(diff);
	    clock.setCountdown(true);
	    clock.start();	
	 }
});

	/*******************************************
	 * Position article content below newsletter banner *
	 * Newsletter banner is positioned absolute *
	 *******************************************/

function positionContentUnderNewsletterSignup() {

	 var nbHeight = jQuery('#main .join-newsletter').outerHeight();
	 jQuery('#main .join-newsletter').next().css('margin-top', nbHeight+ (6*16));
}

function moveTopMenu() {
	if (w < 920) {
		// get <li> form top menu 
		jQuery('.top-menu ul.nav').appendTo('#menu .moduletable').addClass('moved');
	} else if (w >= 920) {
		jQuery('#menu ul.moved').appendTo('.top-menu').removeClass('moved');
	}
}

function getWindowWidth() {
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}