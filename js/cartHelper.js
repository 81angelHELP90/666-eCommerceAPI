const cartBtn = document.getElementById("dropdownMenuButton");
const finishBuyingBtn = document.getElementById("btnFinal");
const confirmarCompraBtn = document.getElementById("btn-ConfirmarCompra");
const btnCloseFinishModal = document.getElementById("Close-finishModal");

confirmarCompraBtn.addEventListener("click", function(){
    let flagInfo = true;
    const modal = document.getElementsByClassName("form-control");
    const msgWarning = document.getElementById("warning");

    for(let i=0; i < modal.length; i++){
        if(modal[i].value === ""){
            flagInfo = false;
            i = modal.length;
        }
    }

    if(flagInfo){ //msgWarning
        //Envio la info al back y si esta todo ok confirmo la compra:
        for(let i=0; i < modal.length; i++)
            modal[i].value = "";
        
        $("#infoModal").modal('hide');
        msgWarning.classList.add("hideElement");
        $("#finishModal").modal('show');
    } else 
        msgWarning.classList.remove("hideElement");
    
    
});

btnCloseFinishModal.addEventListener("click", function(){
    $("#finishModal").modal('hide');
    
    setTimeout(() => {
        window.location.reload();
    }, 500);
});

cartBtn.addEventListener("click", function(){
    let spanSinProductos = document.getElementById("sinProductos"); 
    let boxBtnFinishBuy = document.getElementById("box-btnFinal"); 

    if(localStorage.getItem("itemCounter") == 0) 
        if(localStorage.getItem("addMsg") === "true"){
            localStorage.setItem("addMsg", false);
            spanSinProductos.classList.remove("hideElement");
            if(!boxBtnFinishBuy.classList.value.includes("hideElement"))
                boxBtnFinishBuy.classList.add("hideElement");
        }

    if(localStorage.getItem("itemCounter") !== "0") {
        spanSinProductos.classList.add("hideElement");
        boxBtnFinishBuy.classList.remove("hideElement");
        showTotal();
    }
});

async function listItem(listItems, itemId, _delete){
    const countItem = document.getElementById("countItem");
    let count = parseInt(localStorage.getItem("itemCounter"));

    if(!_delete){
        let addElement = await appendNewChild(itemId);

        if(addElement){ 
            countItem.innerHTML = count + 1;
            localStorage.setItem("itemCounter", countItem.innerHTML);
            localStorage.setItem("addMsg", false); 

            await buildElementListItem(itemId, listItems);
        }
        
    } 

    if(_delete && removeItem(itemId))  {
        countItem.innerHTML = count - 1;
        localStorage.setItem("itemCounter", countItem.innerHTML);
        
        if(localStorage.getItem("itemCounter") == 0)
            localStorage.setItem("addMsg", true);
    }
}

function navDetail(itemId, listItems){
    console.log("Detalle del item: ", itemId);
}

function buildElementListItem(id, items){
    let addItem = items.filter(item => item.id === id);
    let cartListElement = document.getElementById("box-items");
    let element_div = document.createElement("div");
    element_div.className = "box-item-list";

    //Div imagenes:
    let box_Img = document.createElement("div");
    box_Img.className = "box-item-img";
    
    let element_img = document.createElement("img");
    element_img.className = "imgItem";
    element_img.src = addItem[0].image;

    let element_count = document.createElement("span");
    element_count.className = "badge bg-primary rounded-pill";
    element_count.innerHTML = 1;

    let element_items = document.createElement("div");
    let element_p = document.createElement("p");
    element_p.innerHTML = `$ ${addItem[0].price} | ${addItem[0].title}`

    //Esto es solo para tener el id del producto y poder operar con ese id
    let element_id = document.createElement("p");
    element_id.innerHTML = addItem[0].id;
    element_id.className = "hideElement";

    cartListElement.appendChild(element_div);
    element_div.appendChild(element_items);

    box_Img.appendChild(element_img);
    box_Img.appendChild(element_count);
    element_items.appendChild(box_Img);
    element_items.appendChild(element_p);
    element_items.appendChild(element_id);
}

function appendNewChild(id){
    try {
        let cartListElement = document.getElementById("box-items");

        //Para poder agregar el primer item
        let _appendNewChild = (cartListElement.length > 0) ? false : true;
    
        cartListElement.childNodes.forEach((child, i) => {
            if(child.className && child.className.includes("box-item-list"))
                if(child.children[0] && id == child.children[0].children[2].innerText){
                    let quantitySameItem = parseInt(child.children[0].children[0].children[1].innerHTML) + 1; 
                    child.children[0].children[0].children[1].innerHTML = quantitySameItem;

                    _appendNewChild = false;
                    return _appendNewChild;
                }
        });

        return _appendNewChild;
    } catch (error) {
        console.error(error);
    }
}

function removeItem(id){
    try {
        let cartListElement = document.getElementById("box-items");
        let childDelete = false;

        cartListElement.childNodes.forEach((child, i) => {
            if(child.className && child.className.includes("box-item-list"))
                if(child.children[0] && id == child.children[0].children[2].innerText){
                    let quantitySameItem = parseInt(child.children[0].children[0].children[1].innerHTML) - 1; 
                    child.children[0].children[0].children[1].innerHTML = quantitySameItem;
            
                    if(quantitySameItem == 0) {
                        child.removeChild(child.children[0]);
                        childDelete = true;
                    }
                }
        });

        return childDelete;
    } catch (error) {
        console.error(error);
    }
}

function showTotal(){
    let total = 0;
    let totalElement = document.getElementById("total");
    let cartListElement = document.getElementById("box-items");

    try {
        cartListElement.childNodes.forEach((child) => {

            if(child.className && child.className.includes("box-item-list"))
                if(child.children[0]){
                    let price = parseFloat(child.children[0].children[1].textContent.split("|")[0].split("$")[1]);
                    let count = parseInt(child.children[0].children[0].children[1].textContent);
    
                    total += price * count;
                }
        });
    } catch (error) {
        console.log(error);
    }

    totalElement.innerHTML = "Total: $" + total;

    document.getElementById("total-modal").innerHTML = "Total a pagar: $ " + total;
}


