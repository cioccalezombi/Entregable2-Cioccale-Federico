const DOLAR_OFICIAL = 1096.75;
const DOLAR_BLUE = 1345;
const TOPE_DOLARES = 200;

let historialOperaciones = [];

const calcularDolares = () => {
    let pesos = prompt("¿Cuántos pesos tenéss?");
    pesos = parseFloat(pesos);

    if (isNaN(pesos) || pesos <= 0) {
        alert("Por favor, ingresá un monto válido en pesos.");
        return;
    }

    let dolaresDeseados = prompt("¿Cuántos dólares querés comprar?");
    dolaresDeseados = parseFloat(dolaresDeseados);

    if (isNaN(dolaresDeseados) || dolaresDeseados <= 0) {
        alert("Por favor, ingresa un monto válido de dólares.");
        return;
    }

    if (dolaresDeseados > TOPE_DOLARES) {
        alert(`Solo podés comprar hasta ${TOPE_DOLARES} dólares.`);
        dolaresDeseados = TOPE_DOLARES;
    }

    let costoPesos = dolaresDeseados * DOLAR_OFICIAL;
    if (costoPesos > pesos) {
        dolaresDeseados = pesos / DOLAR_OFICIAL; // Calcular cuántos dólares puede comprar
        alert(`No tenéss suficientes pesos para comprar ${dolaresDeseados.toFixed(2)} dólares.\nCon ${pesos.toFixed(2)} pesos, podés comprar hasta ${dolaresDeseados.toFixed(2)} dólares.`);
        costoPesos = dolaresDeseados * DOLAR_OFICIAL; // Actualizar costo
    }

    let dolaresAVender = prompt(`Tienes ${dolaresDeseados.toFixed(2)} dólares comprados.\n¿Cuántos dólares querés vender en el mercado paralelo?`);
    dolaresAVender = parseFloat(dolaresAVender);

    if (isNaN(dolaresAVender) || dolaresAVender < 0) {
        alert("Por favor, ingresá un monto válido para vender.");
        return;
    }

    if (dolaresAVender > dolaresDeseados) {
        alert(`No podés vender más de ${dolaresDeseados.toFixed(2)} dólares que compraste.`);
        dolaresAVender = dolaresDeseados;
    }

    let pesosObtenidos = dolaresAVender * DOLAR_BLUE;

    let diferencia = pesosObtenidos - (dolaresAVender * DOLAR_OFICIAL);

    alert(`Compraste ${dolaresDeseados.toFixed(2)} dólares por ${costoPesos.toFixed(2)} pesos.\nVendiste ${dolaresAVender.toFixed(2)} dólares en el mercado paralelo por ${pesosObtenidos.toFixed(2)} pesos.\nLa diferencia que hiciste es: ${diferencia.toFixed(2)} pesos.`);

    let operacion = {
        pesosIngresados: pesos,
        dolaresComprados: dolaresDeseados,
        dolaresVendidos: dolaresAVender,
        pesosObtenidos: pesosObtenidos,
        diferencia: diferencia
    };
    historialOperaciones.push(operacion);

    console.log("Operación realizada:");
    console.log(operacion);

    console.log("Historial de operaciones:");
    for (let i = 0; i < historialOperaciones.length; i++) {
        console.log(`Operación ${i + 1}: ${historialOperaciones[i].pesosIngresados.toFixed(2)} pesos -> Compró ${historialOperaciones[i].dolaresComprados.toFixed(2)} USD -> Vendió ${historialOperaciones[i].dolaresVendidos.toFixed(2)} USD por ${historialOperaciones[i].pesosObtenidos.toFixed(2)} pesos -> Diferencia: ${historialOperaciones[i].diferencia.toFixed(2)} pesos`);
    }

    let repetir = confirm("¿Quieres hacer otro cálculo?");
    let contador = 0;
    while (repetir && contador < 3) { // Límite de 3 repeticiones
        calcularDolares();
        contador++;
        if (contador < 3) {
            repetir = confirm("¿Quieres hacer otro cálculo?");
        } else {
            alert("Límite de cálculos alcanzado.");
        }
    }
};

// Ejecutar la función con un retraso de 3 segundos
setTimeout(() => {
    calcularDolares();
}, 2000);
