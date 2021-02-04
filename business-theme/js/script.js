//СКРЫТИЕ РУЧНОГО PLACEHOLDER`А ПРИ ФОКУСЕ
jQuery(document).ready(function ($) {

	$('.ph-input').focus(function (event) {
		$(this).next('.ph-text').addClass('_active');
	});

	$('.ph-input').blur(function (event) {
		let val = $(this).val();

		if (val.length == 0) {
			$(this).next('.ph-text').removeClass('_active');
		};
	});

});
//СКРЫТИЕ РУЧНОГО PLACEHOLDER`А ПРИ ФОКУСЕ

//НАСТРОЙКА SCLICK СЛАЙДЕРА
jQuery(document).ready(function ($) {

	$('.banner__slider').slick({
		slidesToShow: 1,
		arrows: false,
		dots: true,
		autoplay: false,
	});

});
//НАСТРОЙКА SCLICK СЛАЙДЕР