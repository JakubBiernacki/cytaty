import {getCookie} from "./getcookie.js";
const csrftoken = getCookie('csrftoken');


const select = document.querySelector('.select-autor')

const tresc = document.querySelector('#cytat')
const podpis = document.querySelector('#autor')
const author_img = document.querySelector('.img-thumbnail')

const like = document.querySelector('#like')
const dislike = document.querySelector('#dislike')


const add_select = document.querySelector('.add_select')

let obecny_cytat = null

let glos = false

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function(toastEl) {
    // Creates an array of toasts (it only initializes them)
      return new bootstrap.Toast(toastEl) // No need for options; use the default options
    });

// test toast






// autorzy
const autorzy = []
fetch('http://127.0.0.1:8000/api/autor/')
.then(response => response.json())
.then(data => data.forEach(autor => {
    autorzy.push(autor);
    let option = document.createElement('option');
    let option_2 = document.createElement('option');
    option.value = autor.id;
    option.innerText = autor.imie;

    option_2.value = autor.id;
    option_2.innerText = autor.imie;
    
    
    select.appendChild(option)
    
    add_select.appendChild(option_2)

}))


document.querySelector('.losuj').addEventListener('click',losuj_cytat)
function losuj_cytat(){
    glos = false

    fetch(`http://127.0.0.1:8000/api/CytatyAutora/${((select.value)? select.value + '/':"")}`)
    .then(response => response.json())
    .then(cytaty => {

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



like.addEventListener('click',e=>add_ocena(e))
dislike.addEventListener('click',e=>add_ocena(e))
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

document.querySelector('.add_kom').addEventListener('click',()=>{
    const add_text = document.querySelector('#styled')
    const add_autor_id = add_select.value

    console.log(add_text,add_autor_id);

    const dane = {
        autor: add_autor_id,
        tresc: add_text.value
    }

    fetch('http://127.0.0.1:8000/api/propozycje/',{
        method : 'POST',
        headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken
            },
        body: JSON.stringify(dane)
    }).then(response => response.json()).then(data =>{

        add_text.value = ""
        toastList[0].show()
        
    })
})


