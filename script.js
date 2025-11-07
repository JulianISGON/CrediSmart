// Datos de productos crediticios
const productos = [
    {
        id: 1,
        nombre: 'Crédito Libre Inversión',
        descripcion: 'Financiamiento flexible para tus proyectos personales sin restricción de uso',
        montoMinimo: 1000000,
        montoMaximo: 50000000,
        tasa: '9.5%',
        tasaMin: 8.5,
        tasaMax: 10.5,
        plazoMaximo: 60,
        requisitos: ['Mayor de 21 años', 'Cédula vigente', 'Comprobante de ingresos'],
        icono: '📊'
    },
    {
        id: 2,
        nombre: 'Crédito Vehículo',
        descripcion: 'Financiamiento para la compra de vehículos nuevos o usados',
        montoMinimo: 15000000,
        montoMaximo: 300000000,
        tasa: '6.5%',
        tasaMin: 5.5,
        tasaMax: 7.5,
        plazoMaximo: 84,
        requisitos: ['Mayor de 23 años', 'Cédula vigente', 'Comprobante de ingresos', 'Póliza de seguro'],
        icono: '🚗'
    },
    {
        id: 3,
        nombre: 'Crédito Vivienda',
        descripcion: 'Materializa el sueño de tu hogar con las mejores condiciones',
        montoMinimo: 100000000,
        montoMaximo: 1000000000,
        tasa: '4.5%',
        tasaMin: 3.5,
        tasaMax: 5.5,
        plazoMaximo: 360,
        requisitos: ['Mayor de 25 años', 'Cédula vigente', 'Comprobante de ingresos', 'Avalúo de la propiedad'],
        icono: '🏠'
    },
    {
        id: 4,
        nombre: 'Crédito Educativo',
        descripcion: 'Invierte en tu futuro profesional con tasas preferenciales',
        montoMinimo: 5000000,
        montoMaximo: 100000000,
        tasa: '4.0%',
        tasaMin: 3.0,
        tasaMax: 5.0,
        plazoMaximo: 120,
        requisitos: ['Mayor de 18 años', 'Cédula vigente', 'Certificación de estudios'],
        icono: '🎓'
    },
    {
        id: 5,
        nombre: 'Crédito Empresarial',
        descripcion: 'Impulsa el crecimiento de tu negocio con financiamiento adaptado',
        montoMinimo: 50000000,
        montoMaximo: 500000000,
        tasa: '8.0%',
        tasaMin: 7.0,
        tasaMax: 9.0,
        plazoMaximo: 120,
        requisitos: ['Empresa constituida', 'Último impuesto de renta', 'Estados financieros'],
        icono: '💼'
    }
];

// Función para formatear números a moneda
function formatMoney(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(value);
}

// Función para mostrar productos
function mostrarProductos(productosFiltrados = productos) {
    const grid = document.getElementById('productos-grid');
    if (!grid) return;

    grid.innerHTML = productosFiltrados.map(producto => `
        <div class="producto-card">
            <div style="font-size: 3rem; margin-bottom: 15px;">${producto.icono}</div>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="producto-detalles">
                <span class="detalle"><strong>Monto:</strong> ${formatMoney(producto.montoMinimo)} - ${formatMoney(producto.montoMaximo)}</span>
                <span class="detalle"><strong>Tasa:</strong> ${producto.tasa} anual</span>
                <span class="detalle"><strong>Plazo:</strong> Hasta ${producto.plazoMaximo} meses</span>
            </div>
            <div style="display: flex; gap: 10px;">
                <a href="simulador.html?producto=${producto.id}" class="btn btn-outline-primary" style="flex: 1;">Simular</a>
                <a href="solicitar.html?producto=${producto.id}" class="btn btn-primary" style="flex: 1;">Solicitar</a>
            </div>
        </div>
    `).join('');
}

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página de inicio
    if (document.getElementById('productos-grid')) {
        mostrarProductos();
    }

    // Lógica para el simulador
    if (document.querySelector('.simulador-section')) {
        inicializarSimulador();
    }

    // Lógica para el formulario de solicitud
    if (document.querySelector('.form-section')) {
        inicializarFormulario();
    }

    // Actualizar nav activa según página
    actualizarNavActiva();
});

// Función para actualizar el enlace activo en la navegación
function actualizarNavActiva() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(path.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

// Función para inicializar simulador
function inicializarSimulador() {
    const searchInput = document.getElementById('search-producto');
    const montoMin = document.getElementById('monto-min');
    const montoMax = document.getElementById('monto-max');
    const btnFiltrar = document.querySelector('.btn-filtrar');

    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', filtrarProductos);
    }

    if (searchInput) {
        searchInput.addEventListener('input', filtrarProductos);
    }

    if (montoMin || montoMax) {
        document.addEventListener('change', filtrarProductos);
    }
}

// Función para filtrar productos
function filtrarProductos() {
    const searchInput = document.getElementById('search-producto');
    const montoMin = document.getElementById('monto-min');
    const montoMax = document.getElementById('monto-max');

    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const min = montoMin ? parseInt(montoMin.value) || 0 : 0;
    const max = montoMax ? parseInt(montoMax.value) || Infinity : Infinity;

    const filtrados = productos.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(search) || 
                              search === '';
        const coincideMonto = (producto.montoMinimo >= min || min === 0) && 
                             (producto.montoMaximo <= max || max === Infinity);
        return coincideNombre && coincideMonto;
    });

    mostrarProductos(filtrados);
}

// Función para inicializar formulario
function inicializarFormulario() {
    const selectProducto = document.getElementById('tipo-credito');
    if (selectProducto) {
        selectProducto.innerHTML = '<option value="">Selecciona un crédito...</option>' +
            productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
    }

    // Manejar parámetro de URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('producto');
    if (productoId && selectProducto) {
        selectProducto.value = productoId;
    }

    // Validar formulario antes de enviar
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validarFormulario);
    }
}

// Función para validar formulario
function validarFormulario(e) {
    e.preventDefault();
    alert('Formulario capturado correctamente. (Esta es una actividad de diseño, no funcionalidad real)');
}
