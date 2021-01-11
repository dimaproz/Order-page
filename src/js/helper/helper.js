$( document ).ready(function() {
    $('.textarea_hidden p').click(function (){
        $(this).toggleClass('active')
        $(this).next('textarea').slideToggle(300)
    })

    $( "#datepicker_1" ).datepicker();
});