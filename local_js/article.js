$("#header").load("../local_header.html");
$("#right").load("../local_right.html");
$("#footer").load("../local_footer.html");
$(function(){
    $("#hostname").text(window.location.host);
})