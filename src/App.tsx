//import React from "react";
// Importa nosso novo componente
import { FotoCorretor } from "./components/FotoCorretor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PerfilCorretor } from "./components/PerfilCorretor";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-0 ">
      <Header />
      {/* Usa nosso componente de foto */}
      <FotoCorretor
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Foto do corretor"
      />

      {/* Texto de teste para ver se centralizou */}
      <p className="text-center text-gray-600">
        A foto acima deve estar centralizada
      </p>
      <main className="py-8 px-4">
        <PerfilCorretor
          foto="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          nome="Carlos Silva"
          creci="12345-PE"
          tipoUsuario="autonomo"
          especialidades={[
            "Imóveis Comerciais",
            "Lajes Corporativas",
            "Sala Commercial",
          ]}
          experiencia={5}
          descricao="Especialista em imóveis comerciais com 5 anos de experiência no mercado do Recife. Atuo principalmente nos bairros da Zona Sul, oferecendo as melhores oportunidades de investimento."
          estado="PE"
          cidade="Recife"
          bairrosAtuacao={[
            "Boa Viagem",
            "Pina",
            "Brasília Teimosa",
            "Imbiribeira",
            "Casa Forte",
          ]}
          telefone="(81) 99999-9999"
          email="carlos.silva@email.com"
          whatsapp="(81) 99999-9999"
          totalVendas={42}
          avaliacao={98}
          matchesBemSucedidos={15}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;
