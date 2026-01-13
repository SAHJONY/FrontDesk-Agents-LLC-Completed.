export class CollectionsAgent {
  async triggerReminder(invoiceId: string) {
    // Envía SMS y Email escalando la urgencia según los días de retraso
    console.log(`Processing collection for invoice ${invoiceId}`);
  }
}
