// Cria campo imput (genérico para todos os campos de texto)
// ============================================
// CAMPO DE INPUT REUTILIZÁVEL
// ============================================

// 1. DEFINIR AS PROPRIEDADES QUE O INPUT PRECISA
interface PropsCampoInput {
  // RÓTULO que aparece acima do input (ex: "Nome completo")
  rotulo: string;

  // TIPO do input HTML (text, email, password, tel)
  tipo?: string;

  // VALOR atual do campo (para controle do React)
  valor: string;

  // FUNÇÃO que atualiza o valor quando o usuário digita
  aoMudar: (novoValor: string) => void;

  // TEXTO de placeholder (dica dentro do campo)
  placeholder?: string;

  // SE o campo é obrigatório (adiciona asterisco)
  obrigatorio?: boolean;
}

// 2. CRIAR O COMPONENTE
export function CampoInput({
  rotulo,
  tipo = "text", // Valor PADRÃO se não for informado
  valor,
  aoMudar,
  placeholder = "", // Valor PADRÃO: string vazia
  obrigatorio = false, // Valor PADRÃO: não obrigatório
}: PropsCampoInput) {
  // 3. RENDERIZAR O CAMPO
  return (
    <div className="mb-4">
      {" "}
      {/* Container com margem abaixo */}
      {/* RÓTULO DO CAMPO */}
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {rotulo}
        {/* Mostra asterisco vermelho se for obrigatório */}
        {obrigatorio && <span className="text-red-500 ml-1">*</span>}
      </label>
      {/* INPUT EM SI */}
      <input
        // TIPO DO INPUT (text, email, password, etc)
        type={tipo}
        // VALOR ATUAL (controlado pelo React)
        value={valor}
        // EVENTO: quando o usuário digita algo
        onChange={(evento) => {
          // "evento.target.value" = texto que o usuário digitou
          // Chama a função "aoMudar" passando o novo valor
          aoMudar(evento.target.value);
        }}
        // PLACEHOLDER (dica dentro do campo)
        placeholder={placeholder}
        // CLASSES CSS DO TAILWIND
        className={`
          w-full                /* Largura total */
          px-3 py-2             /* Espaçamento interno */
          border border-gray-300 /* Borda cinza */
          rounded-md            /* Bordas levemente arredondadas */
          focus:outline-none    /* Remove contorno padrão ao focar */
          focus:ring-2          /* Adiciona anel ao focar */
          focus:ring-blue-500   /* Cor azul do anel */
          focus:border-blue-500 /* Borda azul ao focar */
          transition-colors     /* Anima mudança de cores */
        `}
        // ATRIBUTO HTML "required" se for obrigatório
        required={obrigatorio}
      />
    </div>
  );
}
// ============================================
