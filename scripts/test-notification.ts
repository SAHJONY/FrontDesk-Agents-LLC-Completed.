// scripts/test-notification.ts
import { sendBookingNotification } from '../lib/notifications/whatsapp';

async function testSystem() {
  console.log("🚀 Iniciando prueba de notificación...");
  
  const testData = {
    businessName: "Dental Studio Pro",
    customerPhone: "+15550987654",
    service: "Limpieza Dental Avanzada",
    value: 80
  };

  // REEMPLAZA CON TU TELÉFONO REAL PARA LA PRUEBA
  const myPhone = "+521234567890"; 

  const result = await sendBookingNotification(myPhone, testData);

  if (result.success) {
    console.log("✅ ¡Éxito! Mensaje enviado. Revisa tu WhatsApp.");
  } else {
    console.log("❌ Error en la prueba:", result.error);
  }
}

testSystem();
