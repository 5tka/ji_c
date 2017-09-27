$(document).ready(function() { // начало document.ready

  new WOW().init();

  $('.id-team_slider').waterwheelCarousel({
    sizeMultiplier: .6
  });

  // $('.p-img').slick({
  //   autoplay: true,
  //   arrows: false,
  //   fade: true,
  //   autoplaySpeed: 5000,
  //   speed: 1500,
  // });

  var containerEl = document.querySelector('.project-items');
	var mixer = mixitup(containerEl, {
    animation: {
      duration: 1000
  }
  });
  $('.p-img').bxSlider({
    // mode: '',
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    controls: false, 
    pager: false,
    auto: true,
    // touchEnabled: false
    // speed: 5000
  });
  $('.part-slide').bxSlider({
    minSlides: 1,
    maxSlides: 8,
    moveSlides: 1,
    slideWidth: 100,    
    slideMargin: 60,
    controls: true,
    pager: false
  });
  $('.feedback-slider').bxSlider({
    slideMargin: 10,
    controls: true,
    pager: false
  });

  $('.id-team_slider-mini').bxSlider({
    slideWidth: 440,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    auto: true,
  });
  $('select').selectric();
  
  // $('.intro-slider').bxSlider({
  //   slideMargin: 10,
  //   controls: false,
  //   pager: false
  // });
  $('.popup-open').click(function(e){
    e = event.preventDefault();
    $('.popup-form-block').bPopup({
      closeClass:'popup-close'
    });
  })


}); // конец document.ready
function initialize() {
  //получаем наш div куда будем карту добавлять
  var mapCanvas = document.getElementById('map_canvas');
  // задаем параметры карты
  var mapOptions = {
      //Это центр куда спозиционируется наша карта при загрузке
      center: new google.maps.LatLng(55.64020519, 37.64585495),
      //увеличение под которым будет карта, от 0 до 18
      // 0 - минимальное увеличение - карта мира
      // 18 - максимально детальный масштаб
      zoom: 14,
      scrollwheel: true,
      disableDefaultUI: true,
      styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
      //Тип карты - обычная дорожная карта
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //Инициализируем карту
  var map = new google.maps.Map(mapCanvas, mapOptions);

  //Объявляем массив с нашими местами и маркерами
  var markers = [],
      myPlaces = [];
  //Добавляем места в массив
  myPlaces.push(new Place('Шоу-рум-1', 55.64253033, 37.63486862, ''));
  myPlaces.push(new Place('Шоу-рум-2', 55.64020519, 37.64585495, ''));
  myPlaces.push(new Place('Шоу-рум-3', 55.63729857, 37.66181946, ''));
  //Теперь добавим маркеры для каждого места
  for (var i = 0, n = myPlaces.length; i < n; i++) {

      var companyImage = new google.maps.MarkerImage('img/marker.png',
        new google.maps.Size(145,93),
        new google.maps.Point(0,0),
        new google.maps.Point(0,45)
      );

      var marker = new google.maps.Marker({
          //расположение на карте
          position: new google.maps.LatLng(myPlaces[i].latitude, myPlaces[i].longitude),
          map: map,
          icon: companyImage,
          //То что мы увидим при наведении мышкой на маркер
          // title: myPlaces[i].name
        });
      //Добавим попап, который будет появляться при клике на маркер
      var infowindow = new google.maps.InfoWindow({
        content: myPlaces[i].name
      });
      //привязываем попап к маркеру на карте
      makeInfoWindowEvent(map, infowindow, marker);
      markers.push(marker);
  }
}
function makeInfoWindowEvent(map, infowindow, marker) {
  //Привязываем событие КЛИК к маркеру
  google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(map, marker);
  });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close();
  });
}
//Это класс для удобного манипулирования местами
function Place(name, latitude, longitude, description){
  this.name = name;  // название
  this.latitude = latitude;  // широта
  this.longitude = longitude;  // долгота
  this.description = description;  // описание места
}
//Когда документ загружен полностью - запускаем инициализацию карты.
google.maps.event.addDomListener(window, 'load', initialize);