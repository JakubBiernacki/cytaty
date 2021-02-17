const select = document.querySelector('.custom-select')

const tresc = document.querySelector('#cytat')
const podpis = document.querySelector('#autor')

const author_img = document.querySelector('.img-thumbnail')

const like_count = document.querySelector('#like')
const dislike_count = document.querySelector('#dislike')

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');



function add_option(autor){
    const option = document.createElement('option')
    option.value = autor.id
    option.innerText = autor.imie

    select.appendChild(option)

}



const autorzy = []
// autorzy
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
    
        tresc.innerText = cytat.tresc

        const autor = autorzy.find(e => e.id == cytat.autor)
        
        author_img.src = autor.zdjecie
        podpis.innerText = autor.imie

        like_count.lastElementChild.innerText = cytat.pozytywne
        dislike_count.lastElementChild.innerText = cytat.negatywne

        add_ocena(like_count,cytat)
        add_ocena(dislike_count,cytat)
    

    
}



const add_ocena = (element,cytat) =>{
    if(addEv){
        element.removeEventListener('click',addEv)
    }
    
    element.addEventListener('click',function addEv(){

        const dane = {
            pozytywne : cytat.pozytywne,
            negatywne : cytat.negatywne
        }


        if(element.id === 'like'){
            dane.pozytywne = parseInt(cytat.pozytywne)+1;
        }
        else{
            dane.negatywne = parseInt(cytat.negatywne)+1
        }

        console.log(dane);

        let url = `http://127.0.0.1:8000/api/cytaty/${cytat.id}/`

        console.log(url);
        fetch(url,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken},
            body: JSON.stringify(dane)
        })

        fetch(url).then(response =>response.json()).then(data =>{
            console.log(data);
            like_count.lastElementChild.innerText = data.pozytywne
            dislike_count.lastElementChild.innerText = data.negatywne
        })

        


    })

    

}

document.querySelector('.button').addEventListener('click',main)

