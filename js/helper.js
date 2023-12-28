
function getDataAPI(){
    const urlProd = "https://fakestoreapi.com/products";
    //const urlProd = "https://api.escuelajs.co/api/v1/products";
    
    fetch(urlProd)
        .then(response => {
            if(response.ok) 
                return response.json();
            else 
                throw new Error("Error fetch");
        })
        .then(data => {
            bindingData(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function bindingData(items) {
    let mySection = document.getElementById("imgSection");
    localStorage.setItem("itemCounter", 0);
    localStorage.setItem("addMsg", true);
    localStorage.setItem("itemsAndCant", "");

    items.forEach(item => {
        let divCard = document.createElement("div");
        divCard.className = "card";

        mySection.appendChild(divCard);

        //img dentro del div Padre:
        let imgCard = document.createElement("img");
        imgCard.className = "imgCard";
        imgCard.src = (item.image) ? item.image : item.images[0];

        imgCard.addEventListener("click", function(){
            navDetail(item.id, items);
        });

        //div dentro del div Padre:
        let bodyCard = document.createElement("div");
        bodyCard.className = "card-body";

        //h5 dentro del div2:
        let h5Body = document.createElement("h5");
        h5Body.className = "card-title";
        h5Body.innerHTML = item.title;

        //p dentro del div2:
        let pBody = document.createElement("p");
        pBody.className = "card-text";
        pBody.innerHTML = item.description;

        //Footter 
        let footerCard = document.createElement("div");
        footerCard.className = "footter";

        let btnAgregar = document.createElement("button");
        btnAgregar.className = "btn btn-primary cartBtn";
        btnAgregar.innerHTML = "Agregar";
        btnAgregar.addEventListener("click", function(){
            listItem(items, item.id, false);
        });

        //Buttom dentro del footter
        let btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-secondary cartBtn";
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.addEventListener("click", function(){
            listItem(items, item.id, true);
        });

        divCard.appendChild(bodyCard);
        bodyCard.appendChild(h5Body);
        divCard.appendChild(imgCard);
        divCard.appendChild(pBody);
        divCard.appendChild(footerCard);
        footerCard.appendChild(btnAgregar);
        footerCard.appendChild(btnEliminar);
    });
}

getDataAPI();
