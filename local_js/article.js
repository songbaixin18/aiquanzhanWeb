$("#header").load("../local_header.html");
$("#right").load("../local_right.html");
$("#footer").load("../local_footer.html");
const API = "https://qzapi.songbaixin.com"
$(function () {
    $("#hostname").text(window.location.host);
    let src = document.location.pathname.match(/\w+/g)[1];
    $.ajax({
        url: API + "/read_number/" + src,
        success: function (result) {
            $("#read_numder").html("阅读数( " + JSON.parse(result).read_number + " )");
        }
    });
})