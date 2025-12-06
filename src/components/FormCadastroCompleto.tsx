// src/components/FormCadastroCompleto.tsx
// ============================================
// COMPONENTE: FormCadastroCompleto
// FINALIDADE: Formulário completo de cadastro com duas colunas
// LADO ESQUERDO: Campos do formulário
// LADO DIREITO: Marketing (logo, imagem, texto)
// ============================================

import { useState } from "react";

// Importa todos os componentes que vamos usar
import { CampoDocumento } from "./CampoDocumento";
import { CampoInput } from "./CampoInput";
import { CampoInputMascara } from "./CampoInputMascara";
import { CampoSelect } from "./CampoSelect";
import { BotaoCriarConta } from "./Botoes/BotaoCriarConta";
import { PossuiConta } from "./PossuiConta";
import { CheckboxDuplo } from "./CheckBoxDuplo";

// Componente principal
export function FormCadastroCompleto() {
  // ===== ESTADOS DO FORMULÁRIO =====

  // 1. Tipo de pessoa (PF/PJ) - controla CheckboxDuplo e CampoDocumento
  const [tipoPessoa, setTipoPessoa] = useState<"pf" | "pj">("pf");

  // 2. Documento (CPF/CNPJ) - dinâmico baseado em tipoPessoa
  const [documento, setDocumento] = useState("");

  // 3. Dados pessoais
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  // 4. Perfil (select)
  const [perfil, setPerfil] = useState("");

  // 5. Estado de carregamento do botão
  const [carregando, setCarregando] = useState(false);

  // ===== OPÇÕES PARA O SELECT DE PERFIL =====
  const opcoesPerfil = [
    { valor: "corretor", texto: "Corretor" },
    { valor: "imobiliaria", texto: "Imobiliária" },
    { valor: "incorporadora", texto: "Incorporadora" },
    { valor: "cliente", texto: "Cliente" },
    { valor: "proprietario", texto: "Proprietário" },
    { valor: "administrador", texto: "Administrador" },
  ];

  // ===== FUNÇÃO PARA ENVIAR O FORMULÁRIO =====
  const handleSubmit = async () => {
    // Ativa estado de carregamento
    setCarregando(true);

    // Simula processamento (substituir por chamada API real)
    console.log("Dados do formulário:", {
      tipoPessoa,
      documento,
      nomeCompleto,
      email,
      telefone,
      senha,
      perfil,
    });

    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Desativa carregamento
    setCarregando(false);

    // Aqui normalmente faria:
    // 1. Validação dos dados
    // 2. Chamada API para cadastro
    // 3. Redirecionamento ou mensagem de sucesso
    alert("Cadastro realizado com sucesso! (simulação)");
  };

  // ===== RENDERIZAÇÃO =====
  return (
    // Container principal
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Container do conteúdo (centralizado, largura máxima) */}
      <div className="max-w-6xl mx-auto">
        {/* Grid de duas colunas */}
        {/* Em desktop: duas colunas lado a lado */}
        {/* Em mobile: uma coluna empilhada */}
        <div
          className="
          grid 
          grid-cols-1          /* Mobile: 1 coluna */
          lg:grid-cols-2       /* Desktop: 2 colunas */
          gap-8                /* Espaço entre colunas */
        "
        >
          {/* ===== COLUNA ESQUERDA: FORMULÁRIO ===== */}
          <div
            className="
            bg-white          /* Fundo branco */
            rounded-2xl       /* Bordas bem arredondadas */
            shadow-xl         /* Sombra forte */
            p-8               /* Padding interno */
            lg:p-10           /* Padding maior em desktop */
          "
          >
            {/* Título do formulário */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Crie sua conta
              </h1>
              <p className="text-gray-600 mt-2">
                Preencha os dados abaixo para começar
              </p>
            </div>

            {/* ===== SEÇÃO: TIPO DE PESSOA ===== */}
            <div className="mb-8">
              <CheckboxDuplo valor={tipoPessoa} aoMudar={setTipoPessoa} />
            </div>

            {/* ===== SEÇÃO: DOCUMENTO (CPF/CNPJ DINÂMICO) ===== */}
            <div className="mb-8">
              <CampoDocumento
                tipoPessoa={tipoPessoa}
                valor={documento}
                aoMudar={setDocumento}
                placeholder="Digite seu documento"
                obrigatorio={true}
              />
            </div>

            {/* ===== SEÇÃO: DADOS PESSOAIS ===== */}
            <div className="space-y-6 mb-8">
              {/* Nome completo */}
              <CampoInput
                rotulo="Nome completo *"
                tipo="text"
                valor={nomeCompleto}
                aoMudar={setNomeCompleto}
                placeholder="Digite seu nome completo"
                obrigatorio={true}
              />

              {/* E-mail */}
              <CampoInput
                rotulo="E-mail *"
                tipo="email"
                valor={email}
                aoMudar={setEmail}
                placeholder="seu@email.com"
                obrigatorio={true}
              />

              {/* Telefone */}
              <CampoInputMascara
                rotulo="Telefone"
                valor={telefone}
                aoMudar={setTelefone}
                tipoMascara="telefone"
                placeholder="(11) 99999-9999"
                obrigatorio={false}
              />

              {/* Senha */}
              <CampoInputMascara
                rotulo="Senha *"
                valor={senha}
                aoMudar={setSenha}
                tipoMascara="senha"
                placeholder="Mínimo 8 caracteres"
                obrigatorio={true}
              />
            </div>

            {/* ===== SEÇÃO: PERFIL ===== */}
            <div className="mb-10">
              <CampoSelect
                rotulo="Perfil *"
                valor={perfil}
                aoMudar={setPerfil}
                opcoes={opcoesPerfil}
                placeholder="Selecione seu perfil..."
                obrigatorio={true}
              />
            </div>

            {/* ===== BOTÃO CRIAR CONTA ===== */}
            <div className="mb-6">
              <BotaoCriarConta
                aoClicar={handleSubmit}
                carregando={carregando}
                desabilitado={carregando}
              />
            </div>

            {/* ===== LINK "JÁ POSSUI CONTA?" ===== */}
            <div className="text-center">
              <PossuiConta />
            </div>
          </div>{" "}
          {/* FIM COLUNA ESQUERDA */}
          {/* ===== COLUNA DIREITA: MARKETING ===== */}
          <div
            className="
            bg-gradient-to-br from-blue-50 to-green-50  /* Gradiente suave */
            rounded-2xl                                 /* Bordas arredondadas */
            shadow-xl                                   /* Sombra igual ao formulário */
            p-8                                         /* Padding */
            lg:p-10                                     /* Padding maior em desktop */
            flex                                        /* Flexbox para centralizar */
            flex-col                                    /* Coluna vertical */
            items-center                                /* Centraliza horizontalmente */
            justify-center                              /* Centraliza verticalmente */
            text-center                                 /* Texto centralizado */
          "
          >
            {/* Logo Anylai */}
            <div className="mb-8">
              <div
                className="
                text-4xl               /* Tamanho grande */
                font-bold              /* Negrito */
                text-blue-700          /* Cor azul */
                mb-2                   /* Espaço abaixo */
              "
              >
                Anylai
              </div>
              <p className="text-sm text-blue-600">
                Plataforma Imobiliária Inteligente
              </p>
            </div>

            {/* Imagem redonda da mulher (placeholder com ícone) */}
            <div
              className="
              w-48 h-48               /* Tamanho quadrado */
              rounded-full            /* Torna redondo */
              bg-gradient-to-r        /* Gradiente */
              from-blue-100           /* Azul claro */
              to-green-100            /* Verde claro */
              flex                    /* Flex para centralizar */
              items-center            /* Centraliza verticalmente */
              justify-center          /* Centraliza horizontalmente */
              mb-8                    /* Espaço abaixo */
              shadow-lg               /* Sombra leve */
              border-4                /* Borda grossa */
              border-white            /* Borda branca */
            "
            >
              {/* Ícone/placeholder (substituir por imagem real) */}
              <div
                className="
                text-6xl              /* Tamanho grande do ícone */
                text-blue-600         /* Cor azul */
                opacity-80            /* Levemente transparente */
              "
              >
                👩‍💼
              </div>
            </div>

            {/* Texto descritivo */}
            <div className="max-w-md">
              {" "}
              {/* Limita largura do texto */}
              <h2
                className="
                text-xl               /* Tamanho médio */
                lg:text-2xl           /* Maior em desktop */
                font-bold             /* Negrito */
                text-gray-800         /* Cor escura */
                mb-4                  /* Espaço abaixo */
              "
              >
                Automatize tarefas, gere leads e otimize seus resultados
              </h2>
              <p
                className="
                text-gray-600         /* Cor cinza */
                text-base             /* Tamanho base */
                lg:text-lg            /* Maior em desktop */
                leading-relaxed       /* Espaçamento entre linhas */
                mb-6                  /* Espaço abaixo */
              "
              >
                No setor imobiliário e marketing, nossa plataforma oferece as
                ferramentas necessárias para impulsionar seu negócio.
              </p>
              {/* Lista de benefícios */}
              <div
                className="
                text-left             /* Texto alinhado à esquerda */
                space-y-3             /* Espaço entre itens */
                mb-8                  /* Espaço abaixo */
              "
              >
                <div className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">
                    Gestão de clientes automatizada
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">
                    Anúncios otimizados para venda
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">
                    Relatórios detalhados de performance
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">
                    Integração com principais portais
                  </span>
                </div>
              </div>
              {/* Texto de rodapé */}
              <p
                className="
                text-sm               /* Texto pequeno */
                text-gray-500         /* Cor cinza claro */
                italic                /* Itálico */
              "
              >
                Junte-se a mais de 1.000 profissionais que já otimizaram seus
                processos
              </p>
            </div>
          </div>{" "}
          {/* FIM COLUNA DIREITA */}
        </div>{" "}
        {/* FIM DO GRID */}
      </div>{" "}
      {/* FIM CONTAINER CENTRAL */}
    </div>
  );
}
