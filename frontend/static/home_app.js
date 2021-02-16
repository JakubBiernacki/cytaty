const select = document.querySelector('.custom-select')

const tresc = document.querySelector('#cytat')
const podpis = document.querySelector('#autor')

const author_img = document.querySelector('.img-thumbnail')

function add_option(autor){
    const option = document.createElement('option')
    option.value = autor.id
    option.innerText = autor.imie

    select.appendChild(option)

}
const autorzy = []
// #autorzy
fetch('http://127.0.0.1:8000/api/autor/',{headers: {'Authorization': 'Basic ' + btoa('jakub:toor')}}
).then(response => response.json()
).then(data => data.forEach(element => {
    add_option(element)
    autorzy.push(element)
}))

// cytaty

const cytaty = []
fetch('http://127.0.0.1:8000/api/cytaty/',{headers: {'Authorization': 'Basic ' + btoa('jakub:toor')}}
).then(response =>response.json()).then(data => data.forEach(e=> cytaty.push(e)))



function main(){
    const cytaty_autora = (select.value=="0")? cytaty : cytaty.filter(obj => obj.autor == select.value)
    
    const cytat = cytaty_autora[Math.floor(Math.random() * cytaty_autora.length)];

    if(tresc.innerText == cytat.tresc){
        main()
    }
    else{
        tresc.innerText = cytat.tresc

        const autor = autorzy.find(e => e.id == cytat.autor)
        
        author_img.src = autor.zdjecie
        podpis.innerText = autor.imie

    }

    
}

document.querySelector('.button').addEventListener('click',main)

