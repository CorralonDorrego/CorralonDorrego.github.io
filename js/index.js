console.log("js cargado");

let header_state=0;
let header;

document.addEventListener('DOMContentLoaded', e=>{
    header = document.querySelector('header');
    document.addEventListener('scroll', e => {
        if(window.scrollY>70&&header_state==0){
            header_state=1;
            header.classList.add('slim_header');
        }
        if(window.scrollY<=70&&header_state==1){
            header_state=0;
            header.classList.remove('slim_header');
        }

    })
})
