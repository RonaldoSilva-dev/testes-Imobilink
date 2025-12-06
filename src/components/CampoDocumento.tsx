// ============================================
// COMPONENTE: CampoDocumento
// FINALIDADE: Campo dinâmico CPF/CNPJ
// DIFERENÇA: Usa hook + componente separado (lógica e UI separadas)
// ============================================

// 1. IMPORTS
// Importa componentes e hook que vamos usar
import { CampoInputMascara } from "./CampoInputMascara";
import { useValidarDocumento } from "../hooks/useValidarDocumento";
import { DocumentoStatus } from "./DocumentoStatus";

// 2. TIPOS
type TipoPessoa = "pf" | "pj";

// 3. INTERFACE DAS PROPRIEDADES
interface PropsCampoDocumento {
  tipoPessoa: TipoPessoa;
  valor: string;
  aoMudar: (novoValor: string) => void;
  placeholder?: string;
  obrigatorio?: boolean;
  desabilitado?: boolean;
}

// 4. COMPONENTE EM SI
export function CampoDocumento({
  tipoPessoa,
  valor,
  aoMudar,
  placeholder,
  obrigatorio = true,
  desabilitado = false,
}: PropsCampoDocumento) {
  // ============================================
  // 5. USO DO HOOK (lógica extraída)
  // ============================================
  /**
   * Recebemos de volta:
   * - erro: mensagem de erro (ou string vazia)
   * - handleMudar: função para o campo
   * - dados calculados: para mostrar status
   */
  const {
    erro,
    handleMudar,
    digitosAtuais,
    digitosNecessarios,
    documentoValido,
  } = useValidarDocumento({
    tipoPessoa, // Passamos para o hook
    valor, // Passamos para o hook
    aoMudar, // Passamos para o hook
  });

  // ============================================
  // 6. CONFIGURAÇÃO (apenas dados estáticos)
  // ============================================
  /**
   * Objeto com configurações que não mudam
   * Apenas dados, sem lógica
   */
  const config = {
    pf: {
      rotulo: "CPF *",
      tipoMascara: "cpf" as const,
      placeholderPadrao: "Digite seu CPF (11 dígitos)",
      icone: "👤",
    },
    pj: {
      rotulo: "CNPJ *",
      tipoMascara: "cnpj" as const,
      placeholderPadrao: "Digite seu CNPJ (14 dígitos)",
      icone: "🏢",
    },
  };

  // Pega a configuração correta baseada no tipo
  const configAtual = config[tipoPessoa];

  // ============================================
  // 7. RENDERIZAÇÃO (apenas UI)
  // ============================================
  return (
    <div className="mb-4">
      {/* ===== RÓTULO COM ÍCONE ===== */}
      <div className="flex items-center mb-2">
        <span className="text-lg mr-2">{configAtual.icone}</span>
        <label className="block text-gray-700 text-sm font-medium">
          {configAtual.rotulo}
          {obrigatorio && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {/* ===== CAMPO COM MÁSCARA ===== */}
      {/* Usamos a função handleMudar do hook */}
      <CampoInputMascara
        rotulo=""
        valor={valor}
        aoMudar={handleMudar}
        tipoMascara={configAtual.tipoMascara}
        placeholder={placeholder || configAtual.placeholderPadrao}
        obrigatorio={obrigatorio}
        desabilitado={desabilitado}
      />

      {/* ===== MENSAGEM DE ERRO ===== */}
      {/* erro vem do hook */}
      {erro && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex items-start">
          <span className="mr-2">⚠️</span>
          <span>{erro}</span>
        </div>
      )}

      {/* ===== STATUS (Componente separado) ===== */}
      {/* Passamos todos os dados calculados para o componente de UI */}
      <DocumentoStatus
        tipoPessoa={tipoPessoa}
        valor={valor}
        digitosAtuais={digitosAtuais}
        digitosNecessarios={digitosNecessarios}
        documentoValido={documentoValido}
      />
    </div>
  );
}
