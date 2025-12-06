// Página para testa algumas funcionalidades dos componentes que forem criando, exemplo: ao criar um componente e querer imprimir na tela para vê-lo como ficou, você deve importar o componente criado dentro da div return da função PageTeste abaixo. Depois vá para o arquivo App.tsx importe o componente PageTeste e veja no site como ficou. //

// ============================================
// PÁGINA PARA TESTAR COMPONENTES
// ============================================

import { useState } from "react";
import { CheckboxDuplo } from "../CheckBoxDuplo";
import { CampoDocumento } from "../CampoDocumento";
import { BotaoCriarConta } from "../Botoes/BotaoCriarConta";
import { PossuiConta } from "../PossuiConta";

export function PageTeste() {
  // ===== ESTADOS PARA OS COMPONENTES =====
  const [tipoPessoa, setTipoPessoa] = useState<"pf" | "pj">("pf");
  const [documento, setDocumento] = useState("");

  // ===== FUNÇÃO DE EXEMPLO =====
  const handleTeste = () => {
    alert(`Tipo: ${tipoPessoa}\nDocumento: ${documento}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* ===== TÍTULO PRINCIPAL ===== */}
      <h1 className="text-3xl font-bold text-blue-600 mb-2">
        🧪 Página de Teste - Componentes Criados
      </h1>
      <p className="text-gray-600 mb-8">
        Testando CheckboxDuplo e CampoDocumento
      </p>

      {/* ===== SEÇÃO 1: CHECKBOX DUPLO ===== */}
      <div className="mb-12 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          1. CheckboxDuplo (PJ/PF)
        </h2>

        <div className="mb-2 text-gray-600">
          <p>Dois botões lado a lado, apenas um pode ser selecionado</p>
        </div>

        {/* COMPONENTE CHECKBOXDUPLO */}
        <CheckboxDuplo valor={tipoPessoa} aoMudar={setTipoPessoa} />

        {/* VISUALIZAÇÃO DO ESTADO */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">📊 Estado atual:</h3>
          <div className="space-y-2">
            <p>
              <strong>Tipo selecionado:</strong>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  tipoPessoa === "pf"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {tipoPessoa === "pf"
                  ? "Pessoa Física (PF)"
                  : "Pessoa Jurídica (PJ)"}
              </span>
            </p>
            <p>
              <strong>Valor interno:</strong>
              <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                "{tipoPessoa}"
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* ===== SEÇÃO 2: CAMPO DOCUMENTO DINÂMICO ===== */}
      <div className="mb-12 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          2. CampoDocumento (CPF/CNPJ Dinâmico)
        </h2>

        <div className="mb-4 text-gray-600">
          <p>Este campo muda automaticamente entre CPF e CNPJ</p>
          <p className="text-sm">Baseado no tipo de pessoa selecionado acima</p>
        </div>

        {/* COMPONENTE CAMPODOCUMENTO */}
        <CampoDocumento
          tipoPessoa={tipoPessoa}
          valor={documento}
          aoMudar={setDocumento}
          placeholder="Digite seu documento"
          obrigatorio={true}
        />

        {/* VISUALIZAÇÃO DO ESTADO */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">📊 Informações do documento:</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium">Tipo atual:</p>
              <div className="flex items-center mt-1">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    tipoPessoa === "pf"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {tipoPessoa === "pf"
                    ? "CPF (Pessoa Física)"
                    : "CNPJ (Pessoa Jurídica)"}
                </span>
                <span className="ml-3 text-2xl">
                  {tipoPessoa === "pf" ? "👤" : "🏢"}
                </span>
              </div>
            </div>

            <div>
              <p className="font-medium">Documento digitado (com máscara):</p>
              <code className="block mt-1 px-3 py-2 bg-gray-100 rounded text-sm">
                {documento || "(vazio)"}
              </code>
            </div>

            <div>
              <p className="font-medium">Apenas números (sem máscara):</p>
              <code className="block mt-1 px-3 py-2 bg-gray-100 rounded text-sm">
                {documento.replace(/\D/g, "") || "(vazio)"}
              </code>
            </div>
          </div>
        </div>
        <BotaoCriarConta />
        <PossuiConta />
        <div className="flex"></div>
        {/* BOTÃO DE TESTE */}
        <div className="mt-6">
          <button
            onClick={handleTeste}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Testar Valores
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Clique para ver os valores no console/alert
          </p>
        </div>
      </div>

      {/* ===== SEÇÃO 3: RESUMO ===== */}
      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
        <h2 className="text-lg font-bold text-green-800 mb-2">
          ✅ Resumo dos Componentes Criados
        </h2>
        <ul className="list-disc pl-5 text-green-700 space-y-1">
          <li>
            <strong>CheckboxDuplo</strong> - Seleção entre PF/PJ (funcionando
            ✅)
          </li>
          <li>
            <strong>CampoDocumento</strong> - Campo dinâmico CPF/CNPJ
            (funcionando ✅)
          </li>
          <li>
            <strong>Próximo:</strong> BotaoCriarConta (botão verde com ícone)
          </li>
        </ul>
        <div className="mt-4 p-3 bg-white rounded-lg border border-green-300">
          <p className="text-green-600 font-medium">
            🎯 Teste a interação entre os componentes:
          </p>
          <ol className="list-decimal pl-5 mt-2 text-green-700 text-sm">
            <li>Selecione "Pessoa Física" no primeiro componente</li>
            <li>Veja o segundo componente mostrar campo de CPF</li>
            <li>Digite um CPF (ex: 12345678901)</li>
            <li>Mude para "Pessoa Jurídica"</li>
            <li>Veja o campo mudar automaticamente para CNPJ</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
