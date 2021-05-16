'use strict';


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const section = document.querySelectorAll('.section');

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

// Tabbed Box

tabsContainer.addEventListener('click', (el) => {
  const clicked = el.target.closest('.operations__tab');

  // Guard Claouse
  if(!clicked) return;

  // Activate tab
  tabs.forEach((t) => {
    t.classList.remove('operations__tab--active');
  })

  tabsContent.forEach((t) => {
    t.classList.remove('operations__content--active');
  })
  
  clicked.classList.toggle('operations__tab--active');

  // Activate tab content area

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

// Menu Fade Animation

const handleHover = (e, opacity) => {
    if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', (e) => {
  handleHover(e, 0.5)
});

nav.addEventListener('mouseout', (e) => {
  handleHover(e, 1)
});

//Sticky Navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', () => {
  // console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
})


// Reveal Sections

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  } else {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }

}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden')
})


// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace SRC attribute
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
});

imgTargets.forEach((img) => {

  imgObserver.observe(img)

});

// Testimonial Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;


const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

createDots();

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach((dot) => {
    dot.classList.remove('dots__dot--active');
  });

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}


// Create a function for Go To particular Slide (for dots)

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  });
}
goToSlide(0);

const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';  

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`
});


// Next Slide

btnRight.addEventListener('click', () => {


  if (currentSlide === maxSlide - 1) {
    currentSlide = 0
  } else {
    currentSlide++;
  }
  

  goToSlide(currentSlide);

  activateDot(currentSlide);

});

// Prev Slide

btnLeft.addEventListener('click', () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);

  activateDot(currentSlide);

});

// On Lef Key and Right Key, Move Slides

// document.addEventListener('keydown', function(e) {
//   if (e.key === 'ArrowLeft') {
//     if (currentSlide === 0) {
//         currentSlide = maxSlide - 1;
//       } else {
//         currentSlide--;
//       }

//     slides.forEach((s, i) => {
//       s.style.transform = `translateX(${100 * (i - currentSlide)}%)`
//     });
//   };

//   if (e.key === 'ArrowRight') {
//     if (currentSlide === maxSlide - 1) {
//       currentSlide = 0
//       } else {
//         currentSlide++;
//       }
      
//       slides.forEach((s, i) => {
//         s.style.transform = `translateX(${100 * (i - currentSlide)}%)`
//       });
//   }
// });

// Move slide onClick Dots

dotContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
})

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

// console.log(h1.querySelectorAll('.highlight'));

// console.log(h1.childNodes);
// console.log(h1.children);

// console.log(h1.firstElementChild.style.color = 'red');

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach((el) => {
//   if (el !== h1) {
//     el.style.transform = 'scale(1.5)';
//   }
// })