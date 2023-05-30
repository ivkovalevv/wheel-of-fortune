/* Fortune While */

let spinContainer = document.querySelector('.spin-container');
let btn = document.getElementById('spin');
let number = (Math.random() * (5000 - 4000 + 1)) + 4000;
let popup = document.querySelector('.popup');
let prize = ['2 дополнительных перерыва. (без учета в % пауз)', '+3 волшебных часа (3 оплаченных часа, которые не нужно отрабатывать)', 'Суперприз (для получения обратиться к СПРВ).', 'Премия в 500 руб.', 'Премия в 1000 руб.', 'Оплачиваемый выходной', 'Сертификат на 500 руб. для заказа в ПМ', 'Сертификат на 500 руб. для заказа в Сакуре', 'Сертификат на 1000 руб. для заказа в ПМ', 'Сертификат на 1000 руб. для заказа в Сакуре'];
let messagePriz = document.querySelector('.message');
let textareaPriz = document.querySelector('.textarea');
let submitBtn = document.querySelector('.popup-btn');
let closeBtn = document.querySelector('.close-btn');
let container = document.querySelector('.container');
let loader = document.querySelector('.loader');

/* Message TG */
const TOKEN = "6228022982:AAHyXdWb1OSkxdtmvESSt5sgQEm4WCRwmC0"; /* 5622772998:AAFnLU5B688CN94dVpuIcXIj38mlDX_76Jk */ 
const CHAT_ID = "-1001875662852";  /* -1001628030640 */ 
const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
const success = document.getElementById('success');


/* Fortune While */
btn.onclick = function () {
    spinContainer.style.transform = "rotate(" + number + "deg)";
    number += Math.ceil(Math.random() * (5000 - 4000 + 1)) + 4000;
    messagePriz.innerHTML += randomPrize();
    messagePriz.style.opacity = '1';
    textareaPriz.innerHTML += `${messagePriz.innerHTML}`;
}

btn.addEventListener('click', () => {
    btn.disabled = btn.onclick;
    setTimeout("popup.classList.add('active')", 1500); /* 14500 */
});

function randomPrize (){
    return prize[Math.floor(Math.random() * prize.length)]
}

closeBtn.onclick = function () {
    popup.style.display = "none";
    container.classList.add('container-opacity');
    loader.classList.add('loader-block');
    url=this.href;
    setTimeout('location.href=url', 3000);
    this.href='javascript:void(0)';
}

/* Message TG */
document.getElementById('tg').addEventListener('submit', function(e) {
    e.preventDefault();

    let message = `<b>У нас есть победитель!</b>\n`;
    message += `<b>Оператор: </b> ${ this.name.value }\n`;
    message += `<b>Приз: </b> ${ document.querySelector('.textarea').textContent }`;
    
    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message 
    })
    .then((res) => {
        this.name.value = "";
        document.querySelector('.textarea').textContent = "";
        success.innerHTML = "Сообщение отправлено!";
        submitBtn.classList.add('btn-remove');
        setTimeout("success.classList.add('alert-block')", 1700);
        setTimeout("closeBtn.classList.add('close-btn-active')", 3500);  
    })
    .catch((err) => {
        console.warn(err);
    })
    .finally(() => {
        console.log('Конец');
    })
})