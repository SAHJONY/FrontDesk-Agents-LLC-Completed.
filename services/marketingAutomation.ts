export class MarketingAutomation {
  async startSequence(_trigger: string, user: any) {
    // Ej: "Si no abrió el email en 2 días, enviar WhatsApp"
    console.log(`Running sequence for ${user.id}`);
  }
}
