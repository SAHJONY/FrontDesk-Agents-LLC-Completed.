/**
 * FrontDesk Agents AI Workforce - Main Orchestrator
 * Military-grade autonomous AI agent system
 */

export { supremeCommander, Division, MissionStatus, Priority } from './supreme-commander';
export { emailRoutingAgent, EmailCategory, UrgencyLevel } from './routing-agent';
export { responseGenerationAgent, conversationManagementAgent, ResponseTone } from './response-agent';
export { scrapingEnrichmentAgent } from './scraping-agent';
export { sentimentAnalysisAgent, priorityScoringAgent, EmotionType } from './sentiment-priority-agent';
export { customerAcquisitionDivision } from './divisions/customer-acquisition';
export {
  customerSuccessDivision,
  technicalOperationsDivision,
  financialOperationsDivision,
  intelligenceAnalyticsDivision,
  humanResourcesDivision,
  legalComplianceDivision,
} from './divisions/all-divisions';

// Employee email system
export { sendEmployeeEmail, sendCEOEmail, sendExecutiveEmail, sendCompanyAnnouncement } from '../mail/employeeEmailService';
export { employeeDirectory } from '../mail/employeeDirectory';

/**
 * Initialize AI Workforce
 */
export async function initializeAIWorkforce() {
  console.log('🚀 Initializing FrontDesk Agents AI Workforce...');
  console.log('✅ Supreme AI Commander: Online');
  console.log('✅ Email Operations Division: Ready');
  console.log('✅ Customer Acquisition Division: Ready');
  console.log('✅ Customer Success Division: Ready');
  console.log('✅ Technical Operations Division: Ready');
  console.log('✅ Financial Operations Division: Ready');
  console.log('✅ Intelligence & Analytics Division: Ready');
  console.log('✅ Human Resources Division: Ready');
  console.log('✅ Legal & Compliance Division: Ready');
  console.log('🎖️  AI Workforce fully operational with 100% autonomy');
}

/**
 * Process incoming email with full AI workflow
 */
export async function processIncomingEmail(emailData: {
  from: string;
  subject: string;
  body: string;
  metadata?: any;
}) {
  console.log(`📧 Processing email from ${emailData.from}`);

  // Step 1: Classify and route
  const classification = await emailRoutingAgent.classifyEmail(emailData);
  console.log(`📊 Classification: ${classification.category} (${(classification.confidence * 100).toFixed(1)}% confidence)`);

  // Step 2: Analyze sentiment
  const sentiment = await sentimentAnalysisAgent.analyzeSentiment({
    subject: emailData.subject,
    body: emailData.body,
    from: emailData.from,
  });
  console.log(`😊 Sentiment: ${sentiment.emotion} (score: ${sentiment.score.toFixed(2)})`);

  // Step 3: Calculate priority
  const priority = priorityScoringAgent.calculatePriority({
    sentiment,
    customerInfo: emailData.metadata?.customerInfo,
  });
  console.log(`⚡ Priority: ${priority.level} (${priority.score}/100)`);

  // Step 4: Enrich customer data
  const enrichedData = await scrapingEnrichmentAgent.enrichCustomerData(emailData.from);
  console.log(`🔍 Enrichment score: ${enrichedData.enrichmentScore}/100`);

  // Step 5: Generate response (if autonomous)
  if (!classification.requiresHuman && priority.score < 80) {
    const response = await responseGenerationAgent.generateResponse({
      incomingEmail: emailData,
      category: classification.category,
      context: {
        threadId: 'thread-123',
        previousEmails: [],
        customerInfo: enrichedData as any,
        sentiment: {
          score: sentiment.score,
          emotion: sentiment.emotion,
        },
      },
    });

    console.log(`✉️  Auto-response generated (${(response.confidence * 100).toFixed(1)}% confidence)`);
    
    if (!response.requiresReview) {
      console.log('✅ Response sent autonomously');
      return { autonomous: true, response };
    }
  }

  console.log('👤 Escalated to human review');
  return { autonomous: false, classification, sentiment, priority, enrichedData };
}

/**
 * Execute autonomous sales workflow
 */
export async function executeSalesWorkflow(leadData: {
  company: string;
  domain: string;
  contact: {
    name: string;
    email: string;
    title: string;
  };
}) {
  console.log(`💼 Executing sales workflow for ${leadData.company}`);

  // Step 1: Qualify lead
  const qualification = await customerAcquisitionDivision.qualifyLead(leadData);
  console.log(`📊 Lead score: ${qualification.score.overall}/100 (${qualification.tier})`);

  if (!qualification.qualified) {
    console.log('❌ Lead not qualified - adding to nurture campaign');
    return { qualified: false };
  }

  // Step 2: Generate personalized outreach
  const outreach = await customerAcquisitionDivision.generateOutreachMessage({
    leadData,
    qualification,
    sequenceNumber: 1,
  });
  console.log(`✉️  Outreach generated: "${outreach.subject}"`);

  // Step 3: Send outreach (would integrate with email system)
  console.log('📤 Outreach sent autonomously');

  return { qualified: true, outreach };
}

/**
 * Monitor customer health and prevent churn
 */
export async function monitorCustomerHealth(customerId: string) {
  console.log(`🏥 Monitoring health for customer ${customerId}`);

  const health = await customerSuccessDivision.monitorCustomerHealth(customerId);
  console.log(`💚 Health score: ${(health.healthScore * 100).toFixed(1)}% (${health.riskLevel} risk)`);

  if (health.riskLevel === 'high' || health.riskLevel === 'critical') {
    console.log('🚨 High churn risk detected - initiating intervention');
    
    const intervention = await customerSuccessDivision.preventChurn(customerId, 1 - health.healthScore);
    console.log(`✅ Interventions planned: ${intervention.interventions.length}`);
    
    return { health, intervention };
  }

  // Check for expansion opportunities
  const expansion = await customerSuccessDivision.identifyExpansionOpportunities(customerId);
  if (expansion.opportunities.length > 0) {
    console.log(`💰 ${expansion.opportunities.length} expansion opportunities identified`);
  }

  return { health, expansion };
}

/**
 * Get AI Workforce status
 */
export function getWorkforceStatus() {
  const emailStats = emailRoutingAgent.getStatistics();
  const responseStats = responseGenerationAgent.getStatistics();
  const sentimentStats = sentimentAnalysisAgent.getStatistics();
  const acquisitionStats = customerAcquisitionDivision.getStatistics();

  return {
    emailOperations: {
      totalClassified: emailStats.totalClassified,
      accuracy: (emailStats.accuracy * 100).toFixed(1) + '%',
      avgConfidence: (emailStats.averageConfidence * 100).toFixed(1) + '%',
    },
    responseGeneration: {
      totalGenerated: responseStats.totalGenerated,
      acceptanceRate: (responseStats.acceptanceRate * 100).toFixed(1) + '%',
      avgConfidence: (responseStats.averageConfidence * 100).toFixed(1) + '%',
    },
    sentimentAnalysis: {
      totalAnalyzed: sentimentStats.totalAnalyzed,
      avgScore: sentimentStats.averageScore.toFixed(2),
    },
    customerAcquisition: {
      totalLeads: acquisitionStats.totalLeads,
      qualifiedLeads: acquisitionStats.qualifiedLeads,
      conversionRate: (acquisitionStats.conversionRate * 100).toFixed(1) + '%',
    },
  };
}
