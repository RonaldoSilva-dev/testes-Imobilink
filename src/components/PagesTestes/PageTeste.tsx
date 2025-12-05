// Página para testa algumas funcionalidades dos componentes //

import { BotaoPrincipal } from "../Botoes/BotaoPrincipal";

export function PageTeste() {
  return (
    <div>
      {/* Botão 1: Buscar Imóveis */}
      <BotaoPrincipal texto="🔍 Buscar Imóveis" />
      {/* Botão 2: Salvar Formulário */}
      <BotaoPrincipal texto="💾 Salvar Formulário" />
      {/* Botão 3: Com função direta */}
      <BotaoPrincipal texto="📞 Contato Rápido" />
    </div>
  );
}
