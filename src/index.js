console.log('Hello console!');

const tickleBox = document.querySelector('#touch-box');
const idleMessage = document.querySelector('#idle-text');
const idleMessage2 = document.querySelector('#idle-text2');
const pageCoords = document.querySelector('.coords');
const cheatCode = 'unicorn';
let input = '';
let idleTime;

window.addEventListener('keypress', (evt) => {
  input += evt.key;
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer(5);
  if(input.length > cheatCode.length) {
    input = input.substr(1);
  }

  if(input === cheatCode) {
    alert(String.fromCodePoint(0x1F984));
  }
});

const mouseCoordinates = (evt) => {
  evt.preventDefault();
  pageCoords.textContent = 'Mouse is at X: ' + evt.pageX + ' Y: '+ evt.pageY;
};

window.addEventListener('dblclick', mouseCoordinates);

tickleBox.addEventListener('touchstart', (evt) => {
  tickleBox.innerHTML = 'Tee hee hee!';
});

tickleBox.addEventListener('touchend', (evt) => {
  tickleBox.innerHTML = 'Tickle me!';
});

setTimeout(() => {
  idleMessage.innerHTML = 'Tick tock';
}, 15000);

const setIdleTimer = (seconds) => {
  idleTime = setTimeout(() => {
    idleMessage2.innerHTML = `You have been idle for ${seconds} seconds`;
  }, seconds * 1000);
};

setIdleTimer(5);

window.addEventListener('mousemove', (evt) => {
  evt.preventDefault();
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer(5);
});

window.addEventListener('click', (evt) => {
  evt.preventDefault();
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer(5);
});

window.addEventListener('scroll', (evt) => {
  evt.preventDefault();
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer(5);
});
