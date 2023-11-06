function getDataAPI(){
    const urlProd = "https://fakestoreapi.com/products";
    
    fetch(urlProd)
        .then(response => {
            if(response.ok) 
                return response.json();
            else 
                throw new Error("Error fetch");
        })
        .then(data => {
            //console.log(data);
            bindingData(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function bindingData(items) {
    let Imgs = document.getElementsByClassName("card");

    let img = document.getElementById("img1");

    img.src = items[0].image; //"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg";

    /*
    for(let i=0; Imgs.length < i; i++){
        Imgs[i].children[0].src = items[i].image;
    }
    */

    //Imgs[0].children[0].src = items[0].image;
}

getDataAPI();
