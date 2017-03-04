// Better scroll handler

(function($) {
  var uniqueCntr = 0;
  $.fn.scrolled = function (waitTime, fn) {
    if (typeof waitTime === "function") {
        fn = waitTime;
        waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.scroll(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.removeData(tag);
            fn.call(self[0]);
        }, waitTime);
        self.data(tag, timer);
    });
  }
})(jQuery);

// Better resize handler
(function($) {
  var uniqueCntr = 0;
  $.fn.resized = function (waitTime, fn) {
    if (typeof waitTime === "function") {
        fn = waitTime;
        waitTime = 100;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.resize(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.removeData(tag);
            fn.call(self[0]);
        }, waitTime);
        self.data(tag, timer);
    });
  }
})(jQuery);

///////////////////
// Onload functions
///////////////////
$(document).ready(function(){

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // modal
  $('a[href^="#modalForm"]').click(function(){
    $('.fixed-container').fadeIn();
    $('.hero, .content, .footer').addClass('blur');
    $('body, html').animate({scrollTop: $('.form--fixed').offset().top - 30}, 1000);
    $('.fixed-btn').removeClass('visible');
  });

  $('#closeModal').on('click', function(){
    $('.fixed-container').fadeOut();
    $('.hero, .content, .footer').removeClass('blur');
    $('.fixed-btn').addClass('visible');
  });
  //
  // $(document).mouseup(function (e) {
  //   var container = new Array();
  //   container.push($('.form--fixed'));
  //
  //   $.each(container, function(key, value) {
  //       if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
  //           $('.fixed-container').fadeOut();
  //           $('.hero, .content, .footer').removeClass('blur');
  //       }
  //   });
  // });

  $('#owlTestimonials').slick({
    dots: true,
    infinite: true,
    speed: 300,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000
  });

  $('.app').slick({
    accessibility: false,
    draggable: false,
    touchMove: false,
    dots: false,
    infinite: false,
    speed: 300,
    arrows: false,
    adaptiveHeight: true
  });

  // SET THE HEIGHT OF VIEWPORT
  var secondStepActive = false;

  function setBodyHeight(arg){
    if (arg == 'first'){
      $('.app').css('max-height', $('#firstPage').height() );
    } else {
      $('.app').css('max-height', $('#secondPage').height() + $('#firstPage').height() );
    }
  }
  setTimeout(function() {
    // setBodyHeight('first'); // default is the first screen
  }, 1000);


  // function setAppPosition(){
  //   var appNegativeMargin = 0 - $('#firstPage').height();
  //   $('.app').css(
  //     'transform', 'translate3d(0,-'+ $('#firstPage').height() + 'px,0)'
  //   ).css('margin-bottom', appNegativeMargin);
  //   secondStepActive = true;
  // }

  // recalculate height with .1s delay
  $(window).resized(function() {
    if (secondStepActive){
      // setBodyHeight('sec');
      // setAppPosition();
    } else {
      // setBodyHeight('first');
    }
  });
  // $(window).scrolled(100, function() {
  //   if (secondStepActive){
  //     console.log('recalc');
  //     setBodyHeight('sec');
  //     setAppPosition();
  //   } else {
  //     setBodyHeight('first');
  //   }
  // });
  ///////////////
  /// FORMS LOGIC
  ///////////////

  var selectedOption = "";

  $('#ctaFromFirst').on('submit', function(e){
    e.preventDefault();
    if(selectedOption != '' ){
      $('.ui-select').removeClass('ui-select--error');
      // setTimeout(function() {
      //   setBodyHeight('second');
      // }, 500);
      // setTimeout(function() {
      //   setAppPosition();
      // }, 500);

      $('.app').slick('slickNext');
      $('body, html').animate({scrollTop: $('#secondPage').offset().top - 30}, 1000);
      secondStepActive = true;
      $('#pasteSelected').text(selectedOption);
      return false;
    } else {
      $('.ui-select').addClass('ui-select--error');
      return false;
    }
  });

  $('#ctaFromSecond').on('submit', function(e){
    var form = $('#ctaFromSecond');
    var name = form.find('input[type=text]').val();
    var phone = form.find('input[type=tel]').val();
    var email = form.find('input[type=email]').val();
    var agreed = form.find('input[type=checkbox]:checked').val();

    console.log(agreed);

    // validation
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailIsValid = false;
    var emailIsNotValid = true;
    if(emailRegex.test(email)){
      emailIsValid = true;
      emailIsNotValid = false;
    } else {
      emailIsValid = false;
      emailIsNotValid = true;
    }

    if(agreed != 'yes'){
        console.log('not agreed');
        form.find('input[type=checkbox]').parent().addClass('ui-radio--error');
    } else {
        form.find('input[type=checkbox]').parent().removeClass('ui-radio--error');
    }
    if(emailIsNotValid){
        form.find('input[type=email]').parent().addClass('ui-input--error');
    } else {
        form.find('input[type=email]').parent().removeClass('ui-input--error');
    }
    if(name == '' || name.length <= 3){
        form.find('input[type=text]').parent().addClass('ui-input--error');
    } else {
        form.find('input[type=text]').parent().removeClass('ui-input--error');
    }
    if(phone == '' || phone.length <= 10){
        form.find('input[type=tel]').parent().addClass('ui-input--error');
    } else {
        form.find('input[type=tel]').parent().removeClass('ui-input--error');
    }

    if(agreed == '' || emailIsNotValid || name == '' || name.length <= 3 || phone == '' || phone.length <= 10 ) {
      // form.find('.form-validation').text('Исправьте ошибки в полях');
      return false;
      e.stopPropagation();
    } else {
      //build message data
      var formData = {
        'name' : name,
        'email' : email,
        'phone' : phone,
        'select' : selectedOption
      };
      // and make ajax call to phpmail
      $.ajax({
        type        : 'POST',
        url         : 'php/contact.php',
        data        : formData,
        dataType    : 'json',
        encode      : true
      }).done(function(data) {
        alert(data);
        if ( data.success) {
          form.find('.form__title').fadeOut();
          form.find('.form__wrapper').fadeOut();
          form.find('.form__thanks').fadeIn();

        }
      }).fail(function(data) {
        // remove
        form.find('.form__title').fadeOut();
        form.find('.form__wrapper').fadeOut();
        form.find('.form__thanks').fadeIn();
        console.log(data);
      });
    }

    e.preventDefault();
  });


  //////
  // UI
  /////
  $('.ui-select').on('click', function(e){
    $(this).toggleClass('active');
  });

  $('.ui-select__drop span').on('click', function(e){
    var currentValue = $(this).data('select');
    $(this).closest('.ui-select').find('label').text(currentValue);
    $(this).closest('.ui-select').find('label').addClass('selected');
    $('.ui-select').removeClass('ui-select--error');
    selectedOption = currentValue;
  });

  // custom input trigger active class
  $('.ui-input label').on('click', function(){
    $(this).parent().find('input').trigger('focus');
  });
  $('.ui-input input').each(function() {
    $(this).on('focus', function() {
      $(this).parent('.ui-input').addClass('active');
    });
    $(this).on('blur', function() {
      if ($(this).val().length == 0) {
        $(this).parent('.ui-input').removeClass('active');
      }
    });
    if ($(this).val() != '') $(this).parent('.ui-input').addClass('active');
  });

  $(window).scrolled(100, function() {
    var wScroll = $(this).scrollTop();
    if (secondStepActive){
      if (wScroll > 350){
        $('.fixed-btn').addClass('visible');
      } else {
        $('.fixed-btn').removeClass('visible');
      }
    }
  });


  // $(window).scrolled(10, function() {
  //   var wScroll = $(this).scrollTop() + 50;
  //   var wWidth = $(window).width();
  //   if (wWidth > 900){
  //     if (wScroll + $(window).height() < $(document).height() - 100 ){
  //       $('.form--fixed').css(
  //         'transform', 'translate3d(0,'+ wScroll + 'px,0)'
  //       );
  //     }
  //   } else {
  //     $('.form--fixed').css(
  //       'transform', 'translate3d(0,'+ 0 + 'px,0)'
  //     );
  //   }
  // });
});
