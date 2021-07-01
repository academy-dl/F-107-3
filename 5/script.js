// const h1 = document.querySelector('.title_js');
// setTimeout(() => {
//   h1.style.color = 'blue';
//   h1.setAttribute('data-error', 'Ошибка, которая пришла не пойми отукда :(');
// }, 2000);

// (()=> {
//   console.log('text');
// })()

(function() {
  let ownContextMenu = event => {
    console.log(event);
  }

  window.addEventListener(
    "keydown",
    ownContextMenu
  );
});


(function () {
  const button = document.querySelector('.button-to-top_js');
  
  if(!button)
    return;

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  });

  window.addEventListener('scroll', (e) => {
    if(window.pageYOffset > 1000) {
      button.classList.remove('button-to-top_hidden');
    }
    if(window.pageYOffset <= 1000) {
      button.classList.add('button-to-top_hidden');
    }
  });
})();

(function () {
  const contextmenu = document.querySelector('.contextmenu_js');
  if(!contextmenu) {
    return;
  }
  const btn = contextmenu.querySelector('.contextmenu__button_js');

  if(!btn) {
    return;
  }


  function closeMenu() {
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('click', clickHandler);
    window.removeEventListener('keydown', escHandler);
    contextmenu.classList.add('contextmenu_hidden');
  }

  btn.addEventListener('click', () => {
    closeMenu();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  });

  function scrollHandler(e) {
    console.log('scrollHandler');
    closeMenu();
  }
  
  function clickHandler(e) {
    console.log('clickHandler');
    if(!contextmenu.contains(e.target)) {
      closeMenu();
    }
  }

  function escHandler(e) {
    console.log('escHandler');
    if(e.keyCode === 27) {
      closeMenu();
    }
  }

  window.addEventListener('contextmenu', e => {
    e.preventDefault();
    contextmenu.style.top = `${e.clientY}px`;
    contextmenu.style.left = `${e.clientX}px`;
    contextmenu.classList.remove('contextmenu_hidden');
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('click', clickHandler);
    window.addEventListener('keydown', escHandler);
  });
})();
