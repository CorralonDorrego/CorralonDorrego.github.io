console.log("index js cargado");



/*
mensaje para el siguiente programador que tenga que interactuar con esto :)

este codigo fue hecho con apuro y sin experiencia, esta fue mi segunda pagina que complete en mi vida, asi que me di cuenta
de cosas que haria distinto a mitad de camino

en general la filosofia que mantiene esta pagina de pie es:
-  en un basurero, tenes permitido todo lo que este al alcance

si nesecitas una funcion, hacela en cualquier lado, si nesecitas la informacion de la db, es global, si nesecitas una nueva
clase de css, ponela al final del styles.css, tu codigo es feo y repetitivo? me da igual

no interactues con nada a menos que sea totalmente necesario, cada archivo es un mundo, esto no usa ninguna api a parte de 
la de firebase, asi q si sabes js estas listo para descifrar esto

suerte ojala no sea imposible programar aca :3 materias correlativas: reverse engineering en software
*/


/*
si llega a explotar algo o nesecitas un dato que no podes averiguar de otra forma, pedile al dueño del corralon que queres hablar con Gaspar

lo mas raro de todo el el tema de la autenticacion con firebase, quiza no lo pareza en primer instancia
*/



// <!1> tener en la db 2 "carpetas" data y test-data, cuando el admin quiere añadir un producto o hacer cosas asi, lo hace en test-dat¿a y despues "commitea" y se transfiere todo a data







function cargar_categorias_en_index(productos){
    const container = document.querySelector('.grilla_categorias');
    const nosotros = document.querySelector('.presentacion_nosotros');
    let a;
    let img;
    let nom;
    let n_cat;
    let categoria;
    let prod_ids;

    let div;
    for(const id in productos)
    {
        categoria = productos[id];

        a = document.createElement('a');
        a.href=`./categoria.html?cat_id=${id}`; // despues le implementaria la url dependiendo del producto

        img = document.createElement('img');

        try{
            prod_ids = Object.keys(categoria.productos);
        }catch(e){//error mas comun es que la categoria no tenga productos
            prod_ids=[];
        }
        

        img.src = categoria.img_url;
        /*version vieja
        span = document.createElement('span');
        span.textContent = categoria.nombre;
        a.appendChild(span);
        */
        
        div = document.createElement('div');

        nom = document.createElement('span');
        nom.className = 'nombre_categoria';
        nom.textContent = categoria.nombre;

        n_cat = document.createElement('span');
        n_cat.className = 'n_cat';
        n_cat.textContent = `${prod_ids.length} productos`;

        div.appendChild(nom);
        div.appendChild(n_cat);

        a.appendChild(img);
        a.appendChild(div);
        container.appendChild(a);
    }
    
    nosotros.innerHTML = fb_data.presentacion;
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