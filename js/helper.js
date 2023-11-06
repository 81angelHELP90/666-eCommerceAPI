function getMontoInicial(){
    let plazo = ""; 
    let Msg = "Debe ingresar un monto valido";
    let MsgP = "Debe ingresar alguno de los plazos sugeridos";
    
    let montoInicial = prompt("Por favor, ingrese el monto deceado:");
    
    if(isNaN(montoInicial) || parseFloat(montoInicial) < 1)
        alert(Msg);
    else 
        plazo = prompt("Por favor, ingrese alguno de estos plazo: 3, 6, 12, 24, 36, 48 o 72 meses");

    if(isNaN(plazo) || parseInt(plazo) < 1)
        alert(MsgP);
    else
        calcularCuota(montoInicial, plazo);
}

function calcularCuota(monto, plazo){
    let msgCFT = "Costo Financiero Total (CFT) de 135 %";
    let listPlazos = [3, 6, 12, 24, 36, 48, 72];
    let nPlazo = parseInt(plazo);
    let nMonto = parseInt(monto);
    let montoCuotaFinal = 0;
    let nPlazoValido = false;

    for(let i=0; i < listPlazos.length; i++){
        if(nPlazo === listPlazos[i]) {
            nPlazoValido = true;
            i = listPlazos.length;
        }
    }

    if(!nPlazoValido)
        alert(Msg);
    else {
        montoCuotaFinal = (nMonto + nMonto * 1.35) / nPlazo;
        alert(msgCFT + "\nEl monto de la cuota es: $ " + montoCuotaFinal.toFixed(2));
    }
}