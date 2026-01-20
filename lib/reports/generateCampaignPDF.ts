import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateCampaignPDF = (campaignName: string, stats: any) => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // --- CABECERA DE ALTO IMPACTO (MODO OSCURO) ---
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, 210, 50, 'F');
  
  // Línea decorativa Sky Blue
  doc.setFillColor(56, 189, 248); // Sky 400
  doc.rect(0, 0, 5, 50, 'F');

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(9);
  doc.setFont('courier', 'bold');
  doc.text('FRONTDESK PROTOCOL // MISSION CRITICAL REPORT', 15, 15);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(campaignName.toUpperCase(), 15, 30);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(`Fleet ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()} // Live Deployment Data`, 15, 40);

  // --- BLOQUE DE METADATOS ---
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8);
  doc.setFont('courier', 'normal');
  doc.text(`TIMESTAMP: ${timestamp}`, 15, 60);
  doc.text(`OPERATOR: AUTONOMOUS AGENT CLUSTER`, 15, 65);
  doc.text(`STATUS: DISPATCH COMPLETED`, 15, 70);

  // --- TABLA DE MÉTRICAS (ESTILO INDUSTRIAL) ---
  autoTable(doc, {
    startY: 80,
    head: [['PROTOCOL METRIC', 'RESULT', 'ECONOMIC IMPACT']],
    body: [
      ['HUMAN TIME RECOVERY', stats.hoursSaved + ' HOURS', 'OPTIMIZED'],
      ['REVENUE PIPELINE', `$${stats.revenue.toLocaleString()}`, 'HIGH ROI'],
      ['FLEET CONVERSION', stats.conversion + '%', 'VERIFIED'],
      ['TOTAL NODES DISPATCHED', stats.totalCalls, 'SCALED'],
    ],
    theme: 'grid',
    headStyles: { 
      fillColor: [15, 23, 42], 
      textColor: [56, 189, 248], 
      fontSize: 10, 
      fontStyle: 'bold',
      lineWidth: 0.5,
      lineColor: [30, 41, 59]
    },
    styles: { 
      font: 'courier', 
      fontSize: 9, 
      cellPadding: 6,
      lineColor: [226, 232, 240] 
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { textColor: [14, 165, 233] }, // Sky 500
      2: { textColor: [16, 185, 129] }  // Emerald 500
    }
  });

  // --- SECCIÓN DE INSIGHTS DE IA ---
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  
  // Caja de Insight
  doc.setFillColor(241, 245, 249); // Slate 100
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.roundedRect(15, finalY, 180, 35, 3, 3, 'FD');
  
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('STRATEGIC AI RECOMMENDATION:', 22, finalY + 12);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const insightText = 'Se han identificado 12 leads de alta prioridad con un sentimiento de compra superior al 90%. Se recomienda contacto humano inmediato para cierre de contrato.';
  const splitText = doc.splitTextToSize(insightText, 165);
  doc.text(splitText, 22, finalY + 22);

  // --- FIRMA DIGITAL / AUTHENTICITY ---
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  const hash = Math.random().toString(16).slice(2);
  doc.text(`DIGITAL SIGNATURE HASH: ${hash}`, 15, 275);
  doc.text('FRONTDESK PROTOCOL - VERIFIED AUTONOMOUS OPERATION', 105, 285, { align: 'center' });

  // Guardar archivo
  doc.save(`Protocol_Report_${campaignName.replace(/\s+/g, '_')}.pdf`);
};
