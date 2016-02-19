$(document).foundation();


$(document).ready(function () {
    var currentPage = 1;
    $('.background-image').each(function (index, elem) {
        adjustImgSize(elem);
    });

    $(window).resize(function () {
        console.log('resize');
        $('.background-image').each(function (index, elem) {
            adjustImgSize(elem);
        });

    });

    $('#media').change(function () {
        if (this.checked) {
            $('#choose-media-types').slideDown();
        }
        else {
            $('#choose-media-types').slideUp();
        }
    });

    $('#gaming').change(function () {
        var elem = this;
        if (this.checked) {
            $('#choose-game-tier').slideDown(function () {
                $('.background-image').each(function (index, elem) {
                    adjustImgSize(elem);
                    //$(elem).fadeIn();

                });


            });
            $('.background-image').fadeIn();
        }
        else {
            $('.background-image').fadeOut(function () {

            });
            $('#choose-game-tier').slideUp();

        }

        $('.background-image').each(function (index, elem) {
            adjustImgSize(elem);
        });
    });

    $('.next-page').click(function () {
        //validate form, then
        //$('#page'+currentPage)
        if (currentPage == 1 ? validate1() : validate2()) {
            goToPage(currentPage + 1);

        }
        else {
            //feedback pls
        }
    });

    $('.prev-page').click(function () {
        //validate form, then
        goToPage(currentPage - 1);


    });


    $('#portability-slider').on('moved.zf.slider', function () {
        var val = $('#portability-slider').children('input').val();
        var message = "";
        if (val > 7.5) {
            message = "I will carry it with me a lot of times, I want it to be light and have the best battery life I can get.";
        }
        else if (val > 5) {
            message = "I would like to carry the laptop with me around town, so it should be reasonably light and have a decent battery life."
        }
        else if (val > 2.5) {
            message = " I will move it around the house mostly. It does not need to be that portable.";
        }
        else {
            message = "It will stay in one place only. A desktop computer is ok with me!";
        }
        $('#portability-message').text(message);
    });

    $('#find-laptop').click(function () {
        var q = {};

        //first page
        q.gaming = $('#gaming').prop("checked");
        q.gameTypes = $("#choose-game-tier").find("input[type='radio']:checked").val();
        q.media = $('#media').prop("checked");
        q.homeUse = $('#home-use').prop("checked");
        q.business = $('#business').prop("checked");
        q.mediaTypes = [];
        $('#choose-media-types').find("input[type='checkbox']").each(function () {
            if (this.checked) q.mediaTypes.push(this.value);
        });

        //second page
        q.portability = $("#portability-slider").find("input").val();
        q.storageType = $('#storage-type').find('option:selected').val();
        q.storageSize = $('#storage-size').find('option:selected').val();

        //third page

        q.connectivity = [];
        $('#connectivity').find('input[type=checkbox]').each(function (index, elem) {
            if (elem.checked) {
                q.connectivity.push($(elem).val());
            }
        });

        q.design = $('#design-checkbox').prop('checked');
        q.security = $('#security-checkbox').prop('checked');

        console.log(q);
        submitForm(q);


    });

    function goToPage(pageNo) {
        if (pageNo > currentPage) {
            $('#page' + currentPage).hide("slide", {direction: "left"}, 350, function () {
                currentPage = pageNo;
                $('#page' + currentPage).show("slide", {direction: "right"}, 350);
            });
        }
        else if (pageNo < currentPage) {
            $('#page' + currentPage).hide("slide", {direction: "right"}, 350, function () {
                currentPage = currentPage - 1;
                $('#page' + currentPage).show("slide", {direction: "left"}, 350);
            })
        }
    }

    function warn(pageId, warning) {
        $('#error-message').text(warning);
        goToPage(pageId);
        $('.container').velocity("scroll", {
            duration: 350
        });
        $('#error').fadeIn("fast");

    }

    function validate1() {
        //check if any of checkboxes checked
        var checkboxes = $('#main-purpose').children("[type='checkbox']");
        var selected = false;
        checkboxes.each(function (index, elem) {
            selected = selected || elem.checked;
        });
        if (!selected) {
            warn(1, "Please select at least one use case!");
            return false;
        }

        var gaming = $('#gaming');
        if (gaming.prop('checked')) {
            var gameTiers = $('#choose-game-tier').find("input[type='radio']");
            console.log(gameTiers);
            var checked = false;
            gameTiers.each(function (index, elem) {
                var c = elem.checked;
                console.log(c);
                checked = checked || c;
            });
            if (!checked) {
                warn(1, "Please select a game tier!");
                return false;
            }
        }


        $('#error').hide();
        return true;
    }

    function validate2() {
        return true;
    }

    function submitForm(q) {
        $("#master-form").submit();
    }
});


function adjustImgSize(elem) {
    var parent = $(elem).parent().parent();
    var height = parent.height();
    var width = parent.width();
    $(elem).css({'width': width, 'height': height})
}



