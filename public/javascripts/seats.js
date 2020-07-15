$(document).ready(() => {

    // $('.ui.checkbox').checkbox();

    document.querySelector('.ajaxsend').addEventListener('click', () => {
        let ajaxData = {};
        let seatNum = document.forms[0].length - 1;
        // let inputdata = document.forms[0].elements[0];
        // let inputdata2 = document.forms[0].elements[1];
        
        for(let i = 1; i < seatNum + 1 ; i++) {
            if ($(`#seat${i}`).is(":checked") === true) { // 체크박스 체크 된 상태: true
                ajaxData[`inputdata${i}Id`] = 1;
            } else { // 체크박스 체크 안된 상태
                ajaxData[`inputdata${i}Id`] = 0;
            }
        }
        
        sendAjax('/seat_post', ajaxData);
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
            
            console.log(result);
            alert(result);
        });
    }

    $('.ui.dropdown').dropdown()
;
});

