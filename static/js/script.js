function createTable() {
    pageCounter = 1;
    $.ajax({ 
        type: 'GET', 
        url: 'https://swapi.co/api/planets?page=' + pageCounter, 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) { 
            $.each(data.results, function(index, planet) {
                let residents = "";
                if (planet.residents.length === 0) {
                    residents = 'No known residents';
                } else {
                    residents = `<button data-buttonid="${planet.url}"
                                class="residentButton">
                                ${planet.residents.length} resident(s)
                                </button>`;
                }
                $('#tableContainer').append($(`
                                    <tr>
                                        <td>${planet.name}</td>
                                        <td>${planet.diameter}</td>
                                        <td>${planet.climate}</td>
                                        <td>${planet.terrain}</td>
                                        <td>${planet.surface_water}</td>
                                        <td>${planet.population}</td>
                                        <td>${residents}</td>
                                    </tr>`));
            });
            eventListenerToButtons();
        }
    });
}


function eventListenerToButtons() {
    var resButtons = $('.residentButton');

    for (let i = 0; i < resButtons.length; i++) {
    resButtons[i].addEventListener("click", createModal);
    };
}


function createModal(event) {
    let clickedButton = this;
    var planetUrl = clickedButton.dataset['buttonid'];
    for (let i = 1; i <= 10; i++) {
        $.ajax({ 
            type: 'GET', 
            url: 'https://swapi.co/api/people?page=' + i, 
            data: { get_param: 'value' }, 
            dataType: 'json',
            success: function (data) { 
                $.each(data.results, function(index, res) {
                    if (planetUrl === res.homeworld) {
                        $('#residentsModal').append($(`
                                <tr>
                                    <td>${res.name}</td>
                                    <td>${res.height}</td>
                                    <td>${res.mass}</td>
                                    <td>${res.skin_color}</td>
                                    <td>${res.hair_color}</td>
                                    <td>${res.eye_color}</td>
                                    <td>${res.birth_year}</td>
                                    <td>${res.gender}</td>
                                </tr>`));
                    }
                });
            }
        });
    }
    document.getElementById('id01').style.display='block';
}

document.getElementById("closeModal").addEventListener("click", emptyModal);

function emptyModal() {
    document.getElementById("residentsModal").innerHTML = "";
    document.getElementById('id01').style.display='none';
}

$( document ).ready(function() {

    createTable();
    
});