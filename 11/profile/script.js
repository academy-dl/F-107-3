(function () {
  const profileImg = document.querySelector(".j-profile-img");
  const profileName = document.querySelector(".j-profile-name");
  const profileSurname = document.querySelector(".j-profile-surname");
  const profileEmail = document.querySelector(".j-profile-email");
  const profileLocation = document.querySelector(".j-profile-location");
  const profileAge = document.querySelector(".j-profile-age");

  const buttonOpeningModalEditing = document.querySelector(".j-editing-button");
  const modalEditing = document.querySelector(".j-modal-editing");
  const modalLoader = modalEditing.querySelector(".loader_js");
  const buttonCloseModalEditing = document.querySelector(".j-close-modal-editing");

  const editingForm = document.forms.editingForm;
  const mainLoader = document.querySelector('.main-loader_js');
  let profile = null;
  let loaderCount = 0;

  rerenderLinks();

  function showLoader() {
    loaderCount++;
    mainLoader.classList.remove('hidden');
  }

  function hiddenLoader() {
    loaderCount--;
    if (loaderCount <= 0) {
      loaderCount = 0;
      mainLoader.classList.add('hidden');
    }
  }

  getProfile();

  function changeData(e) {
    e.preventDefault();
    modalLoader.classList.remove('hidden');
    const data = new FormData(editingForm);
    sendRequest({
      method: 'PUT',
      url: '/api/users',
      body: data,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        location.pathname = '/11';
        return;
      }
      return res.json();
    })
    .then(res => {
      if(res.success) {
        profile = res.data;
        renderProfile();
      } else {
        throw res;
      }
    })
    .catch(err => {
      if(err._message) {
        alert(err._message);
      }
      clearErorrs(editingForm);
      errorFormHandler(err.errors, editingForm);
    })
    .finally(() => {
      modalLoader.classList.add('hidden');
    })
  }

  function renderProfile() {
    profileImg.style.backgroundImage = `url(${BASE_SERBER_PATH + profile.photoUrl})`;
    profileName.innerText = profile.name;
    profileSurname.innerText = profile.surname;
    profileEmail.innerText = profile.email;
    profileLocation.innerText = profile.location;
    profileAge.innerText = profile.age;
  }

  function getProfile() {
    showLoader();
    sendRequest({
      method: 'GET',
      url: `/api/users/${localStorage.getItem('userId')}`,
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          profile = res.data;
          renderProfile();
        } else {
          location.pathname = '/11'
        }
      })
      .finally(() => {
        hiddenLoader();
      })
  }

  buttonOpeningModalEditing.addEventListener('click', () => {
    editingForm.email.value = profile.email;
    editingForm.name.value = profile.name;
    editingForm.surname.value = profile.surname;
    editingForm.location.value = profile.location;
    editingForm.age.value = profile.age;
    interactionModal(modalEditing)
  });
  buttonCloseModalEditing.addEventListener('click', () => {
    interactionModal(modalEditing)
  });

  modalEditing.addEventListener('submit', (e) => {
    changeData(e)
  });
})();