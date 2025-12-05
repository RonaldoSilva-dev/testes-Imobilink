// ============================================
// 1. DEFINIÇÃO DAS "PROPRIEDADES" DO BOTÃO
// ============================================
// "Interface" é como uma RECEITA que diz quais "ingredientes" o botão precisa
interface PropsDoBotao {
  // INGREDIENTE 1: "texto" (OBRIGATÓRIO)
  // Tipo: string (texto)
  // Exemplo: "Buscar Imóveis", "Salvar", "Enviar"
  texto: string;

  // INGREDIENTE 2: "aoClicar" (OBRIGATÓRIO)
  // Tipo: função que não recebe nada () e não retorna nada (void)
  // Exemplo: () => alert("Botão clicado!")
  aoClicar?: () => void;
}
// FIM da definição das propriedades
// ============================================

// ============================================
// 2. CRIAÇÃO DO COMPONENTE "BotaoPrincipal"
// ============================================
// "export function" = torna esta função visível para outros arquivos
// "BotaoPrincipal" = nome do nosso componente
// "{ texto, aoClicar }" = DESTRUTURAÇÃO (explico abaixo)
// ": PropsDoBotao" = garante que seguimos a "receita" acima
export function BotaoPrincipal({ texto, aoClicar }: PropsDoBotao) {
  // ============================================
  // 3. O QUE O COMPONENTE RETORNA (JSX)
  // ============================================
  // Todo componente React RETORNA JSX (HTML misturado com JavaScript)
  return (
    // TAG <button> do HTML normal
    <button
      // ATRIBUTO "className" = classes CSS do Tailwind
      // bg-blue-500 = fundo azul
      // text-white = texto branco
      // px-4 = padding horizontal (esquerda/direita)
      // py-2 = padding vertical (cima/baixo)
      // rounded = bordas arredondadas
      className="bg-blue-500 text-white px-4 py-2 rounded"
      // ATRIBUTO "onClick" = O QUE ACONTECE quando clicar no botão
      // Quando o botão for clicado, executa a função "aoClicar"
      // que foi passada como "ingrediente"
      onClick={aoClicar}
    >
      {/* 
        AQUI DENTDO DO BOTÃO: 
        Mostra o TEXTO que foi passado como "ingrediente"
        {texto} = pega a variável "texto" e coloca aqui
      */}
      {texto}
    </button>
  );
}
// FIM do componente
// ============================================
