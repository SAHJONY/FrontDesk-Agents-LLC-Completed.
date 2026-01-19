import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generateInvoice(tenantName: string, calls: any[], billingDate: string) {
  const doc = new jsPDF();
  
  // 1. Header & Branding
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("NEURAL VOICE AI - INVOICE", 14, 22);
  
  doc.setFontSize(10);
  doc.text(`Tenant: ${tenantName}`, 14, 32);
  doc.text(`Billing Period: ${billingDate}`, 14, 37);

  // 2. Metrics Summary
  const totalMinutes = Math.round(calls.reduce((acc, c) => acc + (c.duration || 0), 0) / 60);
  doc.text(`Total AI Minutes: ${totalMinutes}`, 14, 50);
  doc.text(`Total Encounters: ${calls.length}`, 14, 55);

  // 3. Detailed Call Table
  const tableRows = calls.map(call => [
    new Date(call.created_at).toLocaleDateString(),
    call.customer_number,
    `${call.duration}s`,
    call.sentiment || 'Neutral'
  ]);

  (doc as any).autoTable({
    startY: 65,
    head: [['Date', 'Origin', 'Duration', 'Sentiment']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [6, 182, 212] } // Cyan-500
  });

  return doc.save(`Invoice_${tenantName}_${billingDate}.pdf`);
}
