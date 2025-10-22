console.log("producto js cargado");
const params = new URLSearchParams(window.location.search); //query params
const in_cat_id = params.get('cat_id');
let cat, selected_cat_id;


document.addEventListener('DOMContentLoaded', async ()=>{
    await esperar_fb_data();
    cat = fb_data.productos[in_cat_id];
    selected_cat_id = in_cat_id; 
    
    const path_name_display = document.querySelector('#cat_nom_redirect');
    const cat_list = document.querySelector('#lista_categorias');

    if(cat){
        path_name_display.textContent = cat.nombre.toLocaleUpperCase();
        load_grilla_productos(selected_cat_id);
    }
    else
        path_name_display.textContent = 'CATEGORIAS';
    let n_cats = 0;
    for(const aux_cat_id in fb_data.productos)
    {
        n_cats++;
        let aux_cat = fb_data.productos[aux_cat_id];

        const span = document.createElement('span');
        span.textContent = aux_cat.nombre;
        span.className='hover_opcacity_change clickable';
        span.id=aux_cat_id;

        if(selected_cat_id == aux_cat_id){ //  generarlo seleccionado
            span.classList.add('bold')
            span.style.backgroundColor="#d8d8d8";
        }


        span.addEventListener('click', (e) => {
            if(aux_cat_id!=selected_cat_id)
            {
                const selected_cat_bttn = document.querySelector(`#${selected_cat_id}`);
                if(selected_cat_bttn){
                    selected_cat_bttn.classList.remove('bold');
                    selected_cat_bttn.style.backgroundColor='#00000000';
                }
                span.classList.add('bold')
                span.style.backgroundColor="#d8d8d8";
                selected_cat_id=aux_cat_id;
                cat=fb_data.productos[selected_cat_id];
                path_name_display.textContent = cat.nombre.toLocaleUpperCase();
                load_grilla_productos(selected_cat_id);
            }
        });
        


        if(n_cats>1)
        {
            const sep = document.createElement('span');
            sep.className='separador-h';
            cat_list.appendChild(sep);
        }
        cat_list.appendChild(span);
    }


    finish_load();
});

function load_grilla_productos(cat_id)
{
    const grilla = document.querySelector('.grilla_productos');
    const cat = fb_data.productos[cat_id];
    if(cat)
    {
        grilla.replaceChildren();
        for(const prod_id_aux in cat.productos){
            const prod_aux = cat.productos[prod_id_aux];
            const a = document.createElement('a');

            a.href=`./producto.html?cat_id=${selected_cat_id}&prod_id=${prod_id_aux}`;

            const img_cutter = document.createElement('div');
            img_cutter.className = 'img_cutter';

            const img = document.createElement('img');
            img.src = prod_aux.img_url;

            img_cutter.appendChild(img);
            a.appendChild(img_cutter);

            const span = document.createElement('span');
            span.textContent = prod_aux.nombre;
            a.appendChild(span);
            grilla.appendChild(a);
        }
    }
    else
        console.log(`cat_id didn't match any in db (cat_id=${cat_id})`);
}