"use strict";

var calculateFunc = (orders, costHours, openDays, servingTime, docket, POS)=>{
    if(openDays > 365){
        alert("Could you please confirm the days on which your restaurant is open per year? Thank you.")
        $("#calculate-op").focus();
        return false;
    }
    if(servingTime < 30){
        alert("Could you please check the time at which you took the order? It appears to be the second time. Thank you.")
        $("#calculate-time").focus();
        return false;
    }
    var hours = (orders * servingTime * openDays) / 60 / 60;
    var total = (((orders * servingTime * openDays) / 60 / 60 ) * costHours) + (docket * 12) + (POS * 12);
    var docket = (docket * 12) + (POS * 12);
    $("#caculateHours").html(hours.toFixed(2));
    $("#caculateResult").html(docket.toFixed(2));
}

var callAPIContactUS = (contactemail)=>{
    const oribtn1 = document.getElementById('contactusbtn1');
    const spinner1 = document.getElementById('contactusbtnspinner1');
    const oribtn2 = document.getElementById('contactusbtn2');
    const spinner2 = document.getElementById('contactusbtnspinner2');
    spinner1.style.display = 'none';
    oribtn1.style.display = 'block';
    spinner2.style.display = 'none';
    oribtn2.style.display = 'block';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"email":contactemail});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://5klie8libd.execute-api.ap-southeast-2.amazonaws.com/default/orderking_contactus", requestOptions)
    .then(response => response.text())
    .then(result =>
        {
            spinner1.style.display = 'none';
            oribtn1.style.display = 'block';
            spinner2.style.display = 'none';
            oribtn2.style.display = 'block';
            alert("We appreciate your interest and will make every effort to contact you as soon as possible. Thank you for your patience.")
        })
    .catch(error =>
        {
            spinner1.style.display = 'none';
            oribtn1.style.display = 'block';
            spinner2.style.display = 'none';
            oribtn2.style.display = 'block';
            console.log('error', error)
        });
    event.preventDefault();
    $("#emailaddress").val("");
    $("#emailaddress-validate").val("");
}