
$(window).on("load", function() {

    setTimeout(function(){
        $('.preloader').addClass('loaded');
    }, 1000);

    if ($(".portfolio-items").length) {
        var $elements = $(".portfolio-items");
        $elements.isotope();
        $(".portfolio-filter ul li").on("click", function() {
            $(".portfolio-filter ul li").removeClass("sel-item");
            $(this).addClass("sel-item");
            var selector = $(this).attr("data-filter");
            $(".portfolio-items").isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            });
        });
    }

});

$(function() {

    "use strict";
    var wind = $(window);


    function homeHeight() {
        var homeSection = $('#home')

        homeSection.css({
            "height": $(window).height() + "px"
        });
    }
    homeHeight();
    wind.resize(homeHeight);

   
    $.scrollIt({
        upKey: 38, 
        downKey: 40, 
        easing: 'swing', 
        scrollTime: 600, 
        activeClass: 'active', 
        onPageChange: null, 
        topOffset: -15 
    });


    wind.on("scroll", function() {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar")
        if (bodyScroll > 300) {
            navbar.addClass("fixed-top");
        } else {
            navbar.removeClass("fixed-top");
        }
    });

    $(".nav-item .nav-link").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    wind.stellar({
        horizontalScrolling: false,
    })

     $('.portfolio .link').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var uri = $(this).attr('action');
        $('#form-submit').val('Wait...');
        var name = $('#contact-name').val(),
            email = $('#contact-email').val(),
            message = $('#contact-message').val();
        var required = 0;
        $('.con-validate', this).each(function() {
            if ($(this).val() == '') {
                $(this).addClass('con-error');
                required += 1;
            } else {
                if ($(this).hasClass('con-error')) {
                    $(this).removeClass('con-error');
                    if (required > 0) {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0) {
            $.ajax({
                type: "POST",
                url: 'mail.php',
                data: {
                    con_name: name,
                    con_email: email,
                    con_message: message
                },
                success: function(data) {
                    $("#contact-form input, #contact-form textarea").val('');
                    $("#contact-submit.primary-button span").html('Done!');
                    $("#contact-submit.primary-button").addClass("ok");
                    showAlertBox('success', "Thank You! Your message has been sent.");
                },
                error: function(jqXHR, e) {
                    $('#contact-submit.primary-button span').html('Failed!');
                    showAlertBox('error', "There was a problem with your submission, please try again.");
                }
            });
        } else {
            console.log("Validation Error");
        }
    })
    $(".con-validate").keyup(function() {
        $(this).removeClass('con-error');
    });

    /********** Adding Alert Box **********/
    $('#contact-submit').before('<div class="alert-container"></div>');

    /********** Function Show Alert Box **********/
    function showAlertBox(response, message) {


        var $alertBox = $('<div class="alert"></div>'),
            $alContainer = $('#contact-form .alert-container');
        if (response == 'success') {
            $alertBox.addClass('alert-success').html(message);
            $alContainer.html($alertBox);
        } else {
            $alertBox.addClass('alert-danger').html(message);
            $alContainer.html($alertBox);
        }
        $alContainer.fadeIn(300).delay(2000).fadeOut(400);
    }

});
