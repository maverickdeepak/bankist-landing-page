'use strict';


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// For Smooth Scroll to a Section of Learn more button

btnScrollTo.addEventListener('click', function(e) {

  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(window.pageXOffset, window.pageYOffset);

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset, 
  //   s1coords.top + window.pageYOffset
  // );

  window.scrollTo({
    left : s1coords.left + window.pageXOffset, 
    top : s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  });

  // section1.scrollIntoView({behavior:'smooth'}); == this is a shorthand property - not working on old browser
})

// Page Navigation

document.querySelectorAll('.nav__link').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  });
});

////////////////////////////////////

// Selecting Elements

// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelector('.section');

// console.log(allSections);

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));


// // Creating and insertiing elements

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improve functionality and analytics.';
// message.innerHTML = 'We use cookies for improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message);

// // delete element
// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//   message.parentElement.removeChild(message);
// })

// // Styles in JS
// message.style.backgroundColor = '#37383d';
// message.style.width = '100%';

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// logo.alt = 'Beautiful Logo Design';
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute('src'))

// logo.setAttribute('Company', 'The Coders Cave');

// // Data Attributes



// Events in JS

// const alertEvent = function(e) {
//   alert('addEventListner');
// }

// h1.addEventListener('mouseenter', alertEvent);

// setTimeout(() => h1.removeEventListener('mouseenter', alertEvent), 8000);

// h1.onmouseenter = (e) => {
//   alert('Hello H1');
// }

// Event Propagation rgba(255, 255, 255);

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

const h1 = document.querySelector('h1');

console.log(h1.querySelectorAll('.highlight'));

console.log(h1.childNodes);
console.log(h1.children);

console.log(h1.firstElementChild.style.color = 'red');