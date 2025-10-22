function get_prodarray()
{
    let ls_prodarray = localStorage.getItem('prodarray');
    if(ls_prodarray && ls_prodarray.length!=0)
        return JSON.parse(ls_prodarray);
    else
        return [];
}

function lsid_to_cid_pid(lsid)
{
    const match = lsid.match(/c_(\d+)-p_(\d+)/);
    return {
        cat_id: `c_${match[1]}`,
        prod_id: `p_${match[2]}`,
    }
}

function save_prodarray(array)
{
    localStorage.setItem('prodarray', JSON.stringify(array));
}


function add_carrito(cat_id, prod_id, ammount, cb)
{
    let prodarray = get_prodarray();

    let prev_val = Number(localStorage.getItem(`${cat_id}-${prod_id}`));
    let new_val;
    if(!prev_val)
        new_val = ammount;
    else
        new_val = prev_val + ammount;

    if(new_val<=0){
        remove_carrito(cat_id, prod_id);
        if(cb)//callback
            cb(0);
    }
    else
    {
        localStorage.setItem(`${cat_id}-${prod_id}`, new_val);


        const index_prod = prodarray.indexOf(`${cat_id}-${prod_id}`);
        if(index_prod==-1)
            prodarray.push(`${cat_id}-${prod_id}`);


        save_prodarray(prodarray);


        if(cb)//callback
            cb(new_val);
    }
}

function carrito_get_producto(cat_id, prod_id)
{
    let val = Number(localStorage.getItem(`${cat_id}-${prod_id}`));
    if(!val)
        val=0;
    return val;
}

function remove_carrito(cat_id, prod_id)
{
    let prodarray = get_prodarray();

    prodarray = prodarray.filter(x => x !== `${cat_id}-${prod_id}`);
    localStorage.removeItem(`${cat_id}-${prod_id}`);

    save_prodarray(prodarray);
}


function vaciar_carrito()
{
    let prodarray = get_prodarray();

    for(const index in prodarray)
    {
        localStorage.removeItem(prodarray[index]);
    }
    
    save_prodarray([]);
}

function set_carrito(cat_id, prod_id, ammount, cb)
{
    let prodarray = get_prodarray();

    if(ammount<0)
    {
        remove_carrito(cat_id, prod_id);
        if(cb)//callback
            cb(0);
    }
    else
    {
        localStorage.setItem(`${cat_id}-${prod_id}`, ammount);

        const index_prod = prodarray.indexOf(`${cat_id}-${prod_id}`);

        if(index_prod==-1)
            prodarray.push(`${cat_id}-${prod_id}`);

        save_prodarray(prodarray);
        if(cb)//callback
            cb(ammount);
    }
}


/**
 * array to string : JSON.stringify(array)
 * string to array : JSON.parse(str)
 */