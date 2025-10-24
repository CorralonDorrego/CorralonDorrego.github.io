console.log("admin js cargado");


document.addEventListener('DOMContentLoaded', async e => {
    await esperar_fb_data();
    if(await check_ls_login()){
        display_admin_interface();
        
    }else{
        setup_login_logic();
    }

    document.querySelector('#send').addEventListener('click', e => {
        const recuperado = get_data_from_form();
        console.log(recuperado);
        set_firebase(recuperado);
    })
    finish_load();
})






function setup_login_logic(){
    const email_input = document.querySelector('#email_input');
    const pass_input = document.querySelector('#pass_input');
    const sign_in_button = document.querySelector('#sign_in_button');

    sign_in_button.addEventListener('click', e=>{
        const mail = email_input.value;
        const pass = pass_input.value;
        login(mail, pass).then(() => {
            localStorage.setItem('admin_email', mail);
            localStorage.setItem('admin_pass', pass);
            display_admin_interface();
        }).catch( e=>{
            console.error(e);
            err_login();
        })
    })
}

async function check_ls_login(){
    const ls_email = localStorage.getItem('admin_email');
    const ls_pass = localStorage.getItem('admin_pass');
    try {
        await login(ls_email, ls_pass);
        return 1;
    } catch(e) {
        return 0;
    }
}

function login_popup() {
    const ls_email = localStorage.getItem('admin_email');
    const ls_pass = localStorage.getItem('admin_pass');
    const email = ls_email || prompt("Ingrese el email:");
    const pass = ls_pass || prompt("Ingrese la contraseña:");
    login(email, pass).then(val => {
        alert('bienvenido administrador'); 
        localStorage.setItem('admin_email',email);
        localStorage.setItem('admin_pass',pass);
    }).catch( e => {
        console.error(e);
        localStorage.removeItem('admin_email');
        localStorage.removeItem('admin_pass');
        alert('email y constraseña invalidos, pruebe nuevamente'); 
        login_popup();
    });
}

function display_admin_interface(){
    const std_container_admin_info = document.querySelector('#std_container_admin');
    const main_container = document.querySelector('#std_container_admin>div');
    const login_container = document.querySelector('.login_container');
    const bienvenido_text = document.querySelector('.login_container>span');
    std_container_admin_info.classList.remove('display_none');
    bienvenido_text.classList.remove('display_none');
    login_container.replaceChildren(bienvenido_text);



    const input_celular = document.querySelector('.input_celular');
    const input_email = document.querySelector('.input_email');
    const input_facebook = document.querySelector('.input_facebook');
    const input_instagram = document.querySelector('.input_instagram');
    const input_altura = document.querySelector('.input_altura');
    const input_calle = document.querySelector('.input_calle');
    const input_ciudad = document.querySelector('.input_ciudad');
    const input_presentacion = document.querySelector('.input_presentacion');

    const input_img_banner = document.querySelector('.input_img_banner');
    const display_img_banner = document.querySelector('.display_img_banner');
    setup_img_display_refresh(input_img_banner, display_img_banner);
    const input_logo = document.querySelector('.input_logo');
    const display_logo = document.querySelector('.display_logo');
    setup_img_display_refresh(input_logo, display_logo);
    const input_logo_oscuro = document.querySelector('.input_logo_oscuro');
    const display_logo_oscuro = document.querySelector('.display_logo_oscuro');
    setup_img_display_refresh(input_logo_oscuro, display_logo_oscuro);

    input_celular.value = fb_data.contacto.celular;
    input_email.value = fb_data.contacto.email;
    input_facebook.value = fb_data.contacto.facebook;
    input_instagram.value = fb_data.contacto.instagram;
    input_altura.value = fb_data.contacto.direccion.altura;
    input_calle.value = fb_data.contacto.direccion.calle;
    input_ciudad.value = fb_data.contacto.direccion.ciudad;
    input_presentacion.value = fb_data.presentacion.replace(/<br>/g, '\n');;
    input_img_banner.value = fb_data.main_banner.img_url;
    display_img_banner.src = fb_data.main_banner.img_url;
    input_logo.value = fb_data.logo.img_url;
    display_logo.src = fb_data.logo.img_url;
    input_logo_oscuro.value = fb_data.logo_fondo_oscuro.img_url;
    display_logo_oscuro.src = fb_data.logo_fondo_oscuro.img_url;


    const span_array_cats = document.querySelector('#array_cats');
    let array_cats = []; //recien estoy armando la pagina, asi que si o si span_array_cats tiene []














    const template_cat = document.querySelector('#template_cat');
    const template_prod = document.querySelector('#template_prod');
    let cat_cont=0;
    for(const cat_id in fb_data.productos){
        cat_cont++;


        const cat = fb_data.productos[cat_id];

        const front_cat = template_cat.cloneNode(true);
        front_cat.classList.remove('display_none');
        front_cat.id=cat_id;
        array_cats.push(cat_id);
        const front_cat_content = front_cat.querySelector('.tab');
        

        const cat_index = front_cat.querySelector('.contador_categorias');
        cat_index.textContent = `${cat_cont}°`;
        const cat_titulo = front_cat.querySelector('.titulo_nombre_cat');
        const cat_input_nombre = front_cat.querySelector('.input_nombre_cat');
        setup_val_to_textContent_refresh(cat_input_nombre, cat_titulo);

        const cat_input_img = front_cat.querySelector('.input_img_url_cat');
        const cat_display_img = front_cat.querySelector('.display_img_url_cat');
        setup_img_display_refresh(cat_input_img, cat_display_img);

        const span_array_prods = front_cat.querySelector('.array_prods');
        let array_prods = []; // recien creo la categoria

        cat_titulo.textContent = cat.nombre;
        cat_input_nombre.value = cat.nombre;
        cat_input_img.value = cat.img_url;
        cat_display_img.src = cat.img_url;


        const remove_cat = front_cat.querySelector('.remove');
        setup_secure_button_action(remove_cat, () => {
            array_cats=JSON.parse(span_array_cats.textContent);
            array_cats=array_cats.filter((aux_cat_id)=>aux_cat_id!=cat_id);
            span_array_cats.textContent = JSON.stringify(array_cats);
            front_cat.nextElementSibling.remove();
            front_cat.remove();
        })


        let prod_cont=0;

        front_cat_content.appendChild(crear_subtitulo(`Productos de la categoria:`));
        front_cat_content.appendChild(crear_separador_h());
        for(const prod_id in cat.productos){
            prod_cont++;
            const prod = cat.productos[prod_id];

            const front_prod = template_prod.cloneNode(true);
            front_prod.classList.remove('display_none'); 
            front_prod.id=`${cat_id}-${prod_id}`;
            array_prods.push(prod_id);
            
            const prod_index = front_prod.querySelector('.contador_productos');
            prod_index.textContent = `${prod_cont}°`;


            const prod_input_nombre = front_prod.querySelector('.input_nombre_prod');
            const prod_input_desc = front_prod.querySelector('.input_desc_prod');

            const prod_input_img = front_prod.querySelector('.input_img_url_prod');
            const prod_display_img = front_prod.querySelector('.display_img_url_prod');
            setup_img_display_refresh(prod_input_img, prod_display_img);
            
            const prod_input_moneda = front_prod.querySelector('.input_moneda_prod');
            const prod_input_valor = front_prod.querySelector('.input_valor_prod');
            const prod_input_unidad = front_prod.querySelector('.input_unidad_prod');

            prod_input_nombre.value = prod.nombre;
            prod_input_desc.value = prod.descripcion;

            prod_input_img.value = prod.img_url;
            prod_display_img.src = prod.img_url;

            prod_input_moneda.value = prod.moneda;
            prod_input_valor.value = prod.valor;
            prod_input_unidad.value = prod.unidad;

            const remove_prod = front_prod.querySelector('.remove');
            setup_secure_button_action(remove_prod, () => {
                array_prods=JSON.parse(span_array_prods.textContent);
                array_prods=array_prods.filter((aux_prod_id)=>aux_prod_id!=prod_id);
                span_array_prods.textContent = JSON.stringify(array_prods);
                front_prod.nextElementSibling.remove();
                front_prod.remove();
            })

            front_cat_content.appendChild(front_prod);
            front_cat_content.appendChild(crear_separador_h());
        }

        span_array_prods.textContent = JSON.stringify(array_prods);

        crear_boton_add_prod(front_cat, prod_cont);
        main_container.appendChild(front_cat);
        main_container.appendChild(crear_separador_h());

    }
    span_array_cats.textContent = JSON.stringify(array_cats);


    crear_boton_add_cat(cat_cont);








}

function crear_boton_add_cat(cat_cont){
    const main_container = document.querySelector('#std_container_admin>div');
    const span_array_cats = document.querySelector('#array_cats');
    
    const add_cat = document.createElement('img');
    add_cat.className='hover_opcacity_change clickable boton_crear_cat';
    add_cat.src = './imgs/add.svg';


    main_container.appendChild(add_cat);
    main_container.appendChild(crear_separador_h());

    add_cat.addEventListener('click', () => {
        cat_cont++;

        const template_cat = document.querySelector('#template_cat');
        const front_cat = template_cat.cloneNode(true);


        let array_cats = JSON.parse(span_array_cats.textContent);
        
        let cat_id_index = 0;
        while(array_cats.includes(`c_${cat_id_index}`))
            cat_id_index++;
        const cat_id = `c_${cat_id_index}`;
        array_cats.push(cat_id);
        span_array_cats.textContent=JSON.stringify(array_cats);

        front_cat.id=cat_id;
        front_cat.classList.remove('display_none');

        const front_cat_content = front_cat.querySelector('.tab');

        const cat_index = front_cat.querySelector('.contador_categorias');
        cat_index.textContent = `${cat_cont}°`;

        const cat_titulo = front_cat.querySelector('.titulo_nombre_cat');
        const cat_input_nombre = front_cat.querySelector('.input_nombre_cat');
        setup_val_to_textContent_refresh(cat_input_nombre, cat_titulo);

        
        const cat_input_img = front_cat.querySelector('.input_img_url_cat');
        const cat_display_img = front_cat.querySelector('.display_img_url_cat');
        setup_img_display_refresh(cat_input_img, cat_display_img);
        
        const remove_cat = front_cat.querySelector('.remove');
        setup_secure_button_action(remove_cat, () => {
            array_cats=JSON.parse(span_array_cats.textContent);
            array_cats=array_cats.filter((aux_cat_id)=>aux_cat_id!=cat_id);
            span_array_cats.textContent = JSON.stringify(array_cats);
            front_cat.nextElementSibling.remove();
            front_cat.remove();
        })
        
        front_cat_content.appendChild(crear_subtitulo(`Productos en la categoria:`));
        front_cat_content.appendChild(crear_separador_h());

        crear_boton_add_prod(front_cat, 0);
        
        main_container.appendChild(front_cat);
        main_container.appendChild(crear_separador_h());

        add_cat.nextElementSibling.remove();
        add_cat.remove();

        crear_boton_add_cat(cat_cont);
    })
}

function crear_boton_add_prod(cat_front, prod_cont){
    const cat_id = cat_front.id;
    const cat_container = cat_front.querySelector(`div`)
    const span_array_prods = cat_container.querySelector('.array_prods');
    let array_prods = JSON.parse(span_array_prods.textContent);

    const add_prod = document.createElement('img');
    add_prod.className='hover_opcacity_change clickable boton_crear_prod';
    add_prod.src = './imgs/add.svg';

    cat_container.appendChild(add_prod);
    cat_container.appendChild(crear_separador_h());

    add_prod.addEventListener('click', () => {
        prod_cont++;

        const template_prod = document.querySelector('#template_prod');
        const front_prod = template_prod.cloneNode(true);
        
        let prod_id_index = 0;
        while(array_prods.includes(`p_${prod_id_index}`))
            prod_id_index++;
        let prod_id=`p_${prod_id_index}`;
        array_prods.push(prod_id);
        span_array_prods.textContent=JSON.stringify(array_prods);

        front_prod.id=`${cat_id}-${prod_id}`;
        front_prod.classList.remove('display_none');

        const prod_index = front_prod.querySelector('.contador_productos');
        prod_index.textContent = `${prod_cont}°`;



        const prod_input_img = front_prod.querySelector('.input_img_url_prod');
        const prod_display_img = front_prod.querySelector('.display_img_url_prod');
        setup_img_display_refresh(prod_input_img, prod_display_img);
        

        const remove_prod = front_prod.querySelector('.remove');
        setup_secure_button_action(remove_prod, () => {
            array_prods=JSON.parse(span_array_prods.textContent);
            array_prods=array_prods.filter((aux_prod_id)=>aux_prod_id!=prod_id);
            span_array_prods.textContent = JSON.stringify(array_prods);
            front_prod.nextElementSibling.remove();
            front_prod.remove();
        })
        

        add_prod.nextElementSibling.remove();
        add_prod.remove();


        cat_container.appendChild(front_prod);
        cat_container.appendChild(crear_separador_h());

        crear_boton_add_prod(cat_front, prod_cont);

    })
    
}

function err_login(){
    const err_login = document.querySelector('#err_login');
    err_login.classList.remove('display_none');
}

function crear_separador_h(){
    const sep = document.createElement('span');
    sep.className = 'separador-h';
    return sep;
}


function crear_subtitulo(text){
    const subt = document.createElement('span')
    subt.className='subtitulo_tab';
    subt.textContent=text;
    return subt;
}

function get_data_from_form(){
    let data = {}

    const input_celular = document.querySelector('.input_celular');
    const input_email = document.querySelector('.input_email');
    const input_facebook = document.querySelector('.input_facebook');
    const input_instagram = document.querySelector('.input_instagram');
    const input_altura = document.querySelector('.input_altura');
    const input_calle = document.querySelector('.input_calle');
    const input_ciudad = document.querySelector('.input_ciudad');
    const input_presentacion = document.querySelector('.input_presentacion');
    const input_img_banner = document.querySelector('.input_img_banner');
    const input_logo = document.querySelector('.input_logo');
    const input_logo_oscuro = document.querySelector('.input_logo_oscuro');

    data.contacto={};
    data.contacto.celular = input_celular.value.replace(/\D/g, "");
    data.contacto.email = input_email.value;
    data.contacto.facebook = input_facebook.value;
    data.contacto.instagram = input_instagram.value;
    data.contacto.direccion={};
    data.contacto.direccion.altura = input_altura.value;
    data.contacto.direccion.calle = input_calle.value;
    data.contacto.direccion.ciudad = input_ciudad.value;
    data.logo={}
    data.logo.img_url = input_logo.value;
    data.logo_fondo_oscuro={}
    data.logo_fondo_oscuro.img_url = input_logo_oscuro.value;
    data.main_banner={};
    data.main_banner.img_url = input_img_banner.value;
    data.presentacion = input_presentacion.value.replace(/\n/g, '<br>'); // cambia los nuevos renglones por <br>

    data.productos={};


    const span_array_cats = document.querySelector('#array_cats');
    const array_cats = JSON.parse(span_array_cats.textContent);

    array_cats.forEach(cat_id => {
        const cat_div = document.querySelector(`#${cat_id}`);

        const cat_input_nombre = cat_div.querySelector('.input_nombre_cat');
        const cat_input_img = cat_div.querySelector('.input_img_url_cat');
        
        data.productos[cat_id]={
            nombre: cat_input_nombre.value,
            img_url: cat_input_img.value,
            productos: {}
        };


        const span_array_prods = cat_div.querySelector('.array_prods');
        const array_prods = JSON.parse(span_array_prods.textContent);

        array_prods.forEach(prod_id => {
            const prod_div = cat_div.querySelector(`#${cat_id}-${prod_id}`);
            
            const prod_input_nombre = prod_div.querySelector('.input_nombre_prod');
            const prod_input_desc = prod_div.querySelector('.input_desc_prod');

            const prod_input_img = prod_div.querySelector('.input_img_url_prod');
            
            const prod_input_moneda = prod_div.querySelector('.input_moneda_prod');
            const prod_input_valor = prod_div.querySelector('.input_valor_prod');
            const prod_input_unidad = prod_div.querySelector('.input_unidad_prod');

            data.productos[cat_id].productos[prod_id] = {
                nombre: prod_input_nombre.value,
                descripcion: prod_input_desc.value,
                img_url: prod_input_img.value,
                moneda: prod_input_moneda.value,
                valor: Number(prod_input_valor.value),
                unidad: prod_input_unidad.value,
            }
        })
    })

    return data;
}

function setup_img_display_refresh(img_input, img_display){
    img_input.addEventListener('input', ()=>{
        img_display.src = "";
        img_display.src = img_input.value;
    })
}

function setup_val_to_textContent_refresh(val_elem, tc_elem){
    val_elem.addEventListener('input', ()=>{
        tc_elem.textContent = val_elem.value;
    })
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true; // Same reference or both null/undefined

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
        return false; // One is not an object or one is null
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length){
         return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}


function substract(obj1, obj2) {
    let ret = {};

    // If both objects are deeply equal, return an empty object
    if (deepEqual(obj1, obj2)) return {};

    // If one or both are not objects, compare their values directly
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
        if (obj1 != obj2) {
            return obj1;
        }
        return {};
    }

    // Get keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Iterate over keys in obj1
    keys1.forEach(key => {
        if (!keys2.includes(key)) {
            // If the key is not in obj2, include it in the result
            ret[key] = obj1[key];
        } else {
            // If the key exists in both, recursively compare their values
            const diff = substract(obj1[key], obj2[key]);
            if (typeof diff !== 'object' || Object.keys(diff).length > 0) {
                ret[key] = diff; // Only include differences
            }
        }
    });

    return ret;
}

function setup_secure_button_action(button, action){
    button.classList.add('disabled_remove');
    button.classList.remove('clickable');
    let state=0;

    button.addEventListener('click', e => {
        if(!state){
            state=1;
            button.classList.remove('disabled_remove');
            button.classList.add('clickable');
            setTimeout(() => {
                if(button){
                    state=0;
                    button.classList.add('disabled_remove');
                    button.classList.remove('clickable');
                }
            }, 1000);
        }else{
            action();
        }
    })
}