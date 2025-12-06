// ============================================
// HOOK PERSONALIZADO: useValidarDocumento
// FINALIDADE: Extrair toda a lógica de validação de CPF/CNPJ
// USO: Para validar documentos em formulários de cadastro
// ============================================

// Importações necessárias do React
import { useState, useEffect, useCallback } from "react";

// ============================================
// 1. DEFINIÇÃO DOS TIPOS
// ============================================

/**
 * Tipo que representa o tipo de pessoa
 * "pf" = Pessoa Física (CPF)
 * "pj" = Pessoa Jurídica (CNPJ)
 */
type TipoPessoa = "pf" | "pj";

/**
 * Interface das propriedades que o hook recebe
 * São os dados que o componente pai passa para o hook
 */
interface UseValidarDocumentoProps {
  /**
   * Tipo de pessoa (PF ou PJ)
   * Define se valida CPF ou CNPJ
   */
  tipoPessoa: TipoPessoa;

  /**
   * Valor atual do campo de documento
   * Pode estar com ou sem máscara
   */
  valor: string;

  /**
   * Função para atualizar o valor no componente pai
   * Esta função é passada pelo componente que usa o hook
   */
  aoMudar: (novoValor: string) => void;
}

/**
 * Interface do que o hook retorna
 * São os dados e funções que o componente pode usar
 */
interface UseValidarDocumentoRetorno {
  /**
   * Mensagem de erro (string vazia se não houver erro)
   */
  erro: string;

  /**
   * Função pronta para ser usada no evento onChange
   * Já inclui validação em tempo real
   */
  handleMudar: (novoValor: string) => void;

  /**
   * Quantidade de dígitos atualmente digitados
   * (apenas números, sem máscara)
   */
  digitosAtuais: number;

  /**
   * Quantidade de dígitos necessários
   * 11 para CPF, 14 para CNPJ
   */
  digitosNecessarios: number;

  /**
   * Booleano que indica se o documento está completo
   * true = tem todos os dígitos necessários
   * false = falta algum dígito
   */
  documentoValido: boolean;
}

// ============================================
// 2. FUNÇÃO PRINCIPAL DO HOOK
// ============================================

/**
 * Hook personalizado para validação de documentos (CPF/CNPJ)
 *
 * @param props - Objeto contendo tipoPessoa, valor e aoMudar
 * @returns Objeto com dados processados e funções para uso no componente
 *
 * @example
 * // Uso no componente:
 * const { erro, handleMudar, digitosAtuais } = useValidarDocumento({
 *   tipoPessoa: "pf",
 *   valor: documento,
 *   aoMudar: setDocumento
 * });
 */
export function useValidarDocumento({
  tipoPessoa,
  valor,
  aoMudar,
}: UseValidarDocumentoProps): UseValidarDocumentoRetorno {
  // ============================================
  // 3. ESTADOS INTERNOS DO HOOK
  // ============================================

  /**
   * Estado para armazenar mensagem de erro
   * String vazia = sem erro
   * String não vazia = mensagem de erro
   */
  const [erro, setErro] = useState<string>("");

  // ============================================
  // 4. USE EFFECT PARA LIMPEZA AO MUDAR TIPO
  // ============================================

  /**
   * Efeito que executa quando o tipoPessoa muda
   * Limpa o campo e a mensagem de erro
   */
  useEffect(() => {
    // Limpa o valor do campo
    aoMudar("");

    // O array de dependências [tipoPessoa, aoMudar] garante que:
    // 1. Executa quando tipoPessoa muda
    // 2. Precisa incluir aoMudar porque é usado dentro do efeito
  }, [tipoPessoa, aoMudar]);

  // ============================================
  // 5. FUNÇÃO DE VALIDAÇÃO (useCallback)
  // ============================================

  /**
   * Função que valida se o documento tem o número correto de dígitos
   *
   * @param documento - Valor digitado (pode ter máscara)
   *
   * A função é embrulhada em useCallback para:
   * 1. Não ser recriada a cada renderização
   * 2. Melhor performance
   * 3. Evitar loops infinitos em useEffect
   */
  const validarDocumento = useCallback(
    (documento: string): void => {
      // Remove tudo que não for dígito (pontos, traços, barras)
      const apenasNumeros = documento.replace(/\D/g, "");

      // Se o campo estiver vazio, não mostra erro
      if (apenasNumeros === "") {
        setErro("");
        return;
      }

      // Validação específica para Pessoa Física (CPF)
      if (tipoPessoa === "pf") {
        if (apenasNumeros.length < 11) {
          // CPF incompleto: calcula dígitos faltantes
          const faltantes = 11 - apenasNumeros.length;
          setErro(`CPF incompleto. Faltam ${faltantes} dígito(s).`);
        } else if (apenasNumeros.length > 11) {
          // CPF com dígitos extras
          setErro("CPF deve ter apenas 11 dígitos.");
        } else {
          // CPF completo e válido
          setErro("");
        }
      }
      // Validação específica para Pessoa Jurídica (CNPJ)
      else {
        if (apenasNumeros.length < 14) {
          // CNPJ incompleto: calcula dígitos faltantes
          const faltantes = 14 - apenasNumeros.length;
          setErro(`CNPJ incompleto. Faltam ${faltantes} dígito(s).`);
        } else if (apenasNumeros.length > 14) {
          // CNPJ com dígitos extras
          setErro("CNPJ deve ter apenas 14 dígitos.");
        } else {
          // CNPJ completo e válido
          setErro("");
        }
      }

      // tipoPessoa está nas dependências porque a validação muda conforme o tipo
    },
    [tipoPessoa]
  );

  // ============================================
  // 6. FUNÇÃO HANDLE MUDAR (useCallback)
  // ============================================

  /**
   * Função que será passada para o campo input
   * Combina a atualização do valor com a validação
   *
   * @param novoValor - Novo valor digitado pelo usuário
   */
  const handleMudar = useCallback(
    (novoValor: string): void => {
      // 1. Atualiza o valor no componente pai
      aoMudar(novoValor);

      // 2. Executa validação em tempo real
      validarDocumento(novoValor);

      // aoMudar e validarDocumento estão nas dependências porque são usadas dentro
    },
    [aoMudar, validarDocumento]
  );

  // ============================================
  // 7. CÁLCULO DOS VALORES DERIVADOS
  // ============================================

  /**
   * Quantidade de dígitos atualmente digitados
   * Remove máscara e conta apenas números
   */
  const digitosAtuais = valor.replace(/\D/g, "").length;

  /**
   * Quantidade de dígitos necessários conforme tipo de pessoa
   * 11 para CPF, 14 para CNPJ
   */
  const digitosNecessarios = tipoPessoa === "pf" ? 11 : 14;

  /**
   * Booleano que indica se o documento está completo
   * Compara dígitos atuais com dígitos necessários
   */
  const documentoValido = digitosAtuais === digitosNecessarios;

  // ============================================
  // 8. RETORNO DO HOOK
  // ============================================

  /**
   * Retorna um objeto com tudo que o componente precisa:
   * - erro: para mostrar mensagem
   * - handleMudar: para o campo input
   * - dados calculados: para exibir status
   */
  return {
    erro,
    handleMudar,
    digitosAtuais,
    digitosNecessarios,
    documentoValido,
  };
}

// ============================================
// FIM DO HOOK useValidarDocumento
// ============================================
