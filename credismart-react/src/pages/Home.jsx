import { creditsData } from '../data/creditsData';
import CreditCard from '../components/CreditCard';

const Home = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-brand-700 to-brand-800 text-white text-center py-16 px-5">
        <h1 className="text-4xl font-semibold mb-3">Bienvenido a CrediAntioquia</h1>
        <p className="text-lg mt-2 mb-6">
          Encuentra la solución de crédito que se adapte a tus necesidades
        </p>
        <a 
          href="#productos" 
          className="inline-block mt-4 px-6 py-3 rounded-lg bg-brand-500 text-white font-medium hover:brightness-95 transition-all"
        >
          Explorar Créditos
        </a>
      </header>

      <main className="flex-1">
        <section id="productos" className="max-w-[1100px] mx-auto px-4 py-10">
          <h2 className="text-3xl font-semibold mb-2 text-brand-800">
            Nuestros Productos Crediticios
          </h2>
          <p className="text-gray-600 mb-6">
            Contamos con {creditsData.length} opciones diseñadas para ti
          </p>

          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {creditsData.map((credito) => (
              <CreditCard 
                key={credito.id} 
                credito={credito} 
                mostrarSimular={false}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
