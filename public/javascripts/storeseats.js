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

    // 가게별 css 불러오기
    let storeName = $('#selected_store').html();

    $('head').append(`<link rel="stylesheet" type="text/css" href="../stylesheets/seats_${storeName}.css">`);

    switch (storeName) {
        case 'algo':
            $('#selected_store').html('알고탭하우스');
            break;
        case 'gongdae2':
            $('#selected_store').html('공대오빠');
            break;
        case 'likechicken':
            $('#selected_store').html('치킨처럼');
            break;
        default:
            $('#selected_store').html('가게를 선택하세요');
            break;
    }
});