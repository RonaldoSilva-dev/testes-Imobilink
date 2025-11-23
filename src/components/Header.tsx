// Criando Header

import { Menu } from "./Menu";

export function Header() {
  return (
    <div>
      <header className=" min-w-full bg-gradient-to-br from-blue-500 via-green-500 to-blue-800 h-32 text-4xl font-bold text-white p-5 flex justify-center">
        <h1>Imobilink</h1>
      </header>
      <Menu />
    </div>
  );
}
