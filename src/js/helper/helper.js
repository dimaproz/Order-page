$( document ).ready(function() {
    $(document).on('click', '.textarea_hidden__title', function (){
        $(this).toggleClass('active')
        $(this).next('.textarea-wrap').slideToggle()
    })



    $(document).on('click', '.tabs-header__item',function () {
        var href = $(this).data('tab');
        $(this).closest('.tabs-header')
            .find('.tabs-header__item.active').removeClass('active');
        $(this).addClass('active');


        $(this).parent().next().children('.tabs-content.active').removeClass('active');
        $('#' + href).addClass('active');
    })


    $('body').on('change keyup','#dist',function () {
        var val = $(this).val();
        var price = parseInt($(this).data('price'));

        val = parseInt(val) || 1;

        var sum = val * price;

        $('#dist_sum').text(sum + ' руб')
    })
});

function initDatePicker () {
    $(".hasPicker").datepicker({
        minDate: 0,
        dateFormat: 'dd-mm-yy',
        firstDay: 1,
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    })
}



function initSliderRange() {
    let startHour = $('#start-hour').val() ;
    let endHour = $('#end-hour').val() ;
    $('#datepicker_1').on("change", function () {

        let date = $(this).datepicker('getDate');

        //обновляем слайдер
        let today = new Date();
        let isToday = (today.toDateString() == date.toDateString());
        if (isToday === true) {
            var hour = new Date().getHours() + 2;
            if(hour<9){ hour = 9;}

            startHour = hour;
            endHour = 24;
        }
        else {
            startHour = 9;
            endHour = 24;
        }

        $("#slider-range-time-my").slider("values", [startHour, endHour]);
        $( "#first" ).html(startHour);
        $( "#last" ).html(endHour);

    });


    $("#slider-range-time-my").slider({
        range: true,
        min: 0,
        max: 24,
        values: [startHour, endHour],
        slide: function( event, ui ) {
            if (ui.value < 9) {
                return false;
            }
            let today = new Date();

            let date = $('#datepicker_1').datepicker('getDate');
            if(date === null){
                alert('Выберите дату доставки');
                return false;
            }

            let isToday = (today.toDateString() == date.toDateString());
            if(isToday === true){

                var hour = new Date().getHours()+1;

                if(ui.value<  hour){
                    return false;
                }
            }
            $( "#first" ).html(ui.values[ 0 ]);
            $( "#last" ).html(ui.values[ 1 ]);
            let hourStart = ui.values[ 0 ];
            let hourEnd = ui.values[ 1 ];


            startHour = hourStart;
            endHour =  hourEnd ;


            $('#start-hour').val(hourStart)
            $('#end-hour').val(hourEnd)
        }
    });
}

initDatePicker()
initSliderRange()