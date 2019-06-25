(function ( $ ) {
 

$.fn.sliderImgTxt = function(options) {
	var mainElement = this;

	var settings = $.extend({
        delay: 3000,
        autoplay: true
    }, options );


    $(mainElement).find(".slide .image img").on("load", function() {
		$(mainElement).find(".slide").animate({"opacity": 1});
		$(mainElement).removeClass("loading");
		$(mainElement).find(".slide").addClass("animated");
	});

	$(mainElement).find(".arrows .right").on("click", function(){
		curSlide ++;
		if(curSlide >= $(mainElement).find(".data .item").length) curSlide = 0;
		var item = $(mainElement).find(".data .item").eq(curSlide);
		switchSlide(item);
	});

	$(mainElement).find(".arrows .left").on("click", function(){
		curSlide --;
		if(curSlide <  0) curSlide = $(mainElement).find(".data .item").length - 1;
		var item  = $(mainElement).find(".data .item").eq(curSlide);
		switchSlide(item);
	});	

	if(settings.autoplay) resetTimer();


	var curSlide = 0;
	function switchSlide(data) {
		$(mainElement).find(".slide" ).animate({"opacity": 0}, function() {
			$(mainElement).addClass("loading");
			var image = $(data).find(".image").text();
			var text = $(data).find(".text").html();
			var url = $(data).find(".url").text();
			$(mainElement).find(".slide .image img" ).attr("src", image);
			$(mainElement).find(".slide" ).attr("href", url); 
			$(mainElement).find(".slide .text" ).html(text); 
			$(mainElement).find(".slide" ).removeClass("animated");

			if(settings.autoplay) resetTimer();
		});
	}

	var sliderInt;
	function resetTimer() {
		clearInterval(sliderInt);
		sliderInt = setInterval(function(){
			nextSlide();
		}, settings.delay);
	}

	function nextSlide() {
		curSlide ++;
		if(curSlide >=  $(mainElement).find(".data .item").length) curSlide = 0;
		var item  =  $(mainElement).find(".data .item").eq(curSlide);
		switchSlide(item);
	}

};


$.fn.sliderThumbs = function(options) {
	var mainElement = this;

	var settings = $.extend({
        delay: 3000,
        autoplay: true
    }, options );

    $(mainElement).find(" .thumbs .thumb").on("click", function(){
		$(mainElement).find(" .thumbs .thumb").removeClass('active');
		$(this).addClass('active');
		switchFeedback(this);
	});

	if(settings.autoplay) resetTimer();

	function switchFeedback(data) {
		$(mainElement).find(" .main" ).animate({"opacity": 0}, function() {
			
			var text = $(data).find(".text").html();

			$(mainElement).find(" .main .text" ).html(text);
	

			$(mainElement).find(" .main" ).animate({"opacity": 1}, function(){
				if(settings.autoplay) resetTimer();
			});
		});
	}

	var feedbackInt;
	function resetTimer() {
		clearInterval(feedbackInt);
		feedbackInt = setInterval(function(){
			nextFeedback();
		}, 3000);
	}

	function nextFeedback() {
		var curThumb = $(mainElement).find(" .thumbs .active");
		var curThumbNum = $(mainElement).find(" .thumbs .thumb").index(curThumb); 

		curThumbNum ++;
		if(curThumbNum >=  $(mainElement).find(" .thumbs .thumb").length) curThumbNum = 0;
		var item  =  $(mainElement).find(" .thumbs .thumb").eq(curThumbNum);
		$(item).click();
	}
};


}( jQuery ));

