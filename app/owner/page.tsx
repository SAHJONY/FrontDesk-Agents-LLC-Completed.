// Dentro de tu OwnerMasterDashboard
const activateKillSwitch = async () => {
  const confirmFirst = window.confirm("¡ADVERTENCIA CRÍTICA! Esto apagará la plataforma globalmente. ¿Deseas proceder?");
  if (!confirmFirst) return;

  const confirmSecond = window.prompt("Escribe 'REVOKE' para confirmar el bloqueo total:");
  if (confirmSecond !== 'REVOKE') return;

  try {
    const res = await fetch('/api/owner/kill-switch', { method: 'POST' });
    if (res.ok) {
      alert("PROTOCOLO ACTIVADO: La plataforma ha sido desconectada.");
      window.location.reload();
    }
  } catch (err) {
    alert("Error al ejecutar el Kill-Switch.");
  }
};

// En tu botón del Sidebar:
<button 
  onClick={activateKillSwitch}
  className="w-full bg-red-600/10 border border-red-600/40 text-red-500 text-[10px] py-3 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded shadow-[0_0_15px_rgba(220,38,38,0.2)]"
>
  Activate Kill-Switch
</button>
