function Slider(selector, options = {initialActivIndex: 0}) {
  const slider = document.querySelector(selector);
  const wrapper = slider.querySelector('.slider__wrapper');
  const innerWrapper = wrapper.querySelector('.slider__inner-wrapper');
  const slides = [...wrapper.querySelectorAll('.slider__slide')];
  const buttonBack = slider.querySelector('.slider__button_back');
  const buttonNext = slider.querySelector('.slider__button_next');
  const pagination = slider.querySelector('.slider__pagination');
  const slidesCount = slides.length;
  let dots = [];
  const animationDuration = 500;
  let siledWidth = 0;
  let activeSlideIndex = options.initialActivIndex;
  let id = null;
  let percentDiff = 0.2;
  let clientX = 0;
  let lastClientX = 0;
  let checkerMouseDown = false;
  let isTouched = false;

  wrapper.addEventListener('touchstart', (e) => {
    isTouched = true;
    const touch = e.touches[0];
    clientX = touch.clientX;
    lastClientX = touch.clientX;
  });

  
  wrapper.addEventListener('touchmove', (e) => {
    if(!isTouched) {
      return;
    }
    const touch = e.touches[0];
    lastClientX = touch.clientX;
    setActiveSlide(activeSlideIndex, false, clientX - lastClientX);
  });

  
  wrapper.addEventListener('touchend', (e) => {
    if(!isTouched) {
      return;
    }
    isTouched = false;
    if(clientX - lastClientX > percentDiff * siledWidth) {
      nextSlide();
    } else if(lastClientX - clientX > percentDiff * siledWidth) {
      prevSlide();
    } else {
      setActiveSlide(activeSlideIndex);
    }
  });


  wrapper.addEventListener('mousedown', (e) => {
    checkerMouseDown = true;
    clientX = e.clientX;
  });

  function endMouseEvent(e) {
    if(!checkerMouseDown) {
      return;
    }
    checkerMouseDown = false;
    if(clientX - e.clientX > percentDiff * siledWidth) {
      nextSlide();
    } else if(e.clientX - clientX > percentDiff * siledWidth) {
      prevSlide();
    }
  }
  
  wrapper.addEventListener('mouseup', endMouseEvent);
  wrapper.addEventListener('mouseout', endMouseEvent);

  initWidth();
  createDots();
  setActiveSlide(activeSlideIndex, false);

  window.addEventListener('resize', () => {
    initWidth();
    setActiveSlide(activeSlideIndex, false);
  });

  buttonNext.addEventListener('click', () => {
    nextSlide();
  });

  buttonBack.addEventListener('click', () => {
    prevSlide();
  });

  function nextSlide() {
    setActiveSlide(activeSlideIndex + 1);
  }
  
  function prevSlide() {
    setActiveSlide(activeSlideIndex - 1);
  }

  function createDots() {
    for (let i = 0; i < slidesCount; i++) {
      const dot = createDot(i);
      dots.push(dot);
      pagination.insertAdjacentElement('beforeend', dot);
    }
  }

  function createDot(index) {
    const dot = document.createElement('button');
    dot.classList.add('slider__dot');

    if (index === activeSlideIndex) {
      dot.classList.add('slider__dot_active');
    }

    dot.addEventListener('click', () => {
      setActiveSlide(index);
    });

    return dot;
  }

  function setActiveSlide(index, withAnimation = true, diff = 0) {
    if (index < 0 || index >= slides.length) {
      return;
    }
    if (withAnimation) {
      clearTimeout(id);
      innerWrapper.style.transition = `transform ${animationDuration}ms`;
      id = setTimeout(() => {
        innerWrapper.style.transition = '';
      }, animationDuration);
    }
    buttonBack.removeAttribute('disabled');
    buttonNext.removeAttribute('disabled');

    if (index === 0) {
      buttonBack.setAttribute('disabled', '');
    }

    if (index === slides.length - 1) {
      buttonNext.setAttribute('disabled', '');
    }
    innerWrapper.style.transform = `translateX(-${siledWidth * index + diff}px)`;
    dots[activeSlideIndex].classList.remove('slider__dot_active');
    dots[index].classList.add('slider__dot_active');
    activeSlideIndex = index;
  }

  function initWidth() {
    siledWidth = wrapper.offsetWidth;

    slides.forEach(slide => {
      slide.style.width = `${siledWidth}px`;
    });
  }

  return {
    nextSlide,
    prevSlide,
  }
}

const customSwiper = new Slider('.slider', {
  initialActivIndex: 1,
});


const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,

  slidesPerView: 3,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});