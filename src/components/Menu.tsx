// Criando menu de navega
// ✅ DIREÇÕES POSSÍVEIS:
// bg-gradient-to-r → da esquerda para direita
// bg-gradient-to-b → de cima para baixo
// bg-gradient-to-l → da direita para esquerda
// bg-gradient-to-t → de baixo para cima
// bg-gradient-to-br → do canto superior esquerdo para inferior direito

export function Menu() {
  return (
    <div className=" bg-gradient-to-l from-blue-800 via-green-500 to-blue-500">
      <ul className=" flex justify-end gap-5 ">
        <li className="hover:bg-blue-900 hover:text-white rounded-md transition duration-400 px-2">
          <a href="#">Home</a>
        </li>
        <li className="hover:bg-blue-900 hover:text-white rounded-md transition duration-400 px-2">
          <a href="#">Sobre</a>
        </li>
        <li className="hover:bg-blue-900 hover:text-white rounded-md transition duration-400 px-2">
          <a href="#">Contato</a>
        </li>
      </ul>
    </div>
  );
}
