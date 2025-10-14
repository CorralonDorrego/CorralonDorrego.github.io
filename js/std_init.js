let fb_data = null;
let header_state=0;
let header;

function finish_load(){
    const loading = document.querySelector(".loading_display");
    loading.style.opacity=0;
    loading.style.pointerEvents='none';
}

async function esperar_fb_data(){
    while(!fb_data)
    {
        console.log("esperando 50ms");
        await sleep(50);
    }
}

document.addEventListener('DOMContentLoaded', async ()=>{
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

    fb_data = await get_firebase('data');

    cargar_logo(fb_data.logo);
    cargar_info_contacto(fb_data.contacto);
})