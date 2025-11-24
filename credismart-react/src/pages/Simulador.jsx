import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { creditsData } from '../data/creditsData';
import CreditCard from '../components/CreditCard';

const Simulador = () => {
  const location = useLocation();
  const creditoPreseleccionado = location.state?.creditoSeleccionado;

  // Estados para filtros
  const [busqueda, setBusqueda] = useState('');
  const [rangoMonto, setRangoMonto] = useState('todos');
  const [ordenTasa, setOrdenTasa] = useState('ninguno');

  // Estado para créditos filtrados
  const [creditosFiltrados, setCreditosFiltrados] = useState(creditsData);

  // Efecto para aplicar filtros cada vez que cambien los estados
  useEffect(() => {
    let resultado = [...creditsData];

    // Filtro 1: Búsqueda por nombre
    if (busqueda.trim() !== '') {
      resultado = resultado.filter(credito =>
        credito.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro 2: Rango de monto
    if (rangoMonto !== 'todos') {
      resultado = resultado.filter(credito => {
        switch (rangoMonto) {
          case 'bajo':
            return credito.montoMax <= 20000000;
          case 'medio':
            return credito.montoMin <= 100000000 && credito.montoMax >= 20000000;
          case 'alto':
            return credito.montoMin >= 50000000;
          default:
            return true;
        }
      });
    }

    // Filtro 3: Ordenar por tasa de interés
    if (ordenTasa === 'menor-mayor') {
      resultado = resultado.sort((a, b) => a.tasaMin - b.tasaMin);
    } else if (ordenTasa === 'mayor-menor') {
      resultado = resultado.sort((a, b) => b.tasaMin - a.tasaMin);
    }

    setCreditosFiltrados(resultado);
  }, [busqueda, rangoMonto, ordenTasa]);

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setBusqueda('');
    setRangoMonto('todos');
    setOrdenTasa('ninguno');
  };

  return (
    <>
      <header className="bg-gradient-to-r from-brand-700 to-brand-800 text-white text-center py-16 px-5">
        <h1 className="text-4xl font-semibold mb-3">Simulador de Créditos</h1>
        <p className="text-lg mt-2">
          Encuentra y simula el crédito que se ajuste a tus necesidades
        </p>
      </header>

      <main className="flex-1">
        <section className="max-w-[1100px] mx-auto px-4 py-10">
          <h2 className="text-3xl font-semibold mb-6 text-brand-800">
            Simulador y Filtros
          </h2>

          <div className="grid gap-6 md:grid-cols-[280px_1fr]">
            {/* Panel de filtros */}
            <aside 
              className="bg-white border border-grayz-300 rounded-xl p-5 h-fit sticky top-20" 
              aria-label="Filtros"
            >
              <h3 className="text-lg font-semibold mb-4 text-brand-800">
                Filtros de Búsqueda
              </h3>

              {/* Búsqueda por nombre */}
              <div className="mb-4">
                <label htmlFor="busqueda" className="block text-sm font-medium mb-2">
                  Buscar por nombre
                </label>
                <input
                  type="text"
                  id="busqueda"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Ej: Vehículo"
                  className="w-full px-3 py-2 border border-grayz-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Filtro por rango de monto */}
              <div className="mb-4">
                <label htmlFor="rangoMonto" className="block text-sm font-medium mb-2">
                  Rango de monto
                </label>
                <select
                  id="rangoMonto"
                  value={rangoMonto}
                  onChange={(e) => setRangoMonto(e.target.value)}
                  className="w-full px-3 py-2 border border-grayz-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="todos">Todos los montos</option>
                  <option value="bajo">Hasta $20M</option>
                  <option value="medio">$20M - $100M</option>
                  <option value="alto">Más de $50M</option>
                </select>
              </div>

              {/* Ordenar por tasa */}
              <div className="mb-4">
                <label htmlFor="ordenTasa" className="block text-sm font-medium mb-2">
                  Ordenar por tasa
                </label>
                <select
                  id="ordenTasa"
                  value={ordenTasa}
                  onChange={(e) => setOrdenTasa(e.target.value)}
                  className="w-full px-3 py-2 border border-grayz-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="ninguno">Sin ordenar</option>
                  <option value="menor-mayor">Tasa: Menor a Mayor</option>
                  <option value="mayor-menor">Tasa: Mayor a Menor</option>
                </select>
              </div>

              {/* Botón limpiar filtros */}
              <button
                onClick={limpiarFiltros}
                className="w-full px-4 py-2 rounded-lg bg-brand-300 text-[#083b2b] font-medium hover:brightness-95 transition-all"
              >
                Limpiar Filtros
              </button>

              <p className="text-xs text-gray-500 mt-4">
                {creditosFiltrados.length} crédito(s) encontrado(s)
              </p>
            </aside>

            {/* Catálogo de créditos */}
            <div aria-live="polite">
              {creditosFiltrados.length > 0 ? (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {creditosFiltrados.map((credito) => (
                    <CreditCard 
                      key={credito.id} 
                      credito={credito} 
                      mostrarSimular={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-grayz-300 rounded-xl">
                  <svg 
                    className="mx-auto h-16 w-16 text-gray-400 mb-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No hay créditos disponibles
                  </h3>
                  <p className="text-gray-500 mb-4">
                    No se encontraron créditos con los filtros aplicados
                  </p>
                  <button
                    onClick={limpiarFiltros}
                    className="px-4 py-2 rounded-lg bg-brand-500 text-white font-medium hover:brightness-95 transition-all"
                  >
                    Ver todos los créditos
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Simulador;
