import { useState } from "react";
// ============================================
// CAMPO DE INPUT COM MÁSCARAS ESPECIAIS
// ============================================

// 1. TIPOS DE MÁSCARA SUPORTADAS
type TipoMascara = "cpf" | "cnpj" | "telefone" | "senha" | "nenhuma";

// 2. PROPRIEDADES DO COMPONENTE
interface PropsCampoInputMascara {
  rotulo: string;
  valor: string;
  aoMudar: (valor: string) => void;
  tipoMascara?: TipoMascara; // Opcional: padrão 'nenhuma'
  placeholder?: string;
  obrigatorio?: boolean;
}

// 3. COMPONENTE PRINCIPAL
export function CampoInputMascara({
  rotulo,
  valor,
  aoMudar,
  tipoMascara = "nenhuma", // Padrão: sem máscara
  placeholder = "",
  obrigatorio = false,
}: PropsCampoInputMascara) {
  // 4. ESTADO para mostrar/esconder senha
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // 5. FUNÇÃO para APLICAR MÁSCARA AO MOSTRAR
  const formatarParaExibicao = (valor: string): string => {
    if (!valor) return "";

    switch (tipoMascara) {
      case "cpf":
        // 12345678901 → 123.456.789-01
        return valor
          .replace(/\D/g, "") // Remove não-dígitos
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
          .slice(0, 14);

      case "cnpj":
        // 12345678000199 → 12.345.678/0001-99
        return valor
          .replace(/\D/g, "")
          .replace(/^(\d{2})(\d)/, "$1.$2")
          .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
          .replace(/\.(\d{3})(\d)/, ".$1/$2")
          .replace(/(\d{4})(\d)/, "$1-$2")
          .slice(0, 18);

      case "telefone": {
        // 11999999999 → (11) 99999-9999
        const apenasNumeros = valor.replace(/\D/g, "");
        if (apenasNumeros.length <= 10) {
          // Fixo: (11) 9999-9999
          return apenasNumeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .slice(0, 14);
        } else {
          // Celular: (11) 99999-9999
          return apenasNumeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
        }
      }

      default:
        return valor; // Sem formatação
    }
  };

  // 6. FUNÇÃO para REMOVER MÁSCARA AO SALVAR
  const removerMascara = (valorFormatado: string): string => {
    // Remove tudo que não for dígito
    return valorFormatado.replace(/\D/g, "");
  };

  // 7. FUNÇÃO quando USUÁRIO DIGITA
  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = evento.target.value;

    // Se for máscara de senha, não formata
    if (tipoMascara === "senha") {
      aoMudar(valorDigitado);
      return;
    }

    // Remove máscara antiga e aplica nova
    const valorLimpo = removerMascara(valorDigitado);
    aoMudar(valorLimpo); // Salva APENAS números
  };

  // 8. DETERMINAR O TIPO DO INPUT HTML
  const getInputType = (): string => {
    if (tipoMascara === "senha") {
      return mostrarSenha ? "text" : "password";
    }
    return "text"; // CPF, CNPJ, Telefone são text com máscara
  };

  // 9. VALOR PARA EXIBIÇÃO (com máscara)
  const valorExibicao =
    tipoMascara === "senha"
      ? valor // Senha mostra asteriscos
      : formatarParaExibicao(valor);

  // 10. RENDERIZAÇÃO
  return (
    <div className="mb-4">
      {/* RÓTULO */}
      <label className="block text-gray-700 text-sm font-medium mb-1">
        {rotulo}
        {obrigatorio && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* CONTAINER DO INPUT (para botão de senha) */}
      <div className="relative">
        {/* INPUT PRINCIPAL */}
        <input
          type={getInputType()}
          value={valorExibicao}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            w-full
            px-3 py-2
            border border-gray-300
            rounded-md
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
            transition-colors
            ${tipoMascara === "senha" ? "pr-10" : ""} // Espaço para botão
          `}
          required={obrigatorio}
        />

        {/* BOTÃO MOSTRAR/ESCONDER SENHA (apenas para tipo 'senha') */}
        {tipoMascara === "senha" && valor && (
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {mostrarSenha ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {/* DICA DA MÁSCARA (opcional) */}
      {tipoMascara !== "nenhuma" && tipoMascara !== "senha" && (
        <p className="text-xs text-gray-500 mt-1">
          Formato:{" "}
          {tipoMascara === "cpf"
            ? "999.999.999-99"
            : tipoMascara === "cnpj"
            ? "99.999.999/9999-99"
            : "(99) 99999-9999"}
        </p>
      )}
    </div>
  );
}

// ============================================
// NOTA: Precisa importar useState do React
// Adicione no topo do arquivo:
// import { useState } from 'react';
// ============================================
