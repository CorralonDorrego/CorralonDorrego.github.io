console.log("index js cargado");




// <!0> hacer una funcion init_index que consiga toda la informacion de firebase y cargue todas la secciones
// <!1> tener en la db 2 "carpetas" data y test-data, cuando el admin quiere añadir un producto o hacer cosas asi, lo hace en test-dat¿a y despues "commitea" y se transfiere todo a data







function cargar_categorias_en_index(productos){
    const container = document.querySelector('.grilla_categorias');
    let a;
    let img;
    let span;
    let categoria;
    let prod_ids;

    // test vv
    let div;
    for(const id in productos)
    {
        categoria = productos[id];

        a = document.createElement('a');
        a.href='#'; // despues le implementaria la url dependiendo del producto

        img = document.createElement('img');

        prod_ids = Object.keys(categoria.productos);
        

        img.src = categoria.img_url;
        /*version vieja
        span = document.createElement('span');
        span.textContent = categoria.nombre;
        a.appendChild(span);
        */
        
        div = document.createElement('div');

        span = document.createElement('span');
        span.className = 'nombre_categoria';
        span.textContent = categoria.nombre;

        div.appendChild(span);

        a.appendChild(img);
        a.appendChild(div);
        container.appendChild(a);
    }
}

function cargar_banner_en_index(banner){
    const div = document.querySelector("#banner-main");

    div.style.backgroundImage=`url(${banner.img_url})`;
}





document.addEventListener('DOMContentLoaded', async ()=>{
    await esperar_fb_data();

    cargar_banner_en_index(fb_data.main_banner);
    cargar_categorias_en_index(fb_data.productos);

    finish_load();
})




/* vv write example vv

try {
    await auth.signInWithEmailAndPassword("mail","password");
    console.log("Signed in!");
    database.ref("data/main_banner").set({
        img_url: "https://images2.imgbox.com/df/1e/kXErktN6_o.jpg"
    })
} catch (e) {
    console.log("error: ",e);
}*/