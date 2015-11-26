//  Modal

$(".btn-modal").fancybox({
    'padding'    : 0,
    'tpl'        : {
        closeBtn : '<a title="Close" class="btn_close" href="javascript:;"></a>'
    }
});


// Map

ymaps.ready(init);

var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("map", {
        center: [48.7162,44.5065],
        zoom: 16,
        controls: ['smallMapDefaultSet']
    });

    myPlacemark = new ymaps.Placemark([48.7162,44.5062], {
        hintContent: ''
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/placemark.png',
        iconImageSize: [47, 69],
        iconImageOffset: [-23, -70]
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('multiTouch');
    myMap.geoObjects.add(myPlacemark);
}


// ----- Маска ----------
jQuery(function($){
    $("input[name='phone']").mask("+7(999) 999-9999");
});


$(document).ready(function() {

    $('.btn-submit').click(function() {

        $('body').find('form:not(this)').children('div').removeClass('red'); //удаление всех сообщение об ошибке(валидатора)
        var answer = checkForm($(this).closest('form').get(0)); //ответ от валидатора
        if(answer != false)
        {
            var $form = $(this).closest('form'),
                name    =     $('input[name="name"]', $form).val(),
                type    =     $('input[name="type"]', $form).val(),
                phone   =     $('input[name="phone"]', $form).val(),
                email   =     $('input[name="email"]', $form).val(),
                form    =     $('input[name="form"]', $form).val(),
                message =     $('textarea[name="message"]', $form).val();
            console.log(name, phone, email, form, type, message);
            $.ajax({
                type: "POST",
                url: "form-handler.php",
                data: {name: name, phone: phone, email:email, form:form, type:type, message:message}
            }).done(function(msg) {
                $('form').find('input[type=text], textarea').val('');
                console.log('удачно');
                document.location.href = "http://rosich134.ru/done.html";
            });
        }
    });

});