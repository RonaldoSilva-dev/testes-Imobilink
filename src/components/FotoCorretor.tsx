// Importa a biblioteca React - necessária para criar componentes
//import React from "react";

// Define nosso componente como uma função
// "FotoCorretor" é o nome do componente (sempre começa com maiúscula)
// "props" são as propriedades que podemos passar para o componente
export function FotoCorretor(props: { src: string; alt: string }) {
  return (
    /* 
      DIV PRINCIPAL:
      flex = usa flexbox para alinhamento
      justify-center = centraliza horizontalmente  
      items-center = centraliza verticalmente
      mb-6 = margin-bottom de 1.5rem (24px)
    */
    <div className="flex justify-center items-center mb-6">
      {/* 
        IMAGEM:
        w-32 = width de 8rem (128px)
        h-32 = height de 8rem (128px) 
        rounded-full = borda totalmente redonda (círculo)
        border-4 = borda de 4px de espessura
        border-blue-500 = cor azul da borda
        object-cover = a imagem cobre todo o espaço sem distorcer
        shadow-lg = sombra média
        props.src = URL da imagem que vem das propriedades
        props.alt = texto alternativo para acessibilidade
      */}
      <img
        src={props.src}
        alt={props.alt}
        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-lg"
      />
    </div>
  );
}
