# 🚀 INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN

## ⚠️ IMPORTANTE: Debes instalar Node.js primero

### Paso 1: Instalar Node.js

1. Ve a https://nodejs.org/
2. Descarga la versión **LTS** (recomendada - actualmente v20.x o superior)
3. Ejecuta el instalador y sigue los pasos
4. **IMPORTANTE:** Durante la instalación, marca la opción "Automatically install the necessary tools"
5. Reinicia tu computadora después de instalar

### Paso 2: Verificar la instalación

Abre PowerShell o CMD y ejecuta:

```powershell
node --version
npm --version
```

Deberías ver los números de versión. Si aparecen, la instalación fue exitosa.

### Paso 3: Navegar a la carpeta del proyecto

```powershell
cd "c:\Users\Julian\OneDrive\Desktop\Julián\IUDigital\2025-02\Ingeniería web\Tarea 1\credismart-react"
```

### Paso 4: Instalar dependencias del proyecto

```powershell
npm install
```

Este comando instalará:
- React
- React Router
- Vite
- Tailwind CSS
- Y todas las demás dependencias necesarias

⏱️ **Esto puede tardar 2-5 minutos dependiendo de tu conexión a internet.**

### Paso 5: Iniciar el servidor de desarrollo

```powershell
npm run dev
```

Verás algo como:

```
  VITE v5.4.11  ready in 350 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Paso 6: Abrir en el navegador

- Presiona `Ctrl + Click` sobre la URL `http://localhost:5173/`
- O abre tu navegador y escribe: `http://localhost:5173/`

---

## 🎯 COMANDOS ÚTILES

```powershell
# Iniciar servidor de desarrollo
npm run dev

# Detener el servidor (en la terminal donde está corriendo)
Ctrl + C

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## ❓ SOLUCIÓN DE PROBLEMAS

### Problema: "npm no se reconoce como comando"
**Solución:** Node.js no está instalado correctamente. Repite el Paso 1.

### Problema: Error durante npm install
**Solución:** 
1. Elimina la carpeta `node_modules` si existe
2. Ejecuta: `npm cache clean --force`
3. Ejecuta: `npm install` nuevamente

### Problema: El navegador muestra página en blanco
**Solución:** 
1. Abre la Consola de Desarrollador (F12)
2. Busca errores en la pestaña "Console"
3. Verifica que el servidor esté corriendo

### Problema: Cambios no se reflejan
**Solución:** 
1. Guarda todos los archivos (Ctrl + S)
2. Refresca el navegador (F5)
3. Si persiste, detén el servidor (Ctrl + C) y reinicia con `npm run dev`

---

## 📝 PARA HACER COMMITS (Git)

### Inicializar Git (solo la primera vez)

```powershell
git init
git add .
git commit -m "Configuración inicial de React con Vite"
```

### Hacer commits durante el desarrollo

```powershell
# Ver cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción del cambio"
```

### Ejemplos de buenos mensajes de commit:

```
git commit -m "Componente CreditCard creado con props"
git commit -m "Búsqueda en tiempo real implementada"
git commit -m "Validaciones de formulario agregadas"
git commit -m "Cálculo de cuota mensual funcionando"
git commit -m "Estilos responsive actualizados"
```

---

## 🌐 SUBIR A GITHUB

### Primera vez:

```powershell
# Crear repositorio en GitHub primero, luego:
git remote add origin https://github.com/JulianISGON/credismart-react.git
git branch -M main
git push -u origin main
```

### Siguientes veces:

```powershell
git add .
git commit -m "Mensaje descriptivo"
git push
```

---

## ✅ CHECKLIST DE ENTREGA

- [ ] Node.js instalado
- [ ] Proyecto corriendo con `npm run dev`
- [ ] Todas las páginas funcionan (Inicio, Simulador, Solicitar)
- [ ] Búsqueda en tiempo real funciona
- [ ] Filtros dinámicos funcionan
- [ ] Formulario valida correctamente
- [ ] Cálculo de cuota mensual se actualiza
- [ ] Navegación entre páginas funciona
- [ ] Menú responsive funciona en móvil
- [ ] Mínimo 8 commits realizados
- [ ] README.md completado
- [ ] Repositorio en GitHub
- [ ] Screenshots/capturas agregadas (opcional)

---

## 🎓 TIPS PARA LA SUSTENTACIÓN

1. **Explica los hooks:** Muestra cómo usas `useState` y `useEffect`
2. **Demuestra los filtros:** Usa la búsqueda y filtros en vivo
3. **Muestra las validaciones:** Intenta enviar el formulario con datos incorrectos
4. **Habla sobre componentes:** Explica cómo CreditCard es reutilizable
5. **Menciona React Router:** Muestra la navegación entre páginas

---

**¡Éxito con tu proyecto! 🚀**
