# CreditSmart - Sistema de Gestión de Solicitudes de Crédito

## Descripción del Proyecto

**CreditSmart** es una plataforma web desarrollada para **FinTech Solutions S.A.S** que permite a los usuarios consultar opciones de crédito disponibles, simular préstamos y solicitar créditos en línea. El proyecto implementa una interfaz web profesional y responsive utilizando HTML5, CSS3 y JavaScript.

## Características Principales

- 📊 **Catálogo de Productos**: Visualización de 5 productos crediticios diferentes
- 🔍 **Simulador de Créditos**: Búsqueda y filtrado dinámico de productos
- 📝 **Formulario de Solicitud**: Captura completa de datos personales y laborales
- 📱 **Diseño Responsive**: Compatible con desktop, tablet y mobile
- 💡 **Interfaz Intuitiva**: Navegación clara y flujo de usuario optimizado

## Estructura de Archivos

```
CrediSmart/
├── index.html           # Página principal - Catálogo de créditos
├── simulador.html       # Página de simulador y búsqueda
├── solicitar.html       # Página de formulario de solicitud
├── styles.css           # Estilos CSS profesionales y responsive
├── script_new.js        # Lógica de JavaScript
├── README.md            # Este archivo
└── ...otros archivos
```

## Productos Crediticios Disponibles

1. **Crédito Libre Inversión**
   - Monto: $1.000.000 - $50.000.000
   - Tasa: 8.5% - 10.5% anual
   - Plazo: Hasta 60 meses

2. **Crédito Vehículo**
   - Monto: $15.000.000 - $300.000.000
   - Tasa: 5.5% - 7.5% anual
   - Plazo: Hasta 84 meses

3. **Crédito Vivienda**
   - Monto: $100.000.000 - $1.000.000.000
   - Tasa: 3.5% - 5.5% anual
   - Plazo: Hasta 360 meses

4. **Crédito Educativo**
   - Monto: $5.000.000 - $100.000.000
   - Tasa: 3% - 5% anual
   - Plazo: Hasta 120 meses

5. **Crédito Empresarial**
   - Monto: $50.000.000 - $500.000.000
   - Tasa: 7% - 9% anual
   - Plazo: Hasta 120 meses

## Cómo Ejecutar el Proyecto

### Opción 1: Abrir directamente en el navegador
1. Descarga o clona el repositorio
2. Abre el archivo `index.html` en tu navegador web
3. Navega entre las diferentes páginas usando los enlaces del menú

### Opción 2: Usar un servidor local (recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (http-server)
npx http-server
```

Luego abre `http://localhost:8000` en tu navegador.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsive y moderno
- **JavaScript**: Lógica interactiva y dinámica

## Características de Diseño

### Paleta de Colores
- Primario: `#2563eb` (Azul)
- Secundario: `#10b981` (Verde)
- Acento: `#f59e0b` (Ámbar)

### Componentes Principales
- ✅ Navbar sticky con navegación clara
- ✅ Hero section atractivo
- ✅ Grid responsive para productos
- ✅ Formularios completos
- ✅ Filtros dinámicos
- ✅ Footer informativo

## Responsividad

- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

## Notas Importantes

- Los datos de productos son estáticos
- La búsqueda y filtros son visuales
- El formulario es de diseño (sin funcionalidad real)

## Autor

**Julián Ignacio Ospina González**  
Estudiante de Ingeniería Web - IUDigital

---

**Última actualización**: Noviembre 2025

**Fecha de Entrega:** Noviembre 4, 2025

---

## 📝 Resumen de esta entrega

Para la primera entrega se solicitó explícitamente que el proyecto no incluya JavaScript. En consecuencia el proyecto fue renovado para usar sólo HTML5, CSS3 y Bootstrap (CSS). JavaScript fue eliminado y la experiencia se adapta para funcionar sin lógica cliente.

### ¿Qué se cambió?

- Se removió `script.js` y toda lógica de cliente basada en JS.
- Se actualizó el diseño usando Bootstrap 5 y `styles.css` (refactor in-place). Todos los cambios de estilo se harán en este único archivo.
- Páginas principales ahora son estáticas y funcionales sin scripts:
	- `index.html` — Landing y descripción breve
	- `simulador.html` — Formularios por tipo de crédito con atributos `min`/`max` para monto, plazo y tasa
	- `solicitar.html` — Formulario de solicitud con validación nativa del navegador

### Notas importantes

- Al prescindir de JavaScript, los cálculos y tablas automáticas del simulador no están disponibles en el cliente. Si necesitas cálculos automáticos en esta entrega, puedo:
	1. Añadir ejemplos estáticos (tablas precomputadas) por cada tipo de crédito; o
	2. Reintegrar JS en una siguiente versión si la normativa lo permite; o
	3. Implementar cálculo del lado servidor (si tienes backend disponible).

---

Si quieres que continúe con uno de los pasos opcionales (ejemplos estáticos, volver a añadir JS o integración server-side), dime cuál prefieres y lo implemento.

