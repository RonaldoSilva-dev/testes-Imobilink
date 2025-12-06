// ============================================
// COMPONENTE: PossuiConta
// FINALIDADE: Mostrar texto "Já possui conta?" com link "Entrar"
// ============================================

import { LinkEntrar } from "./Links/LinkEntrar";

export function PossuiConta() {
  return (
    <div className="text-center">
      <p className="text-gray-600 text-sm">
        Já possui conta? <LinkEntrar href="/login" texto="Entrar" />
      </p>
    </div>
  );
}
