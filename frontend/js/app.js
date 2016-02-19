$(document).foundation();


$(document).ready(function(){
    var currentPage = 1;
    $('.background-image').each(function(index, elem) {
        adjustImgSize(elem);
    });


    $(window).resize(function() {
        console.log('resize');
        $('.background-image').each(function(index, elem) {
            adjustImgSize(elem);
        });

    });

    $('#media').change(function() {
        if (this.checked) {
            $('#choose-media-types').slideDown();
        }
        else {
            $('#choose-media-types').slideUp();
        }
    })

    $('#gaming').change(function() {
        var elem = this;
        if(this.checked) {
            $('#choose-game-tier').slideDown();
            $('.background-image').each(function(index, elem) {
                adjustImgSize(elem);
            });
            $('.background-image').fadeIn();
        }
        else {
            $('.background-image').fadeOut();
            $('#choose-game-tier').slideUp();

        }
        $('.background-image').each(function(index, elem) {
            adjustImgSize(elem);
        });
    });

    $('.next-page').click(function() {
        //validate form, then
        //$('#page'+currentPage).;
        $('#page'+currentPage).hide("slide", {direction: "left"}, 350, function() {
            currentPage = currentPage + 1;
            $('#page' + currentPage).show("slide", {direction: "right"}, 350);
        });
    });

    $('.prev-page').click(function() {
        //validate form, then
        $('#page'+currentPage).hide("slide", {direction: "right"}, 350, function() {
        currentPage = currentPage-1;
        $('#page'+currentPage).show("slide", {direction: "left"}, 350);
    })
});
});


function adjustImgSize(elem) {
    var parent = $(elem).parent().parent();
    var height = parent.height();
    var width = parent.width();
    $(elem).css({'width':width, 'height':height})
}