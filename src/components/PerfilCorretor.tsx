// Define as propriedades que nosso componente vai receber
// Isso torna o componente FLEXÍVEL e REUTILIZÁVEL
interface PerfilCorretorProps {
  // DADOS PESSOAIS
  foto: string;
  nome: string;
  creci: string;
  tipoUsuario: "autonomo" | "mei" | "clt" | "pj";

  // DADOS PROFISSIONAIS
  especialidades: string[]; // Array porque pode ter várias especialidades
  experiencia: number; // Em anos (número para cálculos futuros)
  descricao: string; // Sobre o corretor

  // LOCALIZAÇÃO E ATUAÇÃO
  estado: string;
  cidade: string;
  bairrosAtuacao: string[]; // Bairros onde atua

  // DADOS DE CONTATO
  telefone: string;
  email: string;
  whatsapp: string;

  // VINCULO EMPRESARIAL (opcional)
  nomeImobiliaria?: string; // ? significa que é opcional
  nomeConstrutora?: string;

  // ESTATÍSTICAS (para o sistema de matches)
  totalVendas: number;
  avaliacao: number; // Percentual de 0 a 100
  matchesBemSucedidos: number;
}

// Componente principal - recebe TODAS as props definidas acima
export function PerfilCorretor(props: PerfilCorretorProps) {
  // CONTAINER PRINCIPAL
  // max-w-2xl = largura máxima de 42rem (672px)
  // mx-auto = centraliza horizontalmente
  // bg-white = fundo branco
  // rounded-xl = bordas arredondadas
  // shadow-2xl = sombra grande para destaque
  // p-8 = padding de 2rem (32px) em todas as direções
  // border = borda sutil
  // border-gray-200 = cor cinza clara para a borda
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
      {/* CABEÇALHO DO PERFIL - Foto e dados básicos */}
      <div className="flex items-center gap-6 mb-8">
        {/* FOTO */}
        <img
          src={props.foto}
          alt={`Foto de ${props.nome}`}
          className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />

        {/* INFORMAÇÕES PRINCIPAIS */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {props.nome}
          </h1>

          {/* LINHA: CRECI + TIPO DE USUÁRIO */}
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              CRECI: {props.creci}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                props.tipoUsuario === "autonomo"
                  ? "bg-green-100 text-green-800"
                  : props.tipoUsuario === "mei"
                  ? "bg-yellow-100 text-yellow-800"
                  : props.tipoUsuario === "clt"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {props.tipoUsuario.toUpperCase()}
            </span>
          </div>

          {/* VÍNCULO EMPRESARIAL (se existir) */}
          {(props.nomeImobiliaria || props.nomeConstrutora) && (
            <p className="text-gray-600 text-sm">
              🏢 {props.nomeImobiliaria || props.nomeConstrutora}
            </p>
          )}
        </div>
      </div>

      {/* ESPECIALIDADES */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          🎯 Especialidades
        </h2>
        <div className="flex flex-wrap gap-2">
          {props.especialidades.map((especialidade, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
            >
              {especialidade}
            </span>
          ))}
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📝 Sobre</h2>
        <p className="text-gray-600 leading-relaxed">{props.descricao}</p>
      </div>

      {/* LOCALIZAÇÃO E ATUAÇÃO */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          📍 Área de Atuação
        </h2>
        <div className="flex items-center gap-4 text-gray-600 mb-2">
          <span>
            🏙️ {props.cidade} - {props.estado}
          </span>
          <span>📅 {props.experiencia} anos de experiência</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {props.bairrosAtuacao.map((bairro, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
            >
              {bairro}
            </span>
          ))}
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {props.totalVendas}
          </div>
          <div className="text-sm text-gray-500">Vendas</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {props.avaliacao}%
          </div>
          <div className="text-sm text-gray-500">Avaliação</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {props.matchesBemSucedidos}
          </div>
          <div className="text-sm text-gray-500">Matches</div>
        </div>
      </div>

      {/* BOTÕES DE AÇÃO */}
      <div className="flex gap-3">
        <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          📞 Ligar Agora
        </button>
        <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          💬 WhatsApp
        </button>
      </div>
    </div>
  );
}
