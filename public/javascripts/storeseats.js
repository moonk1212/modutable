$(document).ready(() => {

    $('.ui.dropdown').dropdown({
        onChange: function(value) {
            // console.log(`value = ${value}`);
            $('.store_button a').attr('href', `/seats/${value}`); 
            $('#selected_store').css('color', 'black');
        }
    });

    $('.store_button').on('click', () => {
        if ($('.store_button a').attr('href') === undefined)
            alert('가게를 선택하세요');
    });
});