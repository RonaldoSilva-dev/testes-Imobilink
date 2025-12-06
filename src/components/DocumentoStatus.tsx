// ============================================
// COMPONENTE: DocumentoStatus
// FINALIDADE: Exibir visualmente o status do documento
// OBSERVAÇÃO: Componente puro de UI - sem lógica de estado
// ============================================

// 1. DEFINIÇÃO DOS TIPOS
// Este componente só precisa saber se é PF ou PJ
type TipoPessoa = "pf" | "pj";

// 2. INTERFACE DAS PROPRIEDADES
// Tudo que este componente precisa para renderizar
interface DocumentoStatusProps {
  /**
   * Tipo de pessoa (PF ou PJ)
   * Define cores e ícones diferentes
   */
  tipoPessoa: TipoPessoa;

  /**
   * Valor atual do campo (pode estar com máscara)
   * Usado para saber se o campo está preenchido ou vazio
   */
  valor: string;

  /**
   * Quantidade de dígitos atualmente digitados
   * Exemplo: 10 (de 11 necessários para CPF)
   */
  digitosAtuais: number;

  /**
   * Quantidade total de dígitos necessários
   * 11 para CPF, 14 para CNPJ
   */
  digitosNecessarios: number;

  /**
   * Indica se o documento está completo e válido
   * true = tem todos os dígitos necessários
   * false = falta algum dígito
   */
  documentoValido: boolean;
}

// 3. COMPONENTE PRINCIPAL
export function DocumentoStatus({
  tipoPessoa,
  valor,
  digitosAtuais,
  digitosNecessarios,
  documentoValido,
}: DocumentoStatusProps) {
  // 4. RENDERIZAÇÃO
  return (
    <>
      {/* ===== CONTADOR DE DÍGITOS ===== */}
      {/* Mostra apenas quando há algo digitado */}
      {valor && (
        <div className="flex justify-between items-center mt-1">
          {/* Contador de dígitos (verde se completo, amarelo se incompleto) */}
          <p
            className={`text-xs font-medium ${
              documentoValido ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {digitosAtuais}/{digitosNecessarios} dígitos
          </p>
        </div>
      )}

      {/* ===== BADGE COM STATUS ===== */}
      {/* Sempre visível, mostra o tipo de pessoa e status */}
      <div className="mt-2 text-sm">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full ${
            // Cores diferentes para PF (azul) e PJ (roxo)
            tipoPessoa === "pf"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {/* Ícone diferente para PF e PJ */}
          <span className="mr-1">{tipoPessoa === "pf" ? "👤" : "🏢"}</span>

          {/* Texto do tipo de pessoa */}
          {tipoPessoa === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}

          {/* Status: Válido, Incompleto ou Aguardando */}
          <span className="ml-2 text-xs">
            {valor
              ? documentoValido
                ? "✅ Válido"
                : "⚠️ Incompleto"
              : "📝 Aguardando"}
          </span>
        </span>
      </div>

      {/* ===== ALERTA DE LIMPEZA AUTOMÁTICA ===== */}
      {/* Mostra apenas quando há valor digitado */}
      {valor && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
          ⚠️ Ao mudar o tipo de pessoa, o campo será limpo automaticamente
        </div>
      )}
    </>
  );
}
