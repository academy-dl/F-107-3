const MONTHS = ["Январь", "Февраль", "Март", "Апр.", "Май", "Июнь", "Июль", "Авгус", "Сентябрь", "Октябрь"];

(function() {
  let date = new Date('2021-06-06T15:23:45.761Z');

  console.log(`${date.getDate()} число. Месяц:${MONTHS[date.getMonth()]}. Год:${date.getFullYear()} `);
})();

(function() {
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
      localStorage.setItem('activeSlide', index);
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
    initialActivIndex: +localStorage.getItem('activeSlide') || 0,
  });
})();

function getParamsFromLocation() {
  let searchParams = new URLSearchParams(location.search);
  return {
    name: searchParams.get('name') || '',
    selectOf: searchParams.getAll('selectOf'),
    option: searchParams.get('option'),
    page: +searchParams.get('page') || 0,
  };
}

function setDataToFilter(data) {
  const form = document.forms.filter;
  form.elements.name.value = data.name;
  form.elements.selectOf.forEach(checkbox => {
    checkbox.checked = data.selectOf.includes(checkbox.value);
  });
  form.elements.option.forEach(radio => {
    radio.checked = data.option === radio.value;
  });
}

function setSearchParams(data) {
  let searchParams = new URLSearchParams();
  searchParams.set('name', data.name);
  data.selectOf.forEach(item => {
    searchParams.append('selectOf', item);
  });
  if (data.page) {
    searchParams.set('page', data.page);
  } else {
    searchParams.set('page', 0);
  }
  if(data.option) {
    searchParams.set('option', data.option);
  }
  history.replaceState(null, document.title, '?' + searchParams.toString());
}

function getData(params) {
  const result = document.querySelector('.result_js');
  result.innerHTML = JSON.stringify(params, null, 2);
}

(function() {
  const form = document.forms.filter;
  form.addEventListener('submit', e => {
    e.preventDefault();
    let data = {
      page: 0,
    };
    data.name = form.elements.name.value;
    data.selectOf = [...form.elements.selectOf]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
    data.option = ([...form.elements.option]
    .find(radio => radio.checked) || {value: null}).value;
    getData(data);
    setSearchParams(data);
  });

  const params = getParamsFromLocation();
  setDataToFilter(params);
  getData(params);
  
  const links = document.querySelectorAll('.link_js');
  links[params.page].classList.add('active');
  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      let searchParams = new URLSearchParams(location.search);
      let params = getParamsFromLocation();
      links[params.page].classList.remove('active');
      searchParams.set('page', index);
      links[index].classList.add('active');
      history.replaceState(null, document.title, '?' + searchParams.toString());
      getData(getParamsFromLocation());
    });
  });
})();