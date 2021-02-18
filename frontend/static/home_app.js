import {getCookie} from "./getcookie.js";
const csrftoken = getCookie('csrftoken');


const select = document.querySelector('.custom-select')
const tresc = document.querySelector('#cytat')
const podpis = document.querySelector('#autor')
const author_img = document.querySelector('.img-thumbnail')

const like = document.querySelector('#like')
const dislike = document.querySelector('#dislike')

let obecny_cytat = null

let glos = false


// autorzy
const autorzy = []
fetch('http://127.0.0.1:8000/api/autor/')
.then(response => response.json())
.then(data => data.forEach(autor => {
    autorzy.push(autor)
    const option = document.createElement('option')
    option.value = autor.id
    option.innerText = autor.imie
    select.appendChild(option)

}))

function losuj_cytat(){
    glos = false

    fetch(`http://127.0.0.1:8000/api/CytatyAutora/${select.value}`)
    .then(response => response.json())
    .then(cytaty => {
        console.log(cytaty);

        let wylosowany = cytaty[Math.floor(Math.random() * cytaty.length)]
        if(obecny_cytat){
            if(obecny_cytat.id == wylosowany.id){
                losuj_cytat()
            }
        }
        

        obecny_cytat = wylosowany

        

        const autor_cytatu = autorzy.find(autor => autor.id == obecny_cytat.autor)
    
        tresc.innerText = obecny_cytat.tresc
        podpis.innerText = autor_cytatu.imie
        author_img.src = autor_cytatu.zdjecie
        
        like.lastElementChild.innerText = obecny_cytat.pozytywne
        dislike.lastElementChild.innerText = obecny_cytat.negatywne

    })

   
}


document.querySelector('.losuj').addEventListener('click',losuj_cytat)


function add_ocena(event){
    const dane = {}

    if(glos){
        return alert('oddano już głos')
    }
    
    if(event.target.parentElement.id == 'like'){
        dane.pozytywne = obecny_cytat.pozytywne +1
    }
    else{
        dane.negatywne = obecny_cytat.negatywne +1
    }

    console.log(dane);

    fetch(`http://127.0.0.1:8000/api/cytaty/${obecny_cytat.id}/`,{
        method : 'PATCH',
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken
            },
        body: JSON.stringify(dane)
    }).then(response => response.json()).then(data =>{
        like.lastElementChild.innerText = data.pozytywne
        dislike.lastElementChild.innerText = data.negatywne
        glos =true
    })

}

like.addEventListener('click',e=>add_ocena(e))
dislike.addEventListener('click',e=>add_ocena(e))
