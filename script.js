// ==========================================
// INICIALIZACIÓN Y CONFIGURACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacion();
    inicializarSimulador();
    inicializarFormulario();
});

// ==========================================
// NAVEGACIÓN RESPONSIVA
// ==========================================

function inicializarNavegacion() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Cerrar menú al hacer click afuera
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// ==========================================
// SIMULADOR DE CRÉDITOS
// ==========================================

function inicializarSimulador() {
    const montoRange = document.getElementById('montoRange');
    const monto = document.getElementById('monto');
    const plazoRange = document.getElementById('plazoRange');
    const plazo = document.getElementById('plazo');
    const simularBtn = document.getElementById('simularBtn');
    const tipoCredito = document.getElementById('tipoCredito');

    if (!simularBtn) return;

    // Sincronizar rango con input de monto
    if (montoRange && monto) {
        montoRange.addEventListener('input', function() {
            monto.value = this.value;
            actualizarRangoMonto();
        });

        monto.addEventListener('input', function() {
            if (this.value >= 5000 && this.value <= 500000) {
                montoRange.value = this.value;
            }
            actualizarRangoMonto();
        });
    }

    // Sincronizar rango con input de plazo
    if (plazoRange && plazo) {
        plazoRange.addEventListener('input', function() {
            plazo.value = this.value;
            actualizarRangoPlazo();
        });

        plazo.addEventListener('input', function() {
            if (this.value >= 12 && this.value <= 120) {
                plazoRange.value = this.value;
            }
            actualizarRangoPlazo();
        });
    }

    // Actualizar límites según tipo de crédito
    if (tipoCredito) {
        tipoCredito.addEventListener('change', function() {
            actualizarLimitesCredito(this.value);
        });
    }

    // Botón simular
    simularBtn.addEventListener('click', function() {
        realizarSimulacion();
    });

    // Permitir simular con Enter
    const tasaInput = document.getElementById('tasa');
    if (tasaInput) {
        tasaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarSimulacion();
            }
        });
    }
}

function actualizarRangoMonto() {
    const montoRange = document.getElementById('montoRange');
    const monto = document.getElementById('monto');
    if (montoRange && monto) {
        const valor = monto.value;
        const porcentaje = ((valor - 5000) / (500000 - 5000)) * 100;
        montoRange.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${porcentaje}%, var(--border-color) ${porcentaje}%, var(--border-color) 100%)`;
    }
}

function actualizarRangoPlazo() {
    const plazoRange = document.getElementById('plazoRange');
    const plazo = document.getElementById('plazo');
    if (plazoRange && plazo) {
        const valor = plazo.value;
        const porcentaje = ((valor - 12) / (120 - 12)) * 100;
        plazoRange.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${porcentaje}%, var(--border-color) ${porcentaje}%, var(--border-color) 100%)`;
    }
}

function actualizarLimitesCredito(tipo) {
    const limites = {
        personal: { min: 5000, max: 50000, tasa: 10.5 },
        automotriz: { min: 15000, max: 200000, tasa: 8 },
        hipotecario: { min: 100000, max: 1000000, tasa: 6 },
        empresarial: { min: 50000, max: 500000, tasa: 9.5 },
        educativo: { min: 5000, max: 100000, tasa: 5 },
        linea: { min: 5000, max: 150000, tasa: 12.5 }
    };

    if (limites[tipo]) {
        const montoRange = document.getElementById('montoRange');
        const monto = document.getElementById('monto');
        const tasa = document.getElementById('tasa');

        montoRange.min = limites[tipo].min;
        montoRange.max = limites[tipo].max;
        montoRange.value = limites[tipo].min;
        monto.value = limites[tipo].min;
        monto.min = limites[tipo].min;
        monto.max = limites[tipo].max;
        tasa.value = limites[tipo].tasa;

        actualizarRangoMonto();
    }
}

function realizarSimulacion() {
    const tipoCredito = document.getElementById('tipoCredito')?.value;
    const monto = parseFloat(document.getElementById('monto')?.value);
    const plazo = parseFloat(document.getElementById('plazo')?.value);
    const tasa = parseFloat(document.getElementById('tasa')?.value);

    // Validar
    if (!tipoCredito || !monto || !plazo || !tasa) {
        mostrarAlerta('Por favor completa todos los campos', 'error');
        return;
    }

    if (monto < 5000) {
        mostrarAlerta('El monto mínimo es $5,000', 'error');
        return;
    }

    if (plazo < 12 || plazo % 12 !== 0) {
        mostrarAlerta('El plazo debe ser múltiplo de 12 meses', 'error');
        return;
    }

    // Cálculo de amortización
    const tasaMensual = tasa / 100 / 12;
    const cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, plazo)) / 
                  (Math.pow(1 + tasaMensual, plazo) - 1);
    const totalPagar = cuota * plazo;
    const totalIntereses = totalPagar - monto;

    // Mostrar resultados
    document.getElementById('cuotaMensual').textContent = 
        '$' + formatearMoneda(cuota);
    document.getElementById('totalPagar').textContent = 
        '$' + formatearMoneda(totalPagar);
    document.getElementById('totalIntereses').textContent = 
        '$' + formatearMoneda(totalIntereses);

    // Generar tabla de amortización
    generarTablaAmortizacion(monto, cuota, tasaMensual, plazo);

    // Mostrar resultados
    document.getElementById('resultadosSimulacion').classList.remove('hidden');
    document.getElementById('mensajeSinSimulacion').style.display = 'none';

    // Scroll a resultados
    document.getElementById('resultadosSimulacion').scrollIntoView({ behavior: 'smooth' });
}

function generarTablaAmortizacion(monto, cuota, tasaMensual, plazo) {
    let saldo = monto;
    let html = '';

    // Mostrar primeras 6 cuotas o todas si son menos
    const cuotasAMostrar = Math.min(6, plazo);

    for (let i = 1; i <= cuotasAMostrar; i++) {
        const interes = saldo * tasaMensual;
        const capital = cuota - interes;
        saldo -= capital;

        html += `
            <tr>
                <td>${i}</td>
                <td>$${formatearMoneda(cuota)}</td>
                <td>$${formatearMoneda(capital)}</td>
                <td>$${formatearMoneda(interes)}</td>
                <td>$${formatearMoneda(Math.max(0, saldo))}</td>
            </tr>
        `;
    }

    document.getElementById('tablaAmortizacion').innerHTML = html;
}

// ==========================================
// FORMULARIO DE SOLICITUD
// ==========================================

function inicializarFormulario() {
    const form = document.getElementById('solicitudForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarSolicitud();
        });
    }
}

function nextStep(step) {
    // Validar paso actual antes de pasar al siguiente
    const pasoActual = document.querySelector('.form-step.active');
    
    if (step > parseInt(pasoActual.id.replace('step', '')) && !validarPaso(pasoActual)) {
        return;
    }

    // Cambiar paso
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');

    // Actualizar progreso
    document.querySelectorAll('.progress-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`[data-step="${step}"]`).classList.add('active');

    // Scroll al inicio
    window.scrollTo(0, 0);
}

function validarPaso(paso) {
    const inputs = paso.querySelectorAll('input[required], select[required], textarea[required]');
    let esValido = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            mostrarErrorCampo(input);
            esValido = false;
        } else {
            limpiarErrorCampo(input);
        }
    });

    return esValido;
}

function mostrarErrorCampo(campo) {
    campo.style.borderColor = 'var(--danger-color)';
    const errorDiv = document.getElementById('error' + capitalizarPrimera(campo.name));
    if (errorDiv) {
        errorDiv.textContent = 'Este campo es obligatorio';
    }
}

function limpiarErrorCampo(campo) {
    campo.style.borderColor = '';
    const errorDiv = document.getElementById('error' + capitalizarPrimera(campo.name));
    if (errorDiv) {
        errorDiv.textContent = '';
    }
}

function enviarSolicitud() {
    // Validar todos los pasos
    let esValido = true;
    document.querySelectorAll('.form-step').forEach(paso => {
        if (!validarPaso(paso)) {
            esValido = false;
        }
    });

    if (!esValido) {
        mostrarAlerta('Por favor completa todos los campos requeridos', 'error');
        return;
    }

    // Validar términos
    const terminos = document.getElementById('terminos');
    const privacidad = document.getElementById('privacidad');

    if (!terminos.checked || !privacidad.checked) {
        mostrarAlerta('Debes aceptar los términos y la política de privacidad', 'error');
        return;
    }

    // Validar email
    const email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        mostrarAlerta('Por favor ingresa un email válido', 'error');
        return;
    }

    // Validar documento
    const documento = document.getElementById('documento').value;
    if (documento.length < 8) {
        mostrarAlerta('Por favor ingresa un documento válido', 'error');
        return;
    }

    // Validar edad
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
        mostrarAlerta('Debes ser mayor de 18 años para solicitar un crédito', 'error');
        return;
    }

    // Validar ingreso
    const ingreso = parseFloat(document.getElementById('ingresoBruto').value);
    if (ingreso < 1000) {
        mostrarAlerta('El ingreso mínimo debe ser $1,000', 'error');
        return;
    }

    // Generar número de solicitud
    const numeroSolicitud = 'SOL-' + Date.now();
    document.getElementById('numeroSolicitud').textContent = numeroSolicitud;

    // Mostrar mensaje de éxito
    document.querySelector('.solicitud-form').style.display = 'none';
    document.getElementById('mensajeExito').classList.remove('hidden');

    // Scroll al mensaje
    document.getElementById('mensajeExito').scrollIntoView({ behavior: 'smooth' });

    // Guardar en localStorage
    const solicitud = {
        numero: numeroSolicitud,
        fecha: new Date().toLocaleString('es-ES'),
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        tipoCredito: document.getElementById('tipoCredito').value,
        monto: document.getElementById('montoCredito').value
    };
    
    let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    solicitudes.push(solicitud);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

function formatearMoneda(numero) {
    return numero.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function capitalizarPrimera(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function mostrarAlerta(mensaje, tipo = 'info') {
    // Crear alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // Estilos inline para la alerta
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

    // Remover después de 4 segundos
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