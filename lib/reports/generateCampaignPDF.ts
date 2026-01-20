import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateCampaignPDF = (campaignName: string, stats: any) => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // --- DISEÑO DE CABECERA (ESTILO TERMINAL) ---
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(56, 189, 248); // Sky 400
  doc.setFontSize(10);
  doc.setFont('courier', 'bold');
  doc.text('FRONTDESK PROTOCOL // FINAL REPORT', 15, 15);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(campaignName.toUpperCase(), 15, 28);

  // --- MÉTRICAS CLAVE ---
  doc.setTextColor(100, 116, 139); // Slate 500
  doc.setFontSize(8);
  doc.text(`GENERATED: ${timestamp}`, 15, 48);
  doc.text(`FLEET STATUS: DEPLOYMENT COMPLETED`, 15, 53);

  autoTable(doc, {
    startY: 60,
    head: [['MÉTRICA', 'VALOR', 'IMPACTO ESTIMADO']],
    body: [
      ['TIEMPO HUMANO AHORRADO', stats.hoursSaved + ' HORAS', '5 DÍAS LABORALES'],
      ['REVENUE PIPELINE', `$${stats.revenue.toLocaleString()}`, 'ROI POSITIVO'],
      ['CONVERSIÓN DE FLOTA', stats.conversion + '%', 'OPTIMIZACIÓN ALTA'],
      ['LLAMADAS PROCESADAS', stats.totalCalls, 'ESCALA MASIVA'],
    ],
    theme: 'striped',
    headStyles: { fillStyle: 'f', fillColor: [56, 189, 248], textColor: [0, 0, 0], fontSize: 10, fontStyle: 'bold' },
    styles: { font: 'courier', fontSize: 9 },
  });

  // --- SECCIÓN DE INSIGHTS ---
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFillColor(248, 250, 252); 
  doc.rect(15, finalY, 180, 25, 'F');
  
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('AI RECOMMENDATION:', 20, finalY + 10);
  doc.setFont('helvetica', 'normal');
  doc.text('Se detectaron 12 leads de alta prioridad. Inicie el protocolo de cierre en < 24h.', 20, finalY + 18);

  // --- PIE DE PÁGINA ---
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('ESTE DOCUMENTO ES UN REGISTRO OFICIAL DE OPERACIÓN AUTÓNOMA.', 105, 285, { align: 'center' });

  doc.save(`Report_${campaignName.replace(/\s+/g, '_')}.pdf`);
};
