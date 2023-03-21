// 折叠
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    var panel = this.nextElementSibling;
    if (panel.style.display !== "flex") {
      panel.style.display = "flex";
    } else {
      panel.style.display = "none";
    }
  });
}

var li_homepage = document.getElementById("li-homepage");
var li_statistics = document.getElementById("li-statistics");
var li_information = document.getElementById("li-information");
var li_management = document.getElementById("li-management");
var li_debug = document.getElementById("li-debug");

li_homepage.onclick = function(){

}
li_statistics.onclick = function(){

}
li_information.onclick = function(){

}
li_management.onclick = function(){

}
li_debug.onclick = function(){

}