class Film {
  constructor(id, nombre, contenido, categoria, director, anio, disponibilidad, trailer, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.contenido = contenido;
    this.categoria = categoria;
    this.director = director;
    this.anio = anio;
    this.disponibilidad = disponibilidad;
    this.trailer = trailer;
    this.imagen = imagen;
  }
}

const films = [];
const myList = [];
const cardsContainer = document.getElementById("cardsId");

const btnHome = $('#btninicio');
const btnMyList = $('#btnmilista');
const btnMovies = document.getElementById("btnpelis");
const btnSeries = document.getElementById("btnseries");
const btnAction = document.getElementById("btnaccion");
const btnAnimation = document.getElementById("btnanimacion");
const btnBiopic = document.getElementById("btnbiopic");
const btnSciFi = document.getElementById("btnciencia");
const btnComedy = document.getElementById("btncomedia");
const btnDrama = document.getElementById("btndrama");
const btnHorror = document.getElementById("btnterror");
const btnForm = document.getElementById("btnformulario");

$('#id1').fadeIn(3500);
$('#id1').text("Bienvenid@s a CoderVisión!");

const createCardHTML = (film) => {
  return `<div id="${film.id}" class="card">
    <img src="${film.imagen}" class="card-img-top" onclick="startPlayback('${film.trailer}')">
    <br>
    <h5 class="card-title"><b>${film.nombre}</b></h5>
    <p class="card-text">${film.contenido}-${film.categoria}</p>
    <a href="#" class="btn btn-primary" onclick="addToList('${film.id}')">Agregar a mi lista</a>
  </div>`;
};

const createListCardHTML = (film) => {
  return `<div id="${film.id}" class="card">
    <img src="${film.imagen}" class="card-img-top" onclick="startPlayback('${film.trailer}')">
    <br>
    <h5 class="card-title"><b>${film.nombre}</b></h5>
    <p class="card-text">${film.contenido}-${film.categoria}</p>
    <a href="#" class="btn btn-primary" onclick="removeFromList('${film.id}')">Quitar de mi Lista</a>
  </div>`;
};

const removeChildren = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
};

const loadFilmsArray = async () => {
  $('#id1').text("Bienvenid@s a CoderVisión!");
  removeChildren(cardsContainer);

  try {
    const response = await fetch('films.json');
    const data = await response.json();
    
    data.forEach(film => {
      films.push(film);
      cardsContainer.innerHTML += createCardHTML(film);
    });
  } catch (error) {
    console.error('Error loading films:', error);
  }
};

loadFilmsArray();

const printCards = () => {
  removeChildren(cardsContainer);
  $('#id1').text("Bienvenid@s a CoderVisión!");

  films.forEach(film => {
    cardsContainer.innerHTML += createCardHTML(film);
  });
};

const printContent = (contentType) => {
  removeChildren(cardsContainer);
  const validTypes = ["Película", "Serie"];
  
  if (validTypes.includes(contentType)) {
    $('#id1').text(contentType);

    films.forEach(film => {
      if (film.contenido === contentType) {
        cardsContainer.innerHTML += createCardHTML(film);
      }
    });
  }
};

const printCategory = (category) => {
  const validCategories = ["Terror", "Drama", "Accion", "Animacion", "Comedia", "Biopic", "Ciencia Ficcion"];
  
  if (validCategories.includes(category)) {
    $('#id1').text(category);
    cardsContainer.innerHTML = "";

    films.forEach(film => {
      if (film.categoria === category) {
        cardsContainer.innerHTML += createCardHTML(film);
      }
    });
  }
};

function scrollTopButton(btn) {
  const $scrollBtn = $(btn);

  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();
    scrollTop > 400 ? $scrollBtn.removeClass('hidden') : $scrollBtn.addClass('hidden');
  });

  $scrollBtn.click(function () {
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  });
}

scrollTopButton('.scroll-top-btn');

const printList = () => {
  if (myList.length === 0) {
    swal({
      title: "Error!",
      text: "No hay elementos agregados a la lista",
      icon: "error",
    });
    removeChildren(cardsContainer);
    $('#id1').text("Mi Lista");
    return;
  }

  removeChildren(cardsContainer);
  $('#id1').text("Mi Lista");

  myList.forEach(film => {
    cardsContainer.innerHTML += createListCardHTML(film);
  });
};

const printForm = () => {
  removeChildren(cardsContainer);
  $('#id1').text("Dejanos tu mensaje");

  cardsContainer.innerHTML += `
    <section class="contact">
      <div id="formulario" class="u-wrapper">
        <div class="contact-content">
          <form id="form" action="https://formspree.io/f/mgernele" method="POST" class="form">
            <label for="name" class="formu">Nombre Completo <span>*</span></label>
            <input name="name" required type="text" id="name" placeholder="nombre">
            <label for="email" class="formu">Correo electrónico <span>*</span></label>
            <input name="email" type="text" id="email" required placeholder="nombre@gmail.com">
            <label for="message" class="formu">Mensaje</label>
            <textarea id="message" name="message" cols="30" rows="10"></textarea>
            <button id="botonenviar" type="submit" class="btn primary full">enviar mensaje</button>
          </form>
          <a href="mailto:arturogrottoli@gmail.com" id="idform"></a>
        </div>
      </div>
    </section>`;
};

const searchBar = document.querySelector('#searchbar');
const searchButton = document.querySelector('#searchbutton');

const search = () => {
  if (!searchBar) return;
  
  cardsContainer.innerHTML = '';
  const searchText = searchBar.value.toLowerCase();

  if (!searchText) {
    printCards();
    return;
  }

  const matchingFilms = films.filter(film => 
    film.nombre.toLowerCase().includes(searchText)
  );

  if (matchingFilms.length === 0) {
    swal({
      title: "Error!",
      text: "No se ha encontrado ningun titulo con ese nombre",
      icon: "error",
    });
    return;
  }

  matchingFilms.forEach(film => {
    cardsContainer.innerHTML += createCardHTML(film);
  });
};

if (searchButton) {
  searchButton.addEventListener('click', search);
}
if (searchBar) {
  searchBar.addEventListener('keyup', search);
}

$(btnHome).click(printCards);
$('#btnImagen').click(printCards);
$(btnMyList).click(printList);
$(btnMovies).click(() => printContent("Película"));
$(btnSeries).click(() => printContent("Serie"));
$(btnAction).click(() => printCategory("Accion"));
$(btnAnimation).click(() => printCategory("Animacion"));
$(btnBiopic).click(() => printCategory("Biopic"));
$(btnSciFi).click(() => printCategory("Ciencia Ficcion"));
$(btnComedy).click(() => printCategory("Comedia"));
$(btnDrama).click(() => printCategory("Drama"));
$(btnHorror).click(() => printCategory("Terror"));
$(btnForm).click(printForm);

function startPlayback(trailerUrl) {
  window.location.href = trailerUrl;
}

function addToList(filmId) {
  swal("Quiere agregar el titulo a su lista?", {
    buttons: {
      cancel: "Cancelar",
      agregar: {
        text: "Agregar",
        value: "agregar",
      },
    },
  })
    .then((value) => {
      switch (value) {
        case "agregar":
          const filmIdNum = Number(filmId);
          const filmToAdd = films.find(film => film.id === filmIdNum);

          if (filmToAdd && filmToAdd.disponibilidad === true) {
            myList.push(filmToAdd);
            filmToAdd.disponibilidad = false;
            console.log(myList);
            swal("Ok!", "Titulo agregado a la lista", "success");
            break;
          } else {
            swal("Error", "El titulo ya está en tu lista", "error");
            break;
          }

        default:
          swal("cancelado!", "No se agregó el titulo", "error");
      }
    });
}

function removeFromList(filmId) {
  swal("Quiere quitar el titulo de su lista?", {
    buttons: {
      cancel: "Cancelar",
      quitar: {
        text: "Quitar",
        value: "quitar",
      },
    },
  })
    .then((value) => {
      switch (value) {
        case "quitar":
          const filmIdNum = Number(filmId);
          const filmIndex = myList.findIndex(film => film.id === filmIdNum);
          const filmToRemove = myList[filmIndex];

          if (filmToRemove && filmToRemove.disponibilidad === false) {
            myList.splice(filmIndex, 1);
            filmToRemove.disponibilidad = true;
            console.log(filmToRemove);
            swal("Ok!", "Titulo quitado de la lista", "success");

            removeChildren(cardsContainer);

            myList.forEach(film => {
              cardsContainer.innerHTML += createListCardHTML(film);
            });
            console.log(myList);
            break;
          }

        default:
          swal("cancelado!", "No se quitó el titulo", "error");
      }
    });
}

document.querySelector('.menu-btn').addEventListener('click', () => {
  document.querySelector('.navbar .items').classList.toggle('show');
});

document.querySelector('.cancel-btn').addEventListener('click', () => {
  document.querySelector('.navbar .items').classList.toggle('show');
});
