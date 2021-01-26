console.log('Hello console!');

const tickleBox = document.querySelector('#touch-box');
const idleMessage = document.querySelector('#idle-text');
const idleMessage2 = document.querySelector('#idle-text2');
const cheatCode = 'unicorn';
let input = '';
let idleTime;

window.addEventListener('keypress', (evt) => {
  input += evt.key;
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer();
  if(input.length > cheatCode.length) {
    input = input.substr(1);
  }

  if(input === cheatCode) {
    alert(String.fromCodePoint(0x1F984));
  }
});

const mouseCoordinates = (evt) => {
  evt.preventDefault();
  console.log(`Mouse is at x:${evt.pageX}, y:${evt.pageY}`);
};

window.addEventListener('dblclick', mouseCoordinates);

tickleBox.addEventListener('mouseover', (evt) => {
  evt.preventDefault();
  tickleBox.innerHTML = 'Tee hee hee!';
});

tickleBox.addEventListener('mouseleave', (evt) => {
  evt.preventDefault();
  tickleBox.innerHTML = 'Tickle me!';
});

setTimeout(() => {
  idleMessage.innerHTML = 'Tick tock';
}, 15000);

const setIdleTimer = () => {
  idleTime = setTimeout(() => {
    idleMessage2.innerHTML = 'You have been idle for 15 seconds';
  }, 15000);
};

setIdleTimer();

window.addEventListener('mousemove', (evt) => {
  evt.preventDefault();
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer();
});

window.addEventListener('click', (evt) => {
  evt.preventDefault();
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer();
});

window.addEventListener('scroll', (evt) => {
  evt.preventDefault();
  idleMessage2.innerHTML = '';
  clearTimeout(idleTime);
  setIdleTimer();
});
