function cargar_logo(logo)
{
    document.querySelectorAll('.logo_img').forEach(elem => {
        if(elem.tagName=='IMG')
            elem.src=logo.img_url;
        else
            elem.style.backgroundImage=`url(${logo.img_url})`;
    })
}

function cargar_info_contacto(contacto){
    document.querySelectorAll(".contacto_direccion").forEach(elem => {
        elem.append(`${contacto.direccion.calle} ${contacto.direccion.altura}, ${contacto.direccion.ciudad}`);
        elem.href=`https://maps.google.com/?q=${contacto.direccion.calle} ${contacto.direccion.altura}, ${contacto.direccion.ciudad}`;
    })
    document.querySelectorAll(".contacto_email").forEach(elem => {
        
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

function setup_ammount_selector(tag_id, cat_id, prod_id, unidad)
{
    const div = document.querySelector(`#${tag_id}`);
    const minus = div.querySelector('#minus');
    const text = div.querySelector('input');
    const sp_unidad = div.querySelector('span');
    const plus = div.querySelector('#plus');

    text.value = carrito_get_producto(cat_id, prod_id);
    sp_unidad.textContent = unidad;
    minus.addEventListener('click', e=>{
        add_carrito(cat_id, prod_id, -1, n => {
            text.value=n;
        })
    })
    text.addEventListener('input', e=>{
        let value = Number(text.value);
        if(!value)
            value=0;
        set_carrito(cat_id, prod_id, value, n => {
            text.value=n;
        })
    })
    plus.addEventListener('click', e=>{
        add_carrito(cat_id, prod_id, 1, n => {
            text.value=n;
        })
    })
}