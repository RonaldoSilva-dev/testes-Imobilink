// ============================================
// COMPONENTE: CampoSelect
// FINALIDADE: Campo de seleção (dropdown) para formulários
// USO: Campo "Perfil" e outros selects no sistema
// ============================================

// src/components/CampoSelect.tsx
// ============================================
// COMPONENTE: CampoSelect
// FINALIDADE: Campo de seleção (dropdown) para formulários
// ============================================

// Interface para cada opção do select
interface OpcaoSelect {
  valor: string; // Valor interno que será enviado/salvo
  texto: string; // Texto que aparece para o usuário na lista
}

// Props (propriedades) que o componente recebe
interface PropsCampoSelect {
  rotulo: string; // Texto que aparece acima do select
  valor: string; // Valor atualmente selecionado
  aoMudar: (valor: string) => void; // Função quando muda seleção
  opcoes: OpcaoSelect[]; // Lista de opções disponíveis
  placeholder?: string; // Texto quando nada selecionado (opcional)
  obrigatorio?: boolean; // Se campo é obrigatório (opcional)
  desabilitado?: boolean; // Se campo está desabilitado (opcional)
  erro?: string; // Mensagem de erro (opcional)
}

// Componente principal
export function CampoSelect({
  rotulo,
  valor,
  aoMudar,
  opcoes,
  placeholder = "Selecione...", // Valor padrão se não informado
  obrigatorio = false, // Valor padrão: não obrigatório
  desabilitado = false, // Valor padrão: não desabilitado
  erro = "", // Valor padrão: sem erro
}: PropsCampoSelect) {
  return (
    <div className="mb-4">
      {/* Label do campo */}
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {rotulo}
        {/* Asterisco vermelho se campo for obrigatório */}
        {obrigatorio && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Container com posição relativa para a seta */}
      <div className="relative">
        {/* Select HTML nativo */}
        <select
          value={valor} // Valor controlado pelo React
          onChange={(e) => aoMudar(e.target.value)} // Quando usuário seleciona
          disabled={desabilitado} // Desabilita se necessário
          required={obrigatorio} // Validação HTML nativa
          aria-label={rotulo} // Acessibilidade para leitores de tela
          // Classes TailwindCSS
          className={`
            w-full px-3 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            appearance-none pr-10
            // Condicionais para estados do campo
            ${
              desabilitado
                ? "bg-gray-100 cursor-not-allowed opacity-70 border-gray-300"
                : "bg-white cursor-pointer border-gray-300 hover:border-gray-400"
            }
            ${
              erro
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }
          `}
        >
          {/* Opção para placeholder (não selecionável) */}
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>

          {/* Mapeia as opções do array para tags <option> */}
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.texto}
            </option>
          ))}
        </select>

        {/* Ícone de seta (apenas visual, não interativo) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          {/* SVG de seta para baixo */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Mensagem de erro (se houver) */}
      {erro && <p className="mt-1 text-sm text-red-600">⚠️ {erro}</p>}
    </div>
  );
}
