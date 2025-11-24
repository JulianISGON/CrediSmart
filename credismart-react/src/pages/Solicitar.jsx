import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { creditsData } from '../data/creditsData';

const Solicitar = () => {
  const location = useLocation();
  const creditoPreseleccionado = location.state?.creditoSeleccionado;

  // Estados del formulario - Datos Personales
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  // Estados del formulario - Datos del Crédito
  const [tipoCredito, setTipoCredito] = useState(creditoPreseleccionado?.categoria || 'libre');
  const [monto, setMonto] = useState('');
  const [plazo, setPlazo] = useState('12');
  const [destino, setDestino] = useState('');

  // Estados del formulario - Datos Laborales
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [ingresos, setIngresos] = useState('');

  // Estados de validación
  const [errores, setErrores] = useState({});
  const [cuotaMensual, setCuotaMensual] = useState(0);
  const [mostrarExito, setMostrarExito] = useState(false);

  // Array para almacenar solicitudes (en memoria)
  const [solicitudes, setSolicitudes] = useState([]);

  // Calcular cuota mensual cada vez que cambien monto o plazo
  useEffect(() => {
    if (monto && plazo) {
      const creditoSeleccionado = creditsData.find(c => c.categoria === tipoCredito);
      if (creditoSeleccionado) {
        const tasaPromedio = (creditoSeleccionado.tasaMin + creditoSeleccionado.tasaMax) / 2;
        const tasaMensual = tasaPromedio / 100 / 12;
        const numeroPagos = parseInt(plazo);
        const montoNumero = parseFloat(monto);

        if (montoNumero > 0 && numeroPagos > 0) {
          // Fórmula de cuota: M = P * (i * (1 + i)^n) / ((1 + i)^n - 1)
          const cuota = montoNumero * (tasaMensual * Math.pow(1 + tasaMensual, numeroPagos)) / 
                        (Math.pow(1 + tasaMensual, numeroPagos) - 1);
          setCuotaMensual(cuota);
        }
      }
    }
  }, [monto, plazo, tipoCredito]);

  // Validaciones en tiempo real
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCedula = (cedula) => {
    return cedula.length >= 6 && cedula.length <= 10 && /^\d+$/.test(cedula);
  };

  const validarTelefono = (telefono) => {
    return telefono.length === 10 && /^\d+$/.test(telefono);
  };

  const validarMonto = (monto) => {
    const creditoSeleccionado = creditsData.find(c => c.categoria === tipoCredito);
    if (!creditoSeleccionado) return false;
    const montoNum = parseFloat(monto);
    return montoNum >= creditoSeleccionado.montoMin && montoNum <= creditoSeleccionado.montoMax;
  };

  // Manejar cambios con validación
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validarEmail(value)) {
      setErrores(prev => ({ ...prev, email: 'Email inválido' }));
    } else {
      setErrores(prev => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleCedulaChange = (e) => {
    const value = e.target.value;
    setCedula(value);
    if (value && !validarCedula(value)) {
      setErrores(prev => ({ ...prev, cedula: 'Cédula debe tener entre 6 y 10 dígitos' }));
    } else {
      setErrores(prev => {
        const { cedula, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);
    if (value && !validarTelefono(value)) {
      setErrores(prev => ({ ...prev, telefono: 'Teléfono debe tener 10 dígitos' }));
    } else {
      setErrores(prev => {
        const { telefono, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleMontoChange = (e) => {
    const value = e.target.value;
    setMonto(value);
    if (value && !validarMonto(value)) {
      const creditoSeleccionado = creditsData.find(c => c.categoria === tipoCredito);
      setErrores(prev => ({ 
        ...prev, 
        monto: `Monto debe estar entre ${formatCurrency(creditoSeleccionado.montoMin)} y ${formatCurrency(creditoSeleccionado.montoMax)}` 
      }));
    } else {
      setErrores(prev => {
        const { monto, ...rest } = prev;
        return rest;
      });
    }
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación completa
    const nuevosErrores = {};
    
    if (!nombre.trim()) nuevosErrores.nombre = 'Nombre es requerido';
    if (!cedula || !validarCedula(cedula)) nuevosErrores.cedula = 'Cédula inválida';
    if (!email || !validarEmail(email)) nuevosErrores.email = 'Email inválido';
    if (!telefono || !validarTelefono(telefono)) nuevosErrores.telefono = 'Teléfono inválido';
    if (!monto || !validarMonto(monto)) nuevosErrores.monto = 'Monto inválido';
    if (!empresa.trim()) nuevosErrores.empresa = 'Empresa es requerida';
    if (!cargo.trim()) nuevosErrores.cargo = 'Cargo es requerido';
    if (!ingresos || parseFloat(ingresos) <= 0) nuevosErrores.ingresos = 'Ingresos inválidos';

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    // Crear objeto de solicitud
    const nuevaSolicitud = {
      id: Date.now(),
      nombre,
      cedula,
      email,
      telefono,
      tipoCredito,
      monto: parseFloat(monto),
      plazo: parseInt(plazo),
      destino,
      empresa,
      cargo,
      ingresos: parseFloat(ingresos),
      cuotaMensual,
      fecha: new Date().toLocaleDateString('es-CO')
    };

    // Agregar solicitud al array
    setSolicitudes(prev => [...prev, nuevaSolicitud]);

    // Mostrar mensaje de éxito
    setMostrarExito(true);

    // Limpiar formulario
    limpiarFormulario();

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      setMostrarExito(false);
    }, 5000);
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setNombre('');
    setCedula('');
    setEmail('');
    setTelefono('');
    setTipoCredito('libre');
    setMonto('');
    setPlazo('12');
    setDestino('');
    setEmpresa('');
    setCargo('');
    setIngresos('');
    setErrores({});
    setCuotaMensual(0);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-brand-700 to-brand-800 text-white text-center py-16 px-5">
        <h1 className="text-4xl font-semibold mb-3">Solicitud de Crédito</h1>
        <p className="text-lg mt-2">
          Completa el formulario para enviar tu solicitud
        </p>
      </header>

      <main className="flex-1">
        <section className="max-w-[1100px] mx-auto px-4 py-10">
          {/* Mensaje de éxito */}
          {mostrarExito && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <h3 className="font-semibold mb-2">¡Solicitud enviada exitosamente!</h3>
              <p>Hemos recibido tu solicitud. Te contactaremos pronto.</p>
              <p className="text-sm mt-2">Total de solicitudes: {solicitudes.length}</p>
            </div>
          )}

          <h2 className="text-3xl font-semibold mb-2 text-brand-800">
            Formulario de Solicitud
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Ingresa tus datos para iniciar el proceso de evaluación del crédito.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
            {/* Datos Personales */}
            <fieldset className="border border-grayz-300 rounded-xl p-5 bg-white">
              <legend className="px-2 text-brand-800 font-semibold text-lg">
                Datos Personales
              </legend>

              <div className="mt-4">
                <label htmlFor="nombre" className="block mb-1 font-medium">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Ana Gómez"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.nombre 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="cedula" className="block mb-1 font-medium">
                  Cédula *
                </label>
                <input
                  type="text"
                  id="cedula"
                  value={cedula}
                  onChange={handleCedulaChange}
                  placeholder="Ej: 123456789"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.cedula 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.cedula && (
                  <p className="text-red-500 text-sm mt-1">{errores.cedula}</p>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="correo@ejemplo.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.email && (
                  <p className="text-red-500 text-sm mt-1">{errores.email}</p>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="telefono" className="block mb-1 font-medium">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={telefono}
                  onChange={handleTelefonoChange}
                  placeholder="Ej: 3001234567"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.telefono 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.telefono && (
                  <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>
                )}
              </div>
            </fieldset>

            {/* Datos del Crédito */}
            <fieldset className="border border-grayz-300 rounded-xl p-5 bg-white">
              <legend className="px-2 text-brand-800 font-semibold text-lg">
                Datos del Crédito
              </legend>

              <div className="mt-4">
                <label htmlFor="tipo-credito" className="block mb-1 font-medium">
                  Tipo de Crédito *
                </label>
                <select
                  id="tipo-credito"
                  value={tipoCredito}
                  onChange={(e) => setTipoCredito(e.target.value)}
                  className="w-full px-3 py-2 border border-grayz-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {creditsData.map(credito => (
                    <option key={credito.id} value={credito.categoria}>
                      {credito.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3">
                <label htmlFor="monto" className="block mb-1 font-medium">
                  Monto Solicitado *
                </label>
                <input
                  type="number"
                  id="monto"
                  value={monto}
                  onChange={handleMontoChange}
                  placeholder="Ej: 10000000"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.monto 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.monto && (
                  <p className="text-red-500 text-sm mt-1">{errores.monto}</p>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="plazo" className="block mb-1 font-medium">
                  Plazo en Meses *
                </label>
                <select
                  id="plazo"
                  value={plazo}
                  onChange={(e) => setPlazo(e.target.value)}
                  className="w-full px-3 py-2 border border-grayz-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                  <option value="60">60</option>
                  <option value="72">72</option>
                  <option value="84">84</option>
                  <option value="120">120</option>
                </select>
              </div>

              <div className="mt-3">
                <label htmlFor="destino" className="block mb-1 font-medium">
                  Destino del Crédito
                </label>
                <textarea
                  id="destino"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  rows="4"
                  placeholder="Describe brevemente el uso del dinero"
                  className="w-full px-3 py-2 border border-grayz-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Mostrar cuota mensual estimada */}
              {cuotaMensual > 0 && (
                <div className="mt-4 p-4 bg-brand-100 rounded-lg">
                  <p className="text-sm text-brand-800 font-medium mb-1">
                    Cuota Mensual Estimada:
                  </p>
                  <p className="text-2xl font-bold text-brand-700">
                    {formatCurrency(cuotaMensual)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    * Cálculo aproximado basado en tasa promedio
                  </p>
                </div>
              )}
            </fieldset>

            {/* Datos Laborales */}
            <fieldset className="border border-grayz-300 rounded-xl p-5 bg-white">
              <legend className="px-2 text-brand-800 font-semibold text-lg">
                Datos Laborales
              </legend>

              <div className="mt-4">
                <label htmlFor="empresa" className="block mb-1 font-medium">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.empresa 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.empresa && (
                  <p className="text-red-500 text-sm mt-1">{errores.empresa}</p>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="cargo" className="block mb-1 font-medium">
                  Cargo *
                </label>
                <input
                  type="text"
                  id="cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="Tu cargo"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.cargo 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.cargo && (
                  <p className="text-red-500 text-sm mt-1">{errores.cargo}</p>
                )}
              </div>

              <div className="mt-3">
                <label htmlFor="ingresos" className="block mb-1 font-medium">
                  Ingresos Mensuales *
                </label>
                <input
                  type="number"
                  id="ingresos"
                  value={ingresos}
                  onChange={(e) => setIngresos(e.target.value)}
                  placeholder="Ej: 2500000"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errores.ingresos 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-grayz-300 focus:ring-brand-500'
                  }`}
                />
                {errores.ingresos && (
                  <p className="text-red-500 text-sm mt-1">{errores.ingresos}</p>
                )}
              </div>
            </fieldset>

            {/* Botones */}
            <div className="flex gap-3 flex-wrap mt-1">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-brand-500 text-white font-medium hover:brightness-95 transition-all"
              >
                Enviar Solicitud
              </button>
              <button
                type="button"
                onClick={limpiarFormulario}
                className="px-6 py-3 rounded-lg bg-brand-300 text-[#083b2b] font-medium hover:brightness-95 transition-all"
              >
                Limpiar Formulario
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Solicitar;
