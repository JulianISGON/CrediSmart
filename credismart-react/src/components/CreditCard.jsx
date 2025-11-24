import { Link } from 'react-router-dom';

const CreditCard = ({ credito, mostrarSimular = false }) => {
  // Función para formatear montos en COP
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <article 
      className="border border-grayz-300 rounded-xl p-5 bg-white shadow hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-500" 
      tabIndex="0"
    >
      <h3 className="text-brand-800 font-semibold text-xl mb-3">
        {credito.nombre}
      </h3>
      <ul className="list-disc ml-5 space-y-2 mb-4 text-gray-700">
        <li>
          <strong>Tasa:</strong> {credito.tasaMin}% - {credito.tasaMax}% anual
        </li>
        <li>
          <strong>Monto:</strong> {formatCurrency(credito.montoMin)} - {formatCurrency(credito.montoMax)}
        </li>
        <li>
          <strong>Plazo:</strong> Hasta {credito.plazoMax} meses
        </li>
      </ul>
      {credito.descripcion && (
        <p className="text-sm text-gray-600 mb-4">{credito.descripcion}</p>
      )}
      <div className="flex gap-2 flex-wrap">
        <Link 
          to="/solicitar" 
          state={{ creditoSeleccionado: credito }}
          className="inline-block px-4 py-2 rounded-lg bg-brand-300 text-[#083b2b] font-medium hover:brightness-95 transition-all"
        >
          Solicitar
        </Link>
        {mostrarSimular && (
          <Link 
            to="/simulador" 
            state={{ creditoSeleccionado: credito }}
            className="inline-block px-4 py-2 rounded-lg bg-brand-500 text-white font-medium hover:brightness-95 transition-all"
          >
            Simular
          </Link>
        )}
      </div>
    </article>
  );
};

export default CreditCard;
