$(document).ready(() => {

    let selectedStore = {};

    $('.ui.dropdown').dropdown({
        onChange: function(value) {
            // console.log(`value = ${value}`);
            selectedStore['storename'] = value;
            $('.store_button a').attr('href', `/seats/${value}`); 
        }
    });

    $('.store_button').on('click', () => {
        if ($('.store_button a').attr('href') === undefined)
            alert('가게를 선택하세요');
    });

    document.querySelector('.submit_seat_button').addEventListener('click', () => {
        let seatData = {};
        let seatNum = document.forms[0].length - 1;
        // let inputdata = document.forms[0].elements[0];
        // let inputdata2 = document.forms[0].elements[1];
        
        for(let i = 1; i < seatNum + 1 ; i++) {
            if ($(`#seat${i}`).is(":checked") === true) { // 체크박스 체크 된 상태: true
                seatData[`inputdata${i}Id`] = 1;
            } else { // 체크박스 체크 안된 상태
                seatData[`inputdata${i}Id`] = 0;
            }
        }
        seatData['storename'] = $('#seat_box img').attr('alt');
        sendAjax('/seat_submit', seatData);
    });

    function sendAjax(url, data) {
        data = JSON.stringify(data);
        // console.log(data);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(data);

        xhr.addEventListener('load', () => { 
            let result = JSON.parse(xhr.responseText);
            alert(result);
        });
    }
});

