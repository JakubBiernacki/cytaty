const select = document.querySelector('.custom-select')

function add_option(autor){
    const option = document.createElement('option')
    option.value = autor.id
    option.innerText = autor.imie

    select.appendChild(option)

}


fetch('http://127.0.0.1:8000/api/autor/',{headers: {'Authorization': 'Basic ' + btoa('jakub:toor')}}
).then(response => response.json()
).then(data => data.forEach(element => add_option(element)))

