$(function() {
    // Owl Carousel
    var owl = $(".owl-carousel");
    owl.owlCarousel({
      items: 6,
      margin: 10,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2500,
      dots:false,
      responsiveClass:true,
      responsive:{
        0:{
          items:2,
        },
        600:{
          items: 3,
        },
        1200:{
          items:6,
        }
      }
    });
  });
  