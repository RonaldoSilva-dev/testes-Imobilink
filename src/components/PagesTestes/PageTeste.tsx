// Página para testa algumas funcionalidades dos componentes que forem criando, exemplo: ao criar um componente e querer imprimir na tela para vê-lo como ficou, você deve importar o componente criado dentro da div return da função PageTeste abaixo. Depois vá para o arquivo App.tsx importe o componente PageTeste e veja no site como ficou. //

// Página para testar componentes
import { useState } from "react";

// Importar componentes que já criamos
import { CampoInput } from "../CampoInput";
import { BotaoPrincipal } from "../Botoes/BotaoPrincipal";
import { CampoInputMascara } from "../CampoInputMascara";
import { BotaoSocial } from "../Botoes/BotaoSocial";

export function PageTeste() {
  // ===== ESTADOS PARA CAMPOS SIMPLES =====
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // ===== ESTADOS PARA CAMPOS COM MÁSCARA =====
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  // ===== FUNÇÕES DE EXEMPLO =====
  const buscarImoveis = () => {
    alert("Buscando imóveis... 🏠");
  };

  const salvarFormulario = () => {
    alert("Formulário salvo! 💾");
  };

  const loginGoogle = () => {
    alert("Login com Google... 🔐");
  };

  const loginMicrosoft = () => {
    alert("Login com Microsoft... 🔐");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* ===== TÍTULO PRINCIPAL ===== */}
      <h1 className="text-3xl font-bold text-blue-600 mb-2">
        🧪 Página de Teste - Imobilink
      </h1>
      <p className="text-gray-600 mb-8">
        Teste todos os componentes que vamos criando
      </p>

      {/* ===== SEÇÃO 1: CAMPOS SIMPLES ===== */}
      <div className="mb-12 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          1. Teste CampoInput (simples)
        </h2>

        <CampoInput
          rotulo="Nome completo"
          tipo="text"
          valor={nome}
          aoMudar={setNome}
          placeholder="Digite seu nome completo"
          obrigatorio={true}
        />

        <CampoInput
          rotulo="E-mail"
          tipo="email"
          valor={email}
          aoMudar={setEmail}
          placeholder="seu@email.com"
          obrigatorio={true}
        />

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Valores digitados:</h3>
          <p>
            <strong>Nome:</strong> {nome || "(vazio)"}
          </p>
          <p>
            <strong>E-mail:</strong> {email || "(vazio)"}
          </p>
        </div>
      </div>

      {/* ===== SEÇÃO 2: BOTÕES ===== */}
      <div className="mb-12 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          2. Teste Botões
        </h2>

        <div className="space-y-4 max-w-md">
          <BotaoPrincipal texto="🔍 Buscar Imóveis" aoClicar={buscarImoveis} />

          <BotaoPrincipal
            texto="💾 Salvar Formulário"
            aoClicar={salvarFormulario}
          />

          <BotaoPrincipal
            texto="📞 Contato Rápido"
            aoClicar={() => alert("Ligando... 📱")}
          />
        </div>
      </div>

      {/* ===== SEÇÃO 3: BOTÕES SOCIAIS ===== */}
      <div className="mb-12 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          3. Teste Botões Sociais
        </h2>

        <div className="space-y-3 max-w-xs">
          <BotaoSocial provedor="google" aoClicar={loginGoogle} />

          <BotaoSocial provedor="microsoft" aoClicar={loginMicrosoft} />

          <BotaoSocial
            provedor="google"
            texto="Entrar com Google"
            aoClicar={() => alert("Texto personalizado!")}
          />
        </div>
      </div>

      {/* ===== SEÇÃO 4: CAMPOS COM MÁSCARA ===== */}
      <div className="mb-12 p-6 bg-white rounded-xl shadow max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          4. Teste CampoInputMascara
        </h2>

        {/* CPF */}
        <CampoInputMascara
          rotulo="CPF"
          valor={cpf}
          aoMudar={setCpf}
          tipoMascara="cpf"
          placeholder="Digite seu CPF"
          obrigatorio={true}
        />

        {/* CNPJ */}
        <CampoInputMascara
          rotulo="CNPJ"
          valor={cnpj}
          aoMudar={setCnpj}
          tipoMascara="cnpj"
          placeholder="Digite seu CNPJ"
        />

        {/* TELEFONE */}
        <CampoInputMascara
          rotulo="Telefone"
          valor={telefone}
          aoMudar={setTelefone}
          tipoMascara="telefone"
          placeholder="(11) 99999-9999"
        />

        {/* SENHA */}
        <CampoInputMascara
          rotulo="Senha"
          valor={senha}
          aoMudar={setSenha}
          tipoMascara="senha"
          placeholder="Mínimo 8 caracteres"
        />

        {/* MOSTRAR VALORES (para ver funcionando) */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
          <h3 className="font-medium mb-2">
            Valores armazenados (sem máscara):
          </h3>
          <p>
            <strong>CPF:</strong> {cpf || "(vazio)"}
          </p>
          <p>
            <strong>CNPJ:</strong> {cnpj || "(vazio)"}
          </p>
          <p>
            <strong>Telefone:</strong> {telefone || "(vazio)"}
          </p>
          <p>
            <strong>Senha:</strong> {"*".repeat(senha.length) || "(vazio)"}
          </p>
        </div>

        {/* DICAS DE TESTE */}
        <div className="mt-4 text-xs text-gray-500">
          <p>✅ Teste 1: Digite CPF (12345678901 → 123.456.789-01)</p>
          <p>✅ Teste 2: Digite Telefone (11999999999 → (11) 99999-9999)</p>
          <p>✅ Teste 3: Clique no olhinho da senha</p>
        </div>
      </div>

      {/* ===== SEÇÃO 5: RESUMO ===== */}
      <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h2 className="text-lg font-bold text-blue-800 mb-2">
          📊 Resumo dos Componentes Criados
        </h2>
        <ul className="list-disc pl-5 text-blue-700">
          <li>✅ CampoInput - Campos de texto simples</li>
          <li>✅ BotaoPrincipal - Botão primário reutilizável</li>
          <li>✅ BotaoSocial - Botões Google/Microsoft</li>
          <li>✅ CampoInputMascara - CPF, CNPJ, Telefone, Senha</li>
          <li>⏳ CampoSelect - Dropdown para "Perfil"</li>
          <li>⏳ CheckboxCustom - Para termos de uso</li>
          <li>⏳ CardImovel - Card de imóvel (principal)</li>
        </ul>
        <p className="mt-3 text-blue-600">
          Próximo passo: Criar CampoSelect para o campo "Perfil"
        </p>
      </div>
    </div>
  );
}
