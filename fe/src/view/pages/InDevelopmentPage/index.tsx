import {Link} from "react-router-dom";

export const InDevelopmentPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-primary-500 font-semibold">404 Error</h3>
        <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
          Página em Desenvolvimento
        </p>
        <p className="text-gray-600">
          Desculpe, esta página está em desenvolvimento. Estamos trabalhando
          nela e logo estará disponível. Obrigado pela compreensão!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="block py-2 px-4 text-white font-medium bg-primary-600 duration-150 hover:bg-primary-400 active:bg-primary-600 rounded-lg"
          >
            Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
};
