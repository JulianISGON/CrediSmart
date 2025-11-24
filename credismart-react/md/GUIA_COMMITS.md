# 📝 GUÍA DE COMMITS PARA GIT

## 🎯 Objetivo
Realizar al menos 8 commits descriptivos durante el desarrollo del proyecto.

---

## 📋 COMMITS SUGERIDOS (en orden)

### 1. Configuración Inicial
```bash
git add .
git commit -m "Configuración inicial de React con Vite"
```
**Qué incluye:** package.json, vite.config.js, tailwind.config.js, .gitignore

---

### 2. Estructura Base
```bash
git add .
git commit -m "Estructura de carpetas y archivos base creada"
```
**Qué incluye:** Carpetas src/components, src/pages, src/data, index.html

---

### 3. Datos del Proyecto
```bash
git add src/data/creditsData.js
git commit -m "Archivo de datos creditsData.js creado con array de créditos"
```
**Qué incluye:** creditsData.js con los 6 productos crediticios

---

### 4. Componente de Navegación
```bash
git add src/components/Navbar.jsx
git commit -m "Componente Navbar implementado con React Router y menú responsive"
```
**Qué incluye:** Navbar.jsx con NavLink y menú hamburguesa

---

### 5. Componente Reutilizable
```bash
git add src/components/CreditCard.jsx
git commit -m "Componente CreditCard creado con props y formateo de moneda"
```
**Qué incluye:** CreditCard.jsx con props desestructuradas

---

### 6. Página de Inicio
```bash
git add src/pages/Home.jsx
git commit -m "Página Home implementada con lista dinámica usando .map()"
```
**Qué incluye:** Home.jsx con renderizado dinámico de créditos

---

### 7. Búsqueda Implementada
```bash
git add src/pages/Simulador.jsx
git commit -m "Búsqueda en tiempo real implementada en Simulador"
```
**Qué incluye:** Primera versión del Simulador con búsqueda

---

### 8. Filtros Dinámicos
```bash
git add src/pages/Simulador.jsx
git commit -m "Filtros por monto y ordenamiento por tasa agregados con .filter() y .sort()"
```
**Qué incluye:** Simulador completo con todos los filtros

---

### 9. Formulario Base
```bash
git add src/pages/Solicitar.jsx
git commit -m "Formulario controlado creado con useState para todos los campos"
```
**Qué incluye:** Primera versión del formulario con estados

---

### 10. Validaciones
```bash
git add src/pages/Solicitar.jsx
git commit -m "Validaciones en tiempo real agregadas (email, cédula, teléfono, monto)"
```
**Qué incluye:** Funciones de validación y mensajes de error

---

### 11. Cálculo de Cuota
```bash
git add src/pages/Solicitar.jsx
git commit -m "Cálculo de cuota mensual implementado con useEffect y fórmula financiera"
```
**Qué incluye:** Lógica de cálculo automático

---

### 12. Estilos Finales
```bash
git add src/index.css
git commit -m "Estilos Tailwind CSS aplicados y diseño responsive finalizado"
```
**Qué incluye:** index.css con configuración de Tailwind

---

### 13. App Principal
```bash
git add src/App.jsx src/main.jsx
git commit -m "Componente App y enrutamiento con React Router configurado"
```
**Qué incluye:** App.jsx con rutas y main.jsx

---

### 14. Documentación
```bash
git add README.md INSTRUCCIONES.md CONCEPTOS_TECNICOS.md
git commit -m "Documentación completa agregada: README, instrucciones y conceptos técnicos"
```
**Qué incluye:** Todos los archivos de documentación

---

### 15. Proyecto Final
```bash
git add .
git commit -m "Proyecto CrediSmart React finalizado y listo para entrega"
```
**Qué incluye:** Últimos ajustes y verificación

---

## 🚀 INICIALIZAR REPOSITORIO

### Primera vez (en la carpeta del proyecto):

```bash
# Navegar a la carpeta
cd "c:\Users\Julian\OneDrive\Desktop\Julián\IUDigital\2025-02\Ingeniería web\Tarea 1\credismart-react"

# Inicializar Git
git init

# Crear branch main
git branch -M main

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Configuración inicial de React con Vite"
```

---

## 🌐 CONECTAR CON GITHUB

### 1. Crear repositorio en GitHub
1. Ve a https://github.com/JulianISGON
2. Click en "New repository"
3. Nombre: `credismart-react`
4. Descripción: "Aplicación React de créditos - Actividad 2 IU Digital"
5. **NO** marques "Initialize with README"
6. Click "Create repository"

### 2. Conectar y subir

```bash
# Conectar con GitHub
git remote add origin https://github.com/JulianISGON/credismart-react.git

# Subir todos los commits
git push -u origin main
```

### 3. Para commits posteriores

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción del cambio"

# Subir a GitHub
git push
```

---

## 📊 VERIFICAR COMMITS

### Ver historial de commits:
```bash
git log --oneline
```

### Ver cuántos commits has hecho:
```bash
git rev-list --count HEAD
```

### Ver detalles de un commit:
```bash
git show [hash-del-commit]
```

---

## 💡 TIPS PARA BUENOS COMMITS

### ✅ BUENOS EJEMPLOS:
```
✓ "Componente CreditCard creado con props"
✓ "Búsqueda en tiempo real implementada"
✓ "Validaciones de formulario agregadas"
✓ "Cálculo de cuota mensual funcionando"
```

### ❌ MALOS EJEMPLOS:
```
✗ "cambios"
✗ "update"
✗ "fix"
✗ "asdfgh"
```

### 📝 FORMATO RECOMENDADO:
- Usa verbos en pasado: "implementado", "creado", "agregado"
- Sé específico sobre qué se hizo
- Mantén el mensaje en una línea
- No uses puntos al final

---

## 🔄 COMANDOS ÚTILES

```bash
# Ver estado actual
git status

# Ver diferencias
git diff

# Ver archivos modificados
git diff --name-only

# Deshacer último commit (mantiene cambios)
git reset --soft HEAD~1

# Ver branches
git branch

# Crear nueva branch
git branch nombre-branch

# Cambiar de branch
git checkout nombre-branch
```

---

## ⚠️ PROBLEMAS COMUNES

### Problema: "fatal: not a git repository"
**Solución:** Ejecuta `git init` en la carpeta correcta

### Problema: "Author identity unknown"
**Solución:** Configura tu identidad:
```bash
git config --global user.email "tu-email@ejemplo.com"
git config --global user.name "Tu Nombre"
```

### Problema: "Permission denied" al hacer push
**Solución:** Configura autenticación con token de GitHub

### Problema: Olvidaste agregar archivos al commit
**Solución:**
```bash
git add archivo-olvidado.js
git commit --amend --no-edit
```

---

## 📅 CRONOGRAMA SUGERIDO

### Sesión 1 (Setup - 30 min):
- Commits 1-3: Configuración y datos

### Sesión 2 (Componentes - 1 hora):
- Commits 4-6: Navbar, CreditCard, Home

### Sesión 3 (Simulador - 1 hora):
- Commits 7-8: Búsqueda y filtros

### Sesión 4 (Formulario - 1.5 horas):
- Commits 9-11: Formulario, validaciones, cálculo

### Sesión 5 (Finalización - 30 min):
- Commits 12-15: Estilos, documentación, final

---

**Total: ~8-15 commits descriptivos ✅**

**Recuerda:** Más commits es mejor que menos. Cada funcionalidad importante merece su propio commit.
