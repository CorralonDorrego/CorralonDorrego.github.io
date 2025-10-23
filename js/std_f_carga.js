function cargar_logo()
{
    document.querySelectorAll('.logo_img').forEach(elem => {
        if(elem.tagName=='IMG')
            elem.src=fb_data.logo.img_url;
        else
            elem.style.backgroundImage=`url(${logo.img_url})`;
    })
    document.querySelectorAll('.logo_oscuro_img').forEach(elem => {
        if(elem.tagName=='IMG')
            elem.src=fb_data.logo_fondo_oscuro.img_url;
        else
            elem.style.backgroundImage=`url(${fb_data.logo_fondo_oscuro.img_url})`;
    })
}

function cargar_info_contacto(contacto){
    document.querySelectorAll(".contacto_direccion").forEach(elem => {
        elem.append(`${contacto.direccion.calle} ${contacto.direccion.altura}, ${contacto.direccion.ciudad}`);
        elem.href=`https://maps.google.com/?q=${contacto.direccion.calle} ${contacto.direccion.altura}, ${contacto.direccion.ciudad}`;
    })
    document.querySelectorAll(".contacto_email").forEach(elem => {
        elem.href = `mailto:${fb_data.contacto.email}`;
        if(elem.textContent.trim()!='CONTACTAR'){
            const text = document.createElement('span')
            text.textContent = fb_data.contacto.email;
            elem.appendChild(text);
        }
    })
    document.querySelectorAll(".contacto_numero").forEach(elem => {
        elem.append(`+${contacto.celular.area} ${contacto.celular.numero}`);
        elem.href=`tel:+${contacto.celular.area}${contacto.celular.numero}`;
    })//https://www.facebook.com/HasAceros
    document.querySelectorAll(".contacto_facebook").forEach(elem => {
        elem.href=`https://www.facebook.com/${contacto.facebook}`;
    })
    document.querySelectorAll(".contacto_instagram").forEach(elem => {
        elem.href=`https://www.instagram.com/${contacto.instagram}`;
    })
    
}

function setup_ammount_selector(tag, cat_id, prod_id, unidad, cb)
{
    const minus = tag.querySelector('#minus');
    const text = tag.querySelector('input');
    const sp_unidad = tag.querySelector('span');
    const plus = tag.querySelector('#plus');

    text.value = carrito_get_producto(cat_id, prod_id);
    sp_unidad.textContent = unidad;
    minus.addEventListener('click', e=>{
        add_carrito(cat_id, prod_id, -1, n => {
            text.value=n;
            if(cb)
                cb(n);
        })
    })
    text.addEventListener('input', e=>{
        let value = Number(text.value);
        if(!value)
            value=0;
        set_carrito(cat_id, prod_id, value, n => {
            text.value=n;
            if(cb)
                cb(n);
        })
    })
    plus.addEventListener('click', e=>{
        add_carrito(cat_id, prod_id, 1, n => {
            text.value=n;
            if(cb)
                cb(n);
        })
    })
}