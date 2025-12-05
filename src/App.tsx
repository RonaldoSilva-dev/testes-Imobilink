// Arquivo principal que reune todos os componentes para formar o site //

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PageTeste } from "./components/PagesTestes/PageTeste";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-0 ">
      <header>
        <Header />
      </header>
      <main>
        <PageTeste />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
export default App;
