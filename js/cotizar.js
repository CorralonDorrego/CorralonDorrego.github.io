
document.addEventListener('DOMContentLoaded', async ()=>{
    await esperar_fb_data();
    
    const prod_list = document.querySelector('#lista_carrito');
    const template = prod_list.querySelector('#prod_carrito_template');
    const no_products = document.querySelector('#no_hay_productos');
    const completar_compra = document.querySelector('#completar_compra');
    const total_container = document.querySelector('.total_container');

    const prodarray = get_prodarray();
    console.log(prodarray);
    prodarray.forEach(ls_id => {
        const ids = lsid_to_cid_pid(ls_id);
        const prod = fb_data.productos[ids.cat_id].productos[ids.prod_id];

        const prod_front = template.cloneNode(true);
        prod_front.id='';
        prod_front.classList.remove('display_none')

        const img = prod_front.querySelector('div>.img_cutter>img');
        const nombre = prod_front.querySelector('.nombre_prod');
        const ammount_selector = prod_front.querySelector('.ammount_selector');
        const precio = prod_front.querySelector('.precio');
        const costo_unidad = prod_front.querySelector('.producto_precio');

        img.src = prod.img_url;
        nombre.textContent = prod.nombre;
        setup_ammount_selector(ammount_selector, ids.cat_id, ids.prod_id, prod.unidad, n => {
            precio.textContent = `${prod.moneda} ${Number(prod.valor)*n}`;
            actualizar_precios();
        });
        precio.textContent = `${prod.moneda} ${Number(prod.valor)*carrito_get_producto(ids.cat_id, ids.prod_id)}`;

        costo_unidad.textContent = `${prod.moneda} ${prod.valor} /${prod.unidad}`;

        prod_list.appendChild(prod_front);
    })
    if(prodarray.length==0)
    {
        no_products.style.display = 'flex';
        completar_compra.style.display = 'none';
        total_container.style.display = 'none';
    }

    actualizar_precios();
    

    finish_load();
})

function actualizar_precios(){
    const total_precios = document.querySelector('.total_container>div');
    total_precios.replaceChildren();
    const precios = calcular_costo_total();
    let i = 0;
    for(const moneda in precios){
        if(i>0)
        {
            const plus = document.createElement('span');
            plus.textContent = '+';
            total_precios.appendChild(plus);
        }
        const precio = document.createElement('span');
        precio.className = 'precio';
        precio.textContent = `${moneda} ${precios[moneda]}`;

        
        total_precios.appendChild(precio);
        i++; 
    }
    if(i==0){
        const precio = document.createElement('span');
        precio.className = 'precio';
        precio.textContent = `$ 0`;

        
        total_precios.appendChild(precio);
    }

}

function calcular_costo_total(){
    let ret = {};
    const prodarray = get_prodarray();

    for(const index in prodarray)
    {
        const ls_id = prodarray[index];
        const ids = lsid_to_cid_pid(ls_id);
        const prod = fb_data.productos[ids.cat_id].productos[ids.prod_id];
        const n_prod = carrito_get_producto(ids.cat_id, ids.prod_id);
        const costo_prod = prod.valor * n_prod;

        if(!ret[prod.moneda])
            ret[prod.moneda] = costo_prod;
        else
            ret[prod.moneda] += costo_prod;
    }

    return ret;
}