// ============================================
// COMPONENTE: LinkEntrar
// FINALIDADE: Link verde "Entrar" para quem já tem conta
// POSIÇÃO: Abaixo do botão "Criar conta" no formulário
// ============================================

// 1. DEFINIÇÃO DAS PROPRIEDADES (Props)
interface PropsLinkEntrar {
  /**
   * Texto do link
   * Valor padrão: "Entrar" (como na imagem)
   */
  texto?: string;

  /**
   * Função executada quando o link é clicado
   * Usada para navegar para página de login
   */
  aoClicar?: () => void;

  /**
   * URL para navegação tradicional (opcional)
   * Se fornecido, o componente vira um link <a> normal
   */
  href?: string;

  /**
   * Se o link está desabilitado
   * Quando true: link fica cinza e não é clicável
   */
  desabilitado?: boolean;
}

// 2. COMPONENTE PRINCIPAL
export function LinkEntrar({
  // Valores padrão caso não sejam fornecidos
  texto = "Entrar",
  aoClicar,
  href,
  desabilitado = false,
}: PropsLinkEntrar) {
  // 3. VARIÁVEL PARA ARIA-DISABLED (correção do erro)
  // O atributo aria-disabled precisa ser string "true" ou "false"
  // Não pode ser boolean diretamente
  const ariaDisabledValue = desabilitado ? "true" : "false";

  // 4. DETERMINAR SE É UM LINK OU BOTÃO
  // Se tem href E não está desabilitado = link tradicional <a>
  // Caso contrário, renderiza como botão estilizado
  const eLink = href && !desabilitado;

  // 5. CLASSES CSS BASE (compartilhadas entre link e botão)
  const classesBase = `
    /* TIPOGRAFIA */
    font-medium        /* Peso médio da fonte (não muito negrito) */
    text-sm            /* Tamanho pequeno de fonte (14px) */
    
    /* ANIMAÇÕES */
    transition-colors  /* Anima apenas mudanças de cor */
    duration-200       /* Animação rápida (200ms) */
    
    /* ESTADO DESABILITADO */
    ${
      desabilitado
        ? "text-gray-400 cursor-not-allowed" /* Cinza claro + cursor não permitido */
        : "text-green-600 hover:text-green-700 cursor-pointer" /* Verde + cursor mão */
    }
  `;

  // 6. RENDERIZAÇÃO CONDICIONAL
  // Se for um link tradicional (<a>)
  if (eLink) {
    return (
      <a
        href={href} // URL para onde o link leva
        className={classesBase}
        onClick={(evento) => {
          // Se tiver função aoClicar, previne comportamento padrão e executa
          if (aoClicar) {
            evento.preventDefault(); // Não segue o href
            aoClicar();
          }
        }}
        // Atributos de segurança para links externos
        target="_blank" // Abre em nova aba
        rel="noopener noreferrer" // Previne ataques de segurança
        // Atributos de acessibilidade
        aria-disabled={ariaDisabledValue} // Usando variável corrigida
      >
        {texto}
      </a>
    );
  }

  // 7. SE NÃO FOR LINK TRADICIONAL, RENDERIZA COMO BOTÃO ESTILIZADO
  return (
    <button
      type="button" // Tipo button para não enviar formulário
      onClick={aoClicar}
      disabled={desabilitado} // Atributo HTML nativo para desabilitar
      className={`
        ${classesBase}
        /* ESTILOS ESPECÍFICOS PARA BOTÃO */
        bg-transparent  /* Fundo transparente (não tem fundo) */
        border-none     /* Sem borda */
        p-0             /* Sem padding (já controlado pelo texto) */
        
        /* FOCO (acessibilidade) */
        focus:outline-none      /* Remove contorno padrão */
        focus:ring-2            /* Anel de foco fino */
        focus:ring-green-500    /* Anel verde */
        focus:ring-offset-1     /* Pequeno espaço do anel */
      `}
      // Atributos de acessibilidade
      aria-disabled={ariaDisabledValue} // Usando variável corrigida
    >
      {texto}
    </button>
  );
}
