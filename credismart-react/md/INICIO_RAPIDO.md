# 🚀 INICIO RÁPIDO - CrediSmart React

## ⚡ Pasos Rápidos para Empezar

### 1️⃣ INSTALAR NODE.JS (Si no lo tienes)

**Descargar:** https://nodejs.org/  
**Versión:** LTS (recomendada)  
**Tiempo:** 5 minutos

**Verificar instalación:**
```powershell
node --version
npm --version
```

---

### 2️⃣ ABRIR POWERSHELL EN LA CARPETA

**Método 1:** En Windows Explorer
1. Navega a: `C:\Users\Julian\OneDrive\Desktop\Julián\IUDigital\2025-02\Ingeniería web\Tarea 1\credismart-react`
2. Shift + Click derecho en la carpeta
3. "Abrir ventana de PowerShell aquí"

**Método 2:** Desde PowerShell
```powershell
cd "C:\Users\Julian\OneDrive\Desktop\Julián\IUDigital\2025-02\Ingeniería web\Tarea 1\credismart-react"
```

---

### 3️⃣ INSTALAR DEPENDENCIAS

```powershell
npm install
```

⏱️ **Tiempo:** 2-5 minutos (según tu internet)

📦 **Se instalarán:**
- React 18.3.1
- React Router 6.27.0
- Vite 5.4.11
- Tailwind CSS 3.4.15
- Y más...

---

### 4️⃣ INICIAR SERVIDOR DE DESARROLLO

```powershell
npm run dev
```

✅ **Verás algo como:**
```
  VITE v5.4.11  ready in 350 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### 5️⃣ ABRIR EN EL NAVEGADOR

**Opción 1:** Ctrl + Click en `http://localhost:5173/`

**Opción 2:** Abre Chrome/Edge y ve a: `http://localhost:5173/`

---

## 🎯 ¿QUÉ DEBERÍAS VER?

### ✅ Página de Inicio
- Header con "Bienvenido a CrediAntioquia"
- 6 tarjetas de créditos
- Botón "Solicitar" en cada tarjeta
- Footer

### ✅ Navegación
- Logo en la esquina superior izquierda
- Menú con: Inicio | Simulador | Solicitar Crédito
- El menú activo se resalta

### ✅ Simulador
- Panel de filtros a la izquierda
- Input de búsqueda
- Select de rango de monto
- Select de ordenar por tasa
- Grid de créditos que se actualiza en tiempo real

### ✅ Solicitar Crédito
- Formulario con 3 secciones
- Validaciones en tiempo real
- Cálculo de cuota mensual

---

## 🛠️ COMANDOS ÚTILES

```powershell
# Iniciar servidor (ejecutar en la carpeta del proyecto)
npm run dev

# Detener servidor
Ctrl + C

# Ver versión de Node
node --version

# Ver versión de npm
npm --version

# Limpiar caché (si hay problemas)
npm cache clean --force

# Reinstalar dependencias (si hay problemas)
rm -r node_modules; npm install
```

---

## 📂 ARCHIVOS IMPORTANTES

```
credismart-react/
│
├── 📄 INSTRUCCIONES.md        ← Guía completa de instalación
├── 📄 CONCEPTOS_TECNICOS.md   ← Todos los conceptos aplicados
├── 📄 GUIA_COMMITS.md         ← Cómo hacer commits en Git
├── 📄 CHECKLIST_ENTREGA.md    ← Verificar antes de entregar
├── 📄 README.md               ← Documentación principal
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Navbar.jsx         ← Barra de navegación
│   │   └── CreditCard.jsx     ← Tarjeta de crédito
│   │
│   ├── 📁 pages/
│   │   ├── Home.jsx           ← Página de inicio
│   │   ├── Simulador.jsx      ← Página simulador
│   │   └── Solicitar.jsx      ← Página solicitar
│   │
│   ├── 📁 data/
│   │   └── creditsData.js     ← Array con 6 créditos
│   │
│   ├── App.jsx                ← Componente principal
│   ├── main.jsx               ← Punto de entrada
│   └── index.css              ← Estilos Tailwind
│
└── 📁 public/
    └── logoCrediAntioquia.png ← Logo (agregar este archivo)
```

---

## ⚠️ IMPORTANTE: LOGO

El proyecto necesita el logo `logoCrediAntioquia.png` en la carpeta `public/`

**Opciones:**
1. Copia el logo de tu proyecto anterior
2. Usa cualquier logo temporal
3. Crea un logo simple en Canva

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ "npm no se reconoce como comando"
**Solución:** Instala Node.js desde https://nodejs.org/

### ❌ Error durante npm install
**Solución:**
```powershell
npm cache clean --force
npm install
```

### ❌ Página en blanco en el navegador
**Solución:**
1. Abre consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Verifica que el servidor esté corriendo

### ❌ Cambios no se reflejan
**Solución:**
1. Guarda el archivo (Ctrl + S)
2. Refresca el navegador (F5)
3. Si persiste, reinicia el servidor:
   ```powershell
   Ctrl + C
   npm run dev
   ```

### ❌ Puerto 5173 ocupado
**Solución:**
- Vite usará automáticamente el siguiente puerto disponible (5174, 5175, etc.)
- O mata el proceso:
  ```powershell
  netstat -ano | findstr :5173
  taskkill /PID [número] /F
  ```

---

## 📖 SIGUIENTES PASOS

### 1. Familiarízate con el código
- Abre VSCode en la carpeta del proyecto
- Revisa `src/App.jsx` primero
- Luego revisa cada página

### 2. Lee la documentación
- `README.md` - Visión general
- `CONCEPTOS_TECNICOS.md` - Explicación detallada
- `INSTRUCCIONES.md` - Guía completa

### 3. Prueba todas las funcionalidades
- Navega entre páginas
- Usa la búsqueda
- Aplica filtros
- Llena el formulario
- Verifica validaciones

### 4. Haz tus primeros commits
- Sigue `GUIA_COMMITS.md`
- Mínimo 8 commits descriptivos

### 5. Prepara la sustentación
- Practica explicar el código
- Conoce dónde está cada funcionalidad
- Entiende los conceptos de React

---

## 🎓 RECURSOS DE APOYO

### Documentación Oficial
- React: https://react.dev/
- React Router: https://reactrouter.com/
- Tailwind CSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/

### Videos útiles (YouTube)
- "React Hooks Tutorial"
- "React Router Tutorial"
- "Formularios en React"
- "useState y useEffect"

---

## ✅ VERIFICACIÓN RÁPIDA

Marca cuando completes cada paso:

- [ ] Node.js instalado
- [ ] PowerShell abierto en la carpeta correcta
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funcionando
- [ ] Navegador abierto en localhost:5173
- [ ] Puedo ver la página de inicio
- [ ] Navegación entre páginas funciona
- [ ] Logo agregado en public/
- [ ] Leí README.md
- [ ] Leí CONCEPTOS_TECNICOS.md

---

## 🎯 OBJETIVO FINAL

**Tienes una aplicación React completa que:**
- ✅ Muestra productos crediticios dinámicamente
- ✅ Permite buscar y filtrar en tiempo real
- ✅ Tiene un formulario con validaciones
- ✅ Calcula cuotas automáticamente
- ✅ Usa React Router para navegación
- ✅ Es responsive (móvil, tablet, desktop)
- ✅ Implementa todos los conceptos requeridos

---

## 💡 TIPS FINALES

1. **Guarda siempre** (Ctrl + S) antes de ver cambios
2. **Revisa la consola** (F12) si algo no funciona
3. **Lee los errores** con calma, suelen ser claros
4. **Pregunta si necesitas ayuda** (profesor, compañeros)
5. **Practica la sustentación** varias veces
6. **Ten confianza** - el código está completo y funcional

---

## 📞 ¿NECESITAS AYUDA?

Si algo no funciona después de seguir todos los pasos:

1. **Revisa INSTRUCCIONES.md** - Solución de problemas
2. **Revisa CHECKLIST_ENTREGA.md** - Verifica qué falta
3. **Busca el error en Google** - Copia el mensaje de error exacto
4. **Pregunta en clase** - Usa los encuentros sincrónicos

---

**¡Éxito con tu proyecto! 🚀**

**Desarrollado con ❤️ para Julián - IU Digital 2025**
