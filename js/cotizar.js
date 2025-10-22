
document.addEventListener('DOMContentLoaded', async ()=>{
    await esperar_fb_data();
    
    const prod_list = document.querySelector('#lista_carrito');
    const template = prod_list.querySelector('#prod_carrito_template');
    template.id='';

    const prodarray = get_prodarray();
    console.log(prodarray);
    prodarray.forEach(ls_id => {
        console.log(ls_id);
        const ids = lsid_to_cid_pid(ls_id);
        console.log(ids.cat_id, ids.prod_id);
    })

    finish_load();
})
