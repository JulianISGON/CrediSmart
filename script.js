// ==========================================
// INICIALIZACIÓN Y CONFIGURACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSimulator();
    initForm();
});

// ==========================================
// NAVEGACIÓN RESPONSIVA
// ==========================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ==========================================
// SIMULADOR DE CRÉDITOS
// ==========================================

function initSimulator() {
    const montoRange = document.getElementById('montoRange');
    const monto = document.getElementById('monto');
    const plazoRange = document.getElementById('plazoRange');
    const plazo = document.getElementById('plazo');
    const simularBtn = document.getElementById('simularBtn');
    const tipoCredito = document.getElementById('tipoCredito');
    const tasaInput = document.getElementById('tasa');
    if (!simularBtn) return;

    // Sincronizar rango con input de monto
    if (montoRange && monto) {
        montoRange.addEventListener('input', () => {
            monto.value = montoRange.value;
            updateMontoRange();
        });
        monto.addEventListener('input', () => {
            if (monto.value >= parseInt(montoRange.min) && monto.value <= parseInt(montoRange.max)) {
                montoRange.value = monto.value;
            }
            updateMontoRange();
        });
    }
    // Sincronizar rango con input de plazo
    if (plazoRange && plazo) {
        plazoRange.addEventListener('input', () => {
            plazo.value = plazoRange.value;
            updatePlazoRange();
        });
        plazo.addEventListener('input', () => {
            if (plazo.value >= parseInt(plazoRange.min) && plazo.value <= parseInt(plazoRange.max)) {
                plazoRange.value = plazo.value;
            }
            updatePlazoRange();
        });
    }
    // Actualizar límites según tipo de crédito
    if (tipoCredito) {
        tipoCredito.addEventListener('change', (e) => {
            updateCreditLimits(e.target.value);
        });
    }
    // Botón simular
    simularBtn.addEventListener('click', simulateCredit);
    // Permitir simular con Enter
    if (tasaInput) {
        tasaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') simulateCredit();
        });
    }
}

function updateMontoRange() {
    const montoRange = document.getElementById('montoRange');
    const monto = document.getElementById('monto');
    if (montoRange && monto) {
        const min = parseInt(montoRange.min);
        const max = parseInt(montoRange.max);
        const valor = parseInt(monto.value);
        const porcentaje = ((valor - min) / (max - min)) * 100;
        montoRange.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${porcentaje}%, var(--border-color) ${porcentaje}%, var(--border-color) 100%)`;
    }
}

function updatePlazoRange() {
    const plazoRange = document.getElementById('plazoRange');
    const plazo = document.getElementById('plazo');
    if (plazoRange && plazo) {
        const min = parseInt(plazoRange.min);
        const max = parseInt(plazoRange.max);
        const valor = parseInt(plazo.value);
        const porcentaje = ((valor - min) / (max - min)) * 100;
        plazoRange.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${porcentaje}%, var(--border-color) ${porcentaje}%, var(--border-color) 100%)`;
    }
}

function updateCreditLimits(tipo) {
    const limites = {
        personal: { min: 5000, max: 50000, tasa: 10.5, plazoMin: 12, plazoMax: 60, plazoDefault: 12, tasaMin: 8.5, tasaMax: 12.5 },
        automotriz: { min: 15000, max: 200000, tasa: 8, plazoMin: 24, plazoMax: 84, plazoDefault: 24, tasaMin: 6.5, tasaMax: 9.5 },
        hipotecario: { min: 100000, max: 1000000, tasa: 6, plazoMin: 120, plazoMax: 360, plazoDefault: 120, tasaMin: 4.5, tasaMax: 7.5 },
        empresarial: { min: 50000, max: 500000, tasa: 9.5, plazoMin: 12, plazoMax: 120, plazoDefault: 12, tasaMin: 7.5, tasaMax: 11.5 },
        educativo: { min: 5000, max: 100000, tasa: 5, plazoMin: 12, plazoMax: 120, plazoDefault: 12, tasaMin: 3.5, tasaMax: 6.5 },
        linea: { min: 5000, max: 150000, tasa: 12.5, plazoMin: 12, plazoMax: 120, plazoDefault: 12, tasaMin: 9.5, tasaMax: 15.5 }
    };
    if (!limites[tipo]) return;
    const montoRange = document.getElementById('montoRange');
    const monto = document.getElementById('monto');
    const tasa = document.getElementById('tasa');
    const plazoRange = document.getElementById('plazoRange');
    const plazo = document.getElementById('plazo');
    if (!montoRange || !monto || !tasa || !plazoRange || !plazo) return;
    // Monto
    montoRange.min = limites[tipo].min;
    montoRange.max = limites[tipo].max;
    const valorActual = parseInt(monto.value);
    const nuevoValor = valorActual < limites[tipo].min || valorActual > limites[tipo].max
        ? limites[tipo].min
        : valorActual;
    montoRange.value = nuevoValor;
    monto.value = nuevoValor;
    monto.min = limites[tipo].min;
    monto.max = limites[tipo].max;
    // Tasa de interés
    tasa.value = limites[tipo].tasa;
    tasa.min = limites[tipo].tasaMin;
    tasa.max = limites[tipo].tasaMax;
    updateMontoRange();
    // Plazo
    plazoRange.min = limites[tipo].plazoMin;
    plazoRange.max = limites[tipo].plazoMax;
    plazo.min = limites[tipo].plazoMin;
    plazo.max = limites[tipo].plazoMax;
    // Si el valor actual está fuera del rango, lo ajustamos
    let valorPlazo = parseInt(plazo.value);
    if (valorPlazo < limites[tipo].plazoMin || valorPlazo > limites[tipo].plazoMax) {
        valorPlazo = limites[tipo].plazoDefault;
    }
    plazoRange.value = valorPlazo;
    plazo.value = valorPlazo;
    updatePlazoRange();
}

function simulateCredit() {
    const tipoCredito = document.getElementById('tipoCredito')?.value;
    const monto = parseFloat(document.getElementById('monto')?.value);
    const plazo = parseFloat(document.getElementById('plazo')?.value);
    const tasa = parseFloat(document.getElementById('tasa')?.value);
    if (!tipoCredito || isNaN(monto) || isNaN(plazo) || isNaN(tasa)) {
        showAlert('Por favor completa todos los campos', 'error');
        return;
    }
    if (monto < 5000) {
        showAlert('El monto mínimo es $5,000', 'error');
        return;
    }
    if (plazo < 12 || plazo % 12 !== 0) {
        showAlert('El plazo debe ser múltiplo de 12 meses', 'error');
        return;
    }
    const tasaMensual = tasa / 100 / 12;
    const cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, plazo)) /
        (Math.pow(1 + tasaMensual, plazo) - 1);
    const totalPagar = cuota * plazo;
    const totalIntereses = totalPagar - monto;
    const cuotaMensualEl = document.getElementById('cuotaMensual');
    const totalPagarEl = document.getElementById('totalPagar');
    const totalInteresesEl = document.getElementById('totalIntereses');
    if (cuotaMensualEl) cuotaMensualEl.textContent = '$' + formatCurrency(cuota);
    if (totalPagarEl) totalPagarEl.textContent = '$' + formatCurrency(totalPagar);
    if (totalInteresesEl) totalInteresesEl.textContent = '$' + formatCurrency(totalIntereses);
    generateAmortizationTable(monto, cuota, tasaMensual, plazo);
    const resultadosSimulacion = document.getElementById('resultadosSimulacion');
    const mensajeSinSimulacion = document.getElementById('mensajeSinSimulacion');
    if (resultadosSimulacion) resultadosSimulacion.classList.remove('hidden');
    if (mensajeSinSimulacion) mensajeSinSimulacion.style.display = 'none';
    if (resultadosSimulacion) resultadosSimulacion.scrollIntoView({ behavior: 'smooth' });
}

function generateAmortizationTable(monto, cuota, tasaMensual, plazo) {
    let saldo = monto;
    let html = '';
    const cuotasAMostrar = Math.min(6, plazo);
    for (let i = 1; i <= cuotasAMostrar; i++) {
        const interes = saldo * tasaMensual;
        const capital = cuota - interes;
        saldo -= capital;
        html += `
            <tr>
                <td>${i}</td>
                <td>$${formatCurrency(cuota)}</td>
                <td>$${formatCurrency(capital)}</td>
                <td>$${formatCurrency(interes)}</td>
                <td>$${formatCurrency(Math.max(0, saldo))}</td>
            </tr>
        `;
    }
    const tabla = document.getElementById('tablaAmortizacion');
    if (tabla) tabla.innerHTML = html;
}

// ==========================================
// FORMULARIO DE SOLICITUD
// ==========================================

function initForm() {
    const form = document.getElementById('solicitudForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendRequest();
    });
}

function nextStep(step) {
    const pasoActual = document.querySelector('.form-step.active');
    if (!pasoActual) return;
    if (step > parseInt(pasoActual.id.replace('step', '')) && !validateStep(pasoActual)) {
        return;
    }
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    const next = document.getElementById('step' + step);
    if (next) next.classList.add('active');
    document.querySelectorAll('.progress-item').forEach(el => el.classList.remove('active'));
    const progress = document.querySelector(`[data-step="${step}"]`);
    if (progress) progress.classList.add('active');
    window.scrollTo(0, 0);
}

function validateStep(paso) {
    const inputs = paso.querySelectorAll('input[required], select[required], textarea[required]');
    let esValido = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input);
            esValido = false;
        } else {
            clearFieldError(input);
        }
    });
    return esValido;
}

function showFieldError(campo) {
    campo.style.borderColor = 'var(--danger-color)';
    const errorDiv = document.getElementById('error' + capitalizeFirst(campo.name));
    if (errorDiv) errorDiv.textContent = 'Este campo es obligatorio';
}
function clearFieldError(campo) {
    campo.style.borderColor = '';
    const errorDiv = document.getElementById('error' + capitalizeFirst(campo.name));
    if (errorDiv) errorDiv.textContent = '';
}

function sendRequest() {
    // Validar todos los pasos
    let esValido = true;
    document.querySelectorAll('.form-step').forEach(paso => {
        if (!validateStep(paso)) esValido = false;
    });
    if (!esValido) {
        showAlert('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    // Validar términos
    const terminos = document.getElementById('terminos');
    const privacidad = document.getElementById('privacidad');
    if (!terminos?.checked || !privacidad?.checked) {
        showAlert('Debes aceptar los términos y la política de privacidad', 'error');
        return;
    }
    // Validar email
    const email = document.getElementById('email')?.value;
    if (!validateEmail(email)) {
        showAlert('Por favor ingresa un email válido', 'error');
        return;
    }
    // Validar documento
    const documento = document.getElementById('documento')?.value;
    if (!documento || documento.length < 8) {
        showAlert('Por favor ingresa un documento válido', 'error');
        return;
    }
    // Validar edad
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento')?.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (fechaNacimiento > hoy) edad = 0;
    if (edad < 18) {
        showAlert('Debes ser mayor de 18 años para solicitar un crédito', 'error');
        return;
    }
    // Validar ingreso
    const ingreso = parseFloat(document.getElementById('ingresoBruto')?.value);
    if (isNaN(ingreso) || ingreso < 1000) {
        showAlert('El ingreso mínimo debe ser $1,000', 'error');
        return;
    }
    // Generar número de solicitud
    const numeroSolicitud = 'SOL-' + Date.now();
    const numeroSolicitudEl = document.getElementById('numeroSolicitud');
    if (numeroSolicitudEl) numeroSolicitudEl.textContent = numeroSolicitud;
    // Mostrar mensaje de éxito
    const formEl = document.querySelector('.solicitud-form');
    const mensajeExitoEl = document.getElementById('mensajeExito');
    if (formEl) formEl.style.display = 'none';
    if (mensajeExitoEl) mensajeExitoEl.classList.remove('hidden');
    if (mensajeExitoEl) mensajeExitoEl.scrollIntoView({ behavior: 'smooth' });
    // Guardar en localStorage
    const solicitud = {
        numero: numeroSolicitud,
        fecha: new Date().toLocaleString('es-ES'),
        nombre: document.getElementById('nombre')?.value,
        email: document.getElementById('email')?.value,
        tipoCredito: document.getElementById('tipoCredito')?.value,
        monto: document.getElementById('montoCredito')?.value
    };
    let solicitudes = [];
    try {
        solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    } catch (e) {
        solicitudes = [];
    }
    solicitudes.push(solicitud);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

function formatCurrency(numero) {
    return Number(numero).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function capitalizeFirst(texto) {
    return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : '';
}
function showAlert(mensaje, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    if (tipo === 'error') {
        alerta.style.backgroundColor = 'var(--danger-color)';
    } else if (tipo === 'success') {
        alerta.style.backgroundColor = 'var(--secondary-color)';
    } else {
        alerta.style.backgroundColor = 'var(--primary-color)';
    }
    document.body.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 4000);
}

// ==========================================
// ANIMACIÓN DE ENTRADA PARA ALERTAS
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);