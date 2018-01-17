$("#menu-toggle").click(function(e) {
     $("#big-wrapper").toggleClass("toggled");
     $(".cross-icon-style").removeClass("hide");
     $(".hamburger-icon-style").addClass("hide");

     e.preventDefault();
 });

 $("#menu-toggle-2").click(function(e) {
      $("#big-wrapper").toggleClass("toggled");
      $(".hamburger-icon-style").removeClass("hide");
      $(".cross-icon-style").addClass("hide");

      e.preventDefault();
  });
