// ============================================
// COMPONENTE: BotaoCriarConta
// FINALIDADE: Botão verde específico para "criar conta" com ícone 👤+
// OBSERVAÇÃO: Componente específico, não reutiliza BotaoPrincipal
// ============================================

// 1. DEFINIÇÃO DAS PROPRIEDADES (Props)
interface PropsBotaoCriarConta {
  /**
   * Texto que aparece no botão
   * Valor padrão: "criar conta" (como na imagem)
   */
  texto?: string;

  /**
   * Função executada quando o botão é clicado
   * Se não for fornecida, o botão ainda funciona como submit
   */
  aoClicar?: () => void;

  /**
   * Estado de carregamento (loading)
   * Quando true: mostra spinner animado no lugar do ícone
   */
  carregando?: boolean;

  /**
   * Estado desabilitado
   * Quando true: botão fica cinza e não pode ser clicado
   */
  desabilitado?: boolean;

  /**
   * Tipo HTML do botão
   * "submit": envia um formulário (PADRÃO para cadastro)
   * "button": ação genérica sem enviar formulário
   */
  tipo?: "submit" | "button";
}

// 2. COMPONENTE PRINCIPAL
export function BotaoCriarConta({
  // Valores padrão caso não sejam fornecidos
  texto = "criar conta",
  aoClicar,
  carregando = false,
  desabilitado = false,
  tipo = "submit", // Padrão é "submit" para formulários
}: PropsBotaoCriarConta) {
  // 3. CALCULAR SE O BOTÃO ESTÁ ATIVO
  // Desabilitado OU carregando = não ativo
  const estaAtivo = !carregando && !desabilitado;

  // 4. RENDERIZAÇÃO DO BOTÃO
  return (
    <button
      // Tipo do botão HTML (submit ou button)
      type={tipo}
      // Evento de clique - só executa se estiver ativo
      onClick={() => {
        if (estaAtivo && aoClicar) {
          aoClicar();
        }
      }}
      // Atributo HTML disabled
      disabled={!estaAtivo}
      // CLASSES CSS COM TAILWIND
      // Nota: Template strings com múltiplas linhas para legibilidade
      className={`
        /* LARGURA E ALINHAMENTO */
        w-full           /* Ocupa 100% da largura do container pai */
        flex            /* Usa flexbox para alinhar ícone e texto */
        items-center    /* Alinha ícone e texto verticalmente no centro */
        justify-center  /* Centraliza horizontalmente */
        gap-3           /* Espaço de 12px entre ícone e texto */
        
        /* ESPAÇAMENTO INTERNO (padding) */
        px-8  /* 32px de padding horizontal (esquerda/direita) */
        py-4  /* 16px de padding vertical (cima/baixo) */
        
        /* CORES */
        bg-green-600    /* Cor de fundo verde (exata da imagem) */
        text-white      /* Cor do texto branco */
        
        /* TIPOGRAFIA (fonte) */
        font-bold       /* Texto em negrito */
        text-lg         /* Tamanho grande de fonte (18px) */
        
        /* BORDAS E SOMBRA */
        rounded-xl      /* Bordas extra arredondadas */
        shadow-lg       /* Sombra média (larger) */
        
        /* ANIMAÇÕES E TRANSFORMAÇÕES */
        transition-all  /* Anima todas as propriedades CSS que mudam */
        duration-300    /* Duração da animação: 300ms */
        transform       /* Habilita transformações CSS (translate, scale) */
        
        /* ESTADOS DE INTERAÇÃO */
        /* Quando mouse passa por cima (hover) */
        hover:bg-green-700      /* Verde mais escuro */
        hover:shadow-xl         /* Sombra maior */
        hover:-translate-y-1    /* Move 4px para cima (efeito de levantar) */
        
        /* Quando botão é pressionado (active) */
        active:bg-green-800     /* Verde ainda mais escuro */
        active:translate-y-0    /* Volta para posição original */
        
        /* Quando botão está em foco (teclado/tab) */
        focus:outline-none      /* Remove contorno padrão do navegador */
        focus:ring-4            /* Adiciona anel de foco de 4px */
        focus:ring-green-300    /* Anel verde claro */
        focus:ring-offset-2     /* Espaço de 2px entre botão e anel */
        
        /* ESTILOS PARA ESTADO DESABILITADO/CARREGANDO */
        ${
          !estaAtivo
            ? "opacity-60 cursor-not-allowed" /* 60% transparente + cursor não permitido */
            : "cursor-pointer" /* Cursor de mão quando ativo */
        }
      `}
    >
      {/* 5. CONTEÚDO DO BOTÃO */}

      {/* ÍCONE OU SPINNER DE CARREGAMENTO */}
      {carregando ? (
        // SPINNER (animação de carregamento)
        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin">
          {/* 
            border-t-transparent: faz o topo da borda transparente
            animate-spin: classe do Tailwind que gira 360° continuamente
          */}
        </div>
      ) : (
        // ÍCONE 👤+ (bonequinho com sinal de mais)
        <div className="flex items-center">
          <span className="text-2xl">👤</span> {/* Emoji de bonequinho */}
          <span className="text-xl ml-1">+</span> {/* Sinal de mais */}
        </div>
      )}

      {/* TEXTO DO BOTÃO */}
      <span>{texto}</span>
    </button>
  );
}
