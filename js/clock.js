const clock = document.querySelector("#clock");

function getClock(){
    const date = new Date();

    const hour = String(date.getHours()).padStart(2,"0");
    const minute = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");


    clock.innerText = `${hour}:${minute}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);

