const DOLAR_OFICIAL = 1096.75;
const DOLAR_BLUE = 1345;
const TOPE_DOLARES = 200;

let historialOperaciones = JSON.parse(localStorage.getItem('historialOperaciones')) || [];

const form = document.getElementById('dolarForm');
const resultadoDiv = document.getElementById('resultado');
const historialDiv = document.getElementById('historial');
const limpiarHistorialBtn = document.getElementById('limpiarHistorial');

const mostrarMensaje = (mensaje, esError = false) => {
    resultadoDiv.innerHTML = `<p class="${esError ? 'error' : ''}">${mensaje}</p>`;
};

const actualizarHistorial = () => {
    historialDiv.innerHTML = '';
    historialOperaciones.forEach((op, index) => {
        const operacionDiv = document.createElement('div');
        operacionDiv.innerHTML = `
            Operación ${index + 1}: ${op.pesosIngresados.toFixed(2)} pesos → 
            Compró ${op.dolaresComprados.toFixed(2)} USD → 
            Vendió ${op.dolaresVendidos.toFixed(2)} USD por ${op.pesosObtenidos.toFixed(2)} pesos → 
            Diferencia: ${op.diferencia.toFixed(2)} pesos
        `;
        historialDiv.appendChild(operacionDiv);
    });
    localStorage.setItem('historialOperaciones', JSON.stringify(historialOperaciones));
};

const calcularDolares = (e) => {
    e.preventDefault();

    const pesos = parseFloat(document.getElementById('pesos').value);
    const dolaresDeseados = parseFloat(document.getElementById('dolaresDeseados').value);
    const dolaresAVender = parseFloat(document.getElementById('dolaresAVender').value);

    if (isNaN(pesos) || pesos <= 0) {
        mostrarMensaje('Por favor, ingresa un monto válido en pesos.', true);
        return;
    }

    if (isNaN(dolaresDeseados) || dolaresDeseados <= 0) {
        mostrarMensaje('Por favor, ingresa un monto válido de dólares.', true);
        return;
    }

    let dolaresComprados = dolaresDeseados;
    if (dolaresDeseados > TOPE_DOLARES) {
        mostrarMensaje(`Solo puedes comprar hasta ${TOPE_DOLARES} dólares.`, true);
        dolaresComprados = TOPE_DOLARES;
    }

    let costoPesos = dolaresComprados * DOLAR_OFICIAL;
    if (costoPesos > pesos) {
        dolaresComprados = pesos / DOLAR_OFICIAL;
        costoPesos = dolaresComprados * DOLAR_OFICIAL;
        mostrarMensaje(`No tienes suficientes pesos. Con ${pesos.toFixed(2)} pesos, puedes comprar hasta ${dolaresComprados.toFixed(2)} dólares.`, true);
    }

    if (isNaN(dolaresAVender) || dolaresAVender < 0) {
        mostrarMensaje('Por favor, ingresa un monto válido para vender.', true);
        return;
    }

    let dolaresVendidos = dolaresAVender;
    if (dolaresAVender > dolaresComprados) {
        mostrarMensaje(`No puedes vender más de ${dolaresComprados.toFixed(2)} dólares.`, true);
        dolaresVendidos = dolaresComprados;
    }

    const pesosObtenidos = dolaresVendidos * DOLAR_BLUE;
    const diferencia = pesosObtenidos - (dolaresVendidos * DOLAR_OFICIAL);

    const mensaje = `
        Compraste ${dolaresComprados.toFixed(2)} dólares por ${costoPesos.toFixed(2)} pesos.<br>
        Vendiste ${dolaresVendidos.toFixed(2)} dólares en el mercado paralelo por ${pesosObtenidos.toFixed(2)} pesos.<br>
        La diferencia que hiciste es: ${diferencia.toFixed(2)} pesos.
    `;
    mostrarMensaje(mensaje);

    const operacion = {
        pesosIngresados: pesos,
        dolaresComprados,
        dolaresVendidos,
        pesosObtenidos,
        diferencia
    };
    historialOperaciones.push(operacion);
    actualizarHistorial();

    form.reset();
};

const limpiarHistorial = () => {
    historialOperaciones = [];
    localStorage.removeItem('historialOperaciones');
    actualizarHistorial();
    mostrarMensaje('Historial limpiado.');
};

// evensos
form.addEventListener('submit', calcularDolares);
limpiarHistorialBtn.addEventListener('click', limpiarHistorial);

// carga historial
actualizarHistorial();