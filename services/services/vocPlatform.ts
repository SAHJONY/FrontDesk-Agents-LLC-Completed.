export class VoCPlatform {
  async sendSurvey(clientId: string) {
    // Dispara encuesta vía WhatsApp/SMS tras finalizar una cita
    return { status: 'Sent' };
  }
}
