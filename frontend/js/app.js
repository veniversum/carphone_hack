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
            $('#choose-game-tier').slideDown(function() {
                $('.background-image').each(function (index, elem) {
                    adjustImgSize(elem);
                    //$(elem).fadeIn();

                });


            });
            $('.background-image').fadeIn();
        }
        else {
            $('.background-image').fadeOut(function() {

            });
            $('#choose-game-tier').slideUp();

        }
        $('.background-image').each(function(index, elem) {
            adjustImgSize(elem);
        });
    });

    $('.next-page').click(function() {
        //validate form, then
        //$('#page'+currentPage).;
        if(currentPage == 1 ? validate1() : validate2()) {
            $('#page' + currentPage).hide("slide", {direction: "left"}, 350, function () {
                currentPage = currentPage + 1;
                $('#page' + currentPage).show("slide", {direction: "right"}, 350);
            });
        }
        else {
            //feedback pls
        }
    });

    $('.prev-page').click(function() {
        //validate form, then
        $('#page'+currentPage).hide("slide", {direction: "right"}, 350, function() {
        currentPage = currentPage-1;
        $('#page'+currentPage).show("slide", {direction: "left"}, 350);
    })


});

    $('#portability-slider').change(function() {
        console.log(this.value);
    })
});


function adjustImgSize(elem) {
    var parent = $(elem).parent().parent();
    var height = parent.height();
    var width = parent.width();
    $(elem).css({'width':width, 'height':height})
}

function validate1() {
    //check if any of checkboxes checked
    var checkboxes = $('#main-purpose').children("[type='checkbox']");
    var selected = false;
    checkboxes.each(function(index, elem) {
        selected = selected || elem.checked;
    });
    if (!selected) {
        return false;
    }

    var gaming = $('#gaming');
    if(gaming.checked) {
        var gameTiers = $('#choose-game-tier').children("[id$='-end']");
        var checked = false;
        gameTiers.each(function(index, elem) {
            checked = checked || elem.checked;
        });
        if (!checked) return false;
    }

    var media = $('#media');


    return true;
}

function validate2() {
    return true;
}