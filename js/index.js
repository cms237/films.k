$(document).ready(function () {

    $('form').submit(function (e) {
        e.preventDefault()
        var valeur=$('input').val()
        getFilm(valeur)
    });


    async function getFilm(Titre) {
        
        try {
          const response = await axios.get('https://www.omdbapi.com/?apikey=9d09d4ed&s='+Titre);
          var films=response.data.Search
          $.each(films, function (index, item) { 
            if (item.Poster!=='N/A') {
                $('.films').append(
                    `<div class="col-lg-3 col-md-6">
                        <div class="card mb-3">
                            <img src="${item.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${item.Title}</h5>
                                <a href="#" class="btn btn-primary" onclick="getSingleFilm('${item.imdbID}')">Lire Plus</a>
                            </div>
                        </div>
                    </div>`
                );
               
            }
          });
        } catch (error) {
          console.error(error);
        }
    }

  
   
});

const getSingleFilm=(id)=>{
    sessionStorage.setItem('id',id)
    window.location.pathname='../page/filmitem.html'
    return false
}

async function getIdFilm() {
    try {
      const response = await axios.get('https://www.omdbapi.com/?apikey=9d09d4ed&i='+sessionStorage.getItem('id'));
      console.log(response.data);
      let filmitem=response.data
      $('.img').html('<img src='+filmitem.Poster+' class="img-fluid">');
      $('.film').html(
        `<ul class="list-group">
            <li class="list-group-item"><strong>LE TITRE</strong> ${filmitem.Titre}</li>
            <li class="list-group-item"><strong>LES PRINCIPAUX ACTEURS</strong> ${filmitem.Actors}</li>
            <li class="list-group-item"><strong>LE BUDGET DU FILM</strong> ${filmitem.BoxOffice}</li>
            <li class="list-group-item"><strong>LE PAYS D'ORIGINE</strong> ${filmitem.Country}</li>
            <li class="list-group-item"><strong>ANNEE DE SORTIE</strong> ${filmitem.Year}</li>
            <li class="list-group-item"><strong>DATE DE SORTIE</strong>${filmitem.DVD}</li>
            <li class="list-group-item"><strong>LE REALISATEUR</strong> ${filmitem.Director}</li>
            <li class="list-group-item"><strong>LES SENARISTES</strong> ${filmitem.Writer}</li>
            <li class="list-group-item"><strong>LA DESCRIPTION</strong> ${filmitem.Plot}</li>
        </ul>`
      );
    } catch (error) {
      console.error(error);
    }
}