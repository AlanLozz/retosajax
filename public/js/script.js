const http = new XMLHttpRequest();
var url = '';
const movies = document.getElementById('movieslist');
const movieVisualizer = document.getElementById('movieWatcher');
const movieSubmit = document.getElementById('MovieSubmit');
const repartoInput = document.getElementById('MovieReparto');
const tagContainer = document.querySelector('.tag-container');
var tags = [];
var obj;

setInterval(cargarDatos, 5000);

function cargarDatos() {
    url = '/getmovies';
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            movies.innerHTML = "";
            obj = JSON.parse(this.responseText);
            obj.forEach((d, i) => {
                movies.innerHTML += `
                    <li class="list-group-item list-group-item-action" style="cursor:pointer;" onclick="getMovie(${i})">
                        ${d.titulo}
                    </li>
                    `
            });
        }
    }

    http.open("GET", url);
    http.send();
    return;
};

cargarDatos();

function getMovie(index) {
    movieVisualizer.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <img src="${obj[index].image}" alt="${obj[index].titulo}" class="img-fluid rounded bordborder-success p-1">
                </div>
                <div class="col-8">
                    <h3>${obj[index].titulo}</h3>
                    <span class="text-muted">${obj[index].director}</span>
                    <br>
                    <span>
                        <h6>Reparto:</h6>
                        <span>${obj[index].reparto}.</span>
                    </span>
                    <h5 class="mt-2">Sinopsis: </h5>
                    <span>${obj[index].descripcion}</span>
                    <br>
                    <h5>Calificar</h5>
                    <div class="star-container">
                        <input type="radio" name="calificar" id="star-5" onclick="rateMovie(${index}, 5)" ${obj[index].rate == 5 ? "checked" : ""}>
                        <label for="star-5" class="fas fa-star"></label>
                        <input type="radio" name="calificar" id="star-4" onclick="rateMovie(${index}, 4)" ${obj[index].rate == 4 ? "checked" : ""}>
                        <label for="star-4" class="fas fa-star"></label>
                        <input type="radio" name="calificar" id="star-3" onclick="rateMovie(${index}, 3)" ${obj[index].rate == 3 ? "checked" : ""}>
                        <label for="star-3" class="fas fa-star"></label>
                        <input type="radio" name="calificar" id="star-2" onclick="rateMovie(${index}, 2)" ${obj[index].rate == 2 ? "checked" : ""}>
                        <label for="star-2" class="fas fa-star"></label>
                        <input type="radio" name="calificar" id="star-1" onclick="rateMovie(${index}, 1)" ${obj[index].rate == 1 ? "checked" : ""}>
                        <label for="star-1" class="fas fa-star"></label>
                    </div>
                </div>
            </div>
        </div>
        `;
};

function rateMovie(index, qualify) {
    url = `/updaterating/${index}/${qualify}`;
    console.log(index, qualify);
    obj[index].rate = qualify;
    http.open("GET", url);
    http.send();
};

function createTag(label) {
    const span = document.createElement('span');
    const i = document.createElement('i');
    i.setAttribute('class', 'fas fa-times');
    i.setAttribute('data-item', label);
    span.setAttribute('class', 'tag');
    span.innerHTML = label;
    span.appendChild(i);
    return span;
}

function clearTags() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    });
}

function addTags() {
    clearTags();
    tags.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
    });
}

repartoInput.addEventListener('keyup', e => {
    if (e.key == "Control") {
        tags.push(e.target.value)
        addTags();
        repartoInput.value = '';
    }
});

document.addEventListener('click', e => {
    if (e.target.tagName == "I") {
        let tagLabel = e.target.getAttribute('data-item');
        let index = tags.indexOf(tagLabel);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
    }
});

movieSubmit.addEventListener("click", e => {
    e.preventDefault();
    url = "/addmovie"
    var fd = new FormData;
    fd.append("titulo", document.getElementById('MovieTitle').value);
    fd.append("year", document.getElementById('MovieYear').value);
    fd.append("director", document.getElementById('MovieDirector').value);
    fd.append("reparto", tags);
    fd.append("sinopsis", document.getElementById('MovieSinopsis').value);
    fd.append("image", document.getElementById('MovieImage').files[0]);

    http.open("POST", url);
    http.send(fd);
    reload();
});

function reload() {
    document.getElementById('MovieTitle').value = "";
    document.getElementById('MovieYear').value = "";
    document.getElementById('MovieDirector').value = "";
    document.getElementById('MovieSinopsis').value = "";
    document.getElementById('MovieImage').files[0] = "";
    document.getElementById('btnModal').click();
    tagContainer.innerHTML = "";
    cargarDatos();
}