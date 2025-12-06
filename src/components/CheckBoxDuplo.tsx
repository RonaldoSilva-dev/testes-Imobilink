// ============================================
// COMPONENTE: CHECKBOX DUPLO (PJ/PF) - VERSÃO DEFINITIVA
// ============================================

// 1. TIPOS DE PESSOA
type TipoPessoa = "pf" | "pj";

// 2. PROPRIEDADES
interface PropsCheckboxDuplo {
  valor: TipoPessoa;
  aoMudar: (novoTipo: TipoPessoa) => void;
  desabilitado?: boolean;
}

export function CheckboxDuplo({
  valor,
  aoMudar,
  desabilitado = false,
}: PropsCheckboxDuplo) {
  // 3. FUNÇÃO PARA SELECIONAR TIPO
  const selecionarTipo = (tipo: TipoPessoa) => {
    if (!desabilitado && valor !== tipo) {
      aoMudar(tipo);
    }
  };

  // 4. DETERMINAR SE ESTÁ MARCADO (para evitar expressões inline)
  const pfEstaMarcado = valor === "pf";
  const pjEstaMarcado = valor === "pj";

  return (
    // CONTAINER PRINCIPAL
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-3">
        Tipo de Cadastro *
      </label>

      {/* DOIS CHECKBOXES LADO A LADO */}
      <div className="flex gap-6">
        {/* CHECKBOX PESSOA FÍSICA */}
        <RadioButton
          marcado={pfEstaMarcado}
          onClick={() => selecionarTipo("pf")}
          desabilitado={desabilitado}
          texto="Pessoa Física (PF)"
        />

        {/* CHECKBOX PESSOA JURÍDICA */}
        <RadioButton
          marcado={pjEstaMarcado}
          onClick={() => selecionarTipo("pj")}
          desabilitado={desabilitado}
          texto="Pessoa Jurídica (PJ)"
        />
      </div>

      {/* TEXTO DE AJUDA */}
      <p className="mt-2 text-sm text-gray-500">
        Selecione o tipo de pessoa para cadastro
      </p>
    </div>
  );
}

// ============================================
// SUB-COMPONENTE: RadioButton (para isolar o problema)
// ============================================

interface PropsRadioButton {
  marcado: boolean;
  onClick: () => void;
  desabilitado: boolean;
  texto: string;
}

function RadioButton({
  marcado,
  onClick,
  desabilitado,
  texto,
}: PropsRadioButton) {
  // 5. VALOR FIXO PARA ARIA-CHECKED (sem expressões)
  const ariaCheckedValue = marcado ? "true" : "false";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={desabilitado}
      className={`
        flex items-center
        px-4 py-3
        border-2 rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${desabilitado ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${
          marcado
            ? "border-green-500 bg-green-50 text-green-700"
            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
        }
      `}
      aria-checked={ariaCheckedValue}
      role="radio"
    >
      {/* CÍRCULO DO RADIO BUTTON */}
      <div
        className={`
          w-5 h-5
          border-2 rounded-full
          mr-3
          flex items-center justify-center
          ${marcado ? "border-green-500 bg-green-500" : "border-gray-400"}
        `}
      >
        {/* PONTO INTERNO (quando selecionado) */}
        {marcado && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>

      {/* TEXTO */}
      <span className="font-medium">{texto}</span>
    </button>
  );
}
// ============================================
// FIM DO COMPONENTE
// ============================================
