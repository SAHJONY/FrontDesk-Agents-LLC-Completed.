export class VoCPlatform {
  async sendSurvey(_clientId: string) {
    // Dispara encuesta vía WhatsApp/SMS tras finalizar una cita
    return { status: 'Sent' };
  }
}
