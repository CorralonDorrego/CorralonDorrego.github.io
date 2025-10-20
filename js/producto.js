console.log("producto js cargado");
const params = new URLSearchParams(window.location.search); //query params
const cat_id = params.get('cat_id');
const prod_id = params.get('prod_id');


document.addEventListener('DOMContentLoaded', async ()=>{

    if(!cat_id)
        load_error('404, url erronea, no se encontro id de categoria');
    else // cat_id tiene la id de la categoria del producto
        if(!prod_id)
            load_error('404, url erronea, no se encontro id de producto');
        else // prod_id tiene la id del producto
        {
            await esperar_fb_data();
    
            const cat = fb_data.productos[cat_id];

            if(!cat)
                load_error('404, url erronea, id de categoria erronea');
            else
            {
                const prod = cat.productos[prod_id];
                if(!prod)
                    load_error('404, url erronea, id de categoria erronea');
                else
                {
                    
                    // cargar informacion producto y categoria

                    const img_prod = document.querySelector('#img_prod');
                    const href_nombre_cat = document.querySelector('#cat_nom_redirect');
                    const producto_nombre = document.querySelector('.producto_nom_prod');
                    const producto_precio = document.querySelector('.producto_precio');
                    const unidad_para_anadir = document.querySelector('#cantidad_prod>span');
                    const cantidad_anadir = document.querySelector('#cantidad_prod>input[type="text"]');
                    const boton_anadir = document.querySelector('#cantidad_prod>input[type="button"]');
                    const descripcion_prod = document.querySelector('#descripcion_prod');
                    const mas_prods_cat = document.querySelector('#mas_prods_cat');
                    const mas_prods_div = document.querySelector('.grilla_productos');

                    img_prod.src = prod.img_url;

                    href_nombre_cat.textContent = cat.nombre.toLocaleUpperCase();
                    href_nombre_cat.href = `./categoria.html?cat_id=${cat_id}`;
                    
                    producto_nombre.textContent = prod.nombre;
                    producto_precio.textContent = `${prod.moneda}${prod.valor} / ${prod.unidad}`;
                    unidad_para_anadir.textContent = prod.unidad;

                    let cantidad_carrito = carrito_get_producto(cat_id, prod_id);

                    boton_anadir.value = `AÑADIR${(cantidad_carrito && cantidad_carrito>0)?` [${cantidad_carrito}]`:''}`;

                    boton_anadir.addEventListener('click', () => {
                        add_carrito(cat_id, prod_id, Number(cantidad_anadir.value), (cantidad_nueva) => {
                            boton_anadir.value = `AÑADIR${(cantidad_nueva && cantidad_nueva>0)?` [${cantidad_nueva}]`:''}`;
                        });
                    })

                    descripcion_prod.textContent = prod.descripcion;
                    mas_prods_cat.textContent = `MAS EN ${cat.nombre.toLocaleUpperCase()}`;

                    for(const prod_id_aux in cat.productos){
                        if(prod_id_aux!=prod_id) //no mostrar en la lista a si mismo
                        {
                            const prod_aux = cat.productos[prod_id_aux];
                            const a = document.createElement('a');

                            a.href=`./producto.html?cat_id=${cat_id}&prod_id=${prod_id_aux}`;

                            const img_cutter = document.createElement('div');
                            img_cutter.className = 'img_cutter';

                            const img = document.createElement('img');
                            img.src = prod_aux.img_url;

                            img_cutter.appendChild(img);
                            a.appendChild(img_cutter);

                            const span = document.createElement('span');
                            span.textContent = prod_aux.nombre;
                            a.appendChild(span);
                            mas_prods_div.appendChild(a);
                        }
                    }
                    finish_load();
                }
            }
        }
});

