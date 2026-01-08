/**
 * AI Marketplace System
 * Template library, pre-built agents, community sharing
 */

import { supabase } from '@/lib/supabase/client';

export interface MarketplaceItem {
  id: string;
  type: 'agent' | 'workflow' | 'template' | 'integration';
  name: string;
  description: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  rating: number;
  reviewCount: number;
  downloads: number;
  price: number; // 0 for free
  featured: boolean;
  config: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  compatibility: string[];
}

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  industry: string;
  useCase: string;
  personality: string;
  instructions: string;
  knowledgeBase: string[];
  capabilities: string[];
  sampleDialogues: Array<{ user: string; agent: string }>;
  configuration: {
    voice?: string;
    language?: string;
    tone?: string;
    responseStyle?: string;
  };
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  triggers: any[];
  actions: any[];
  conditions: any[];
  variables: Record<string, any>;
}

export interface Review {
  id: string;
  itemId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: Date;
}

export class AIMarketplace {
  private items: Map<string, MarketplaceItem> = new Map();
  private templates: Map<string, AgentTemplate> = new Map();
  private workflowTemplates: Map<string, WorkflowTemplate> = new Map();

  constructor() {
    this.initializeMarketplace();
  }

  /**
   * Initialize marketplace with pre-built items
   */
  private async initializeMarketplace() {
    // Add pre-built agent templates
    this.addAgentTemplates();
    
    // Add workflow templates
    this.addWorkflowTemplates();
    
    // Load items from database
    await this.loadMarketplaceItems();
  }

  /**
   * Add pre-built agent templates
   */
  private addAgentTemplates() {
    const agentTemplates: AgentTemplate[] = [
      {
        id: 'agent_customer_support',
        name: 'Customer Support Agent',
        description: 'Handles customer inquiries, troubleshooting, and support tickets',
        industry: 'General',
        useCase: 'Customer Support',
        personality: 'Friendly, patient, and helpful',
        instructions: 'You are a customer support agent. Help customers with their questions and issues in a friendly and professional manner.',
        knowledgeBase: ['product_documentation', 'faq', 'troubleshooting_guides'],
        capabilities: ['answer_questions', 'create_tickets', 'escalate_issues', 'track_orders'],
        sampleDialogues: [
          {
            user: 'I need help with my order',
            agent: 'I\'d be happy to help you with your order! Could you please provide your order number?',
          },
          {
            user: 'How do I reset my password?',
            agent: 'I can help you reset your password. I\'ll send you a password reset link to your email address.',
          },
        ],
        configuration: {
          voice: 'friendly',
          language: 'en',
          tone: 'professional',
          responseStyle: 'concise',
        },
      },
      {
        id: 'agent_sales',
        name: 'Sales Agent',
        description: 'Qualifies leads, schedules demos, and closes deals',
        industry: 'Sales',
        useCase: 'Lead Qualification',
        personality: 'Enthusiastic, persuasive, and goal-oriented',
        instructions: 'You are a sales agent. Qualify leads, understand their needs, and guide them through the sales process.',
        knowledgeBase: ['product_features', 'pricing', 'case_studies', 'competitor_analysis'],
        capabilities: ['qualify_leads', 'schedule_demos', 'send_proposals', 'follow_up'],
        sampleDialogues: [
          {
            user: 'Tell me about your product',
            agent: 'Great question! Our product helps businesses automate their customer service with AI. What specific challenges are you facing?',
          },
        ],
        configuration: {
          voice: 'confident',
          language: 'en',
          tone: 'enthusiastic',
          responseStyle: 'detailed',
        },
      },
      {
        id: 'agent_appointment',
        name: 'Appointment Scheduler',
        description: 'Books appointments, manages calendars, and sends reminders',
        industry: 'Healthcare',
        useCase: 'Appointment Scheduling',
        personality: 'Organized, efficient, and courteous',
        instructions: 'You are an appointment scheduler. Help customers book, reschedule, or cancel appointments.',
        knowledgeBase: ['availability_calendar', 'booking_policies', 'service_offerings'],
        capabilities: ['check_availability', 'book_appointments', 'send_reminders', 'handle_cancellations'],
        sampleDialogues: [
          {
            user: 'I need to book an appointment',
            agent: 'I\'d be happy to help you book an appointment. What type of service are you looking for?',
          },
        ],
        configuration: {
          voice: 'professional',
          language: 'en',
          tone: 'courteous',
          responseStyle: 'structured',
        },
      },
      {
        id: 'agent_receptionist',
        name: 'Virtual Receptionist',
        description: 'Greets callers, routes calls, and provides information',
        industry: 'General',
        useCase: 'Call Routing',
        personality: 'Welcoming, professional, and efficient',
        instructions: 'You are a virtual receptionist. Greet callers warmly and route them to the appropriate department.',
        knowledgeBase: ['company_directory', 'office_hours', 'common_inquiries'],
        capabilities: ['greet_callers', 'route_calls', 'take_messages', 'provide_information'],
        sampleDialogues: [
          {
            user: 'Hello, I need to speak with someone',
            agent: 'Good morning! Thank you for calling. How may I direct your call today?',
          },
        ],
        configuration: {
          voice: 'warm',
          language: 'en',
          tone: 'professional',
          responseStyle: 'brief',
        },
      },
      {
        id: 'agent_restaurant',
        name: 'Restaurant Reservation Agent',
        description: 'Takes reservations, manages waitlists, and answers menu questions',
        industry: 'Hospitality',
        useCase: 'Restaurant Reservations',
        personality: 'Friendly, accommodating, and knowledgeable',
        instructions: 'You are a restaurant reservation agent. Help guests make reservations and answer questions about the menu.',
        knowledgeBase: ['menu', 'seating_availability', 'special_events', 'dietary_options'],
        capabilities: ['take_reservations', 'manage_waitlist', 'answer_menu_questions', 'handle_special_requests'],
        sampleDialogues: [
          {
            user: 'I\'d like to make a reservation for tonight',
            agent: 'I\'d be delighted to help you with a reservation! For how many guests and what time?',
          },
        ],
        configuration: {
          voice: 'friendly',
          language: 'en',
          tone: 'welcoming',
          responseStyle: 'conversational',
        },
      },
      {
        id: 'agent_ecommerce',
        name: 'E-commerce Assistant',
        description: 'Helps customers find products, track orders, and process returns',
        industry: 'E-commerce',
        useCase: 'Shopping Assistant',
        personality: 'Helpful, knowledgeable, and patient',
        instructions: 'You are an e-commerce assistant. Help customers find products, track orders, and resolve issues.',
        knowledgeBase: ['product_catalog', 'shipping_policies', 'return_policies', 'promotions'],
        capabilities: ['product_search', 'order_tracking', 'process_returns', 'apply_discounts'],
        sampleDialogues: [
          {
            user: 'Where is my order?',
            agent: 'I can help you track your order. Could you please provide your order number?',
          },
        ],
        configuration: {
          voice: 'helpful',
          language: 'en',
          tone: 'friendly',
          responseStyle: 'informative',
        },
      },
      {
        id: 'agent_hr',
        name: 'HR Assistant',
        description: 'Answers HR questions, manages time-off requests, and onboards employees',
        industry: 'Human Resources',
        useCase: 'Employee Support',
        personality: 'Professional, supportive, and confidential',
        instructions: 'You are an HR assistant. Help employees with HR-related questions and processes.',
        knowledgeBase: ['hr_policies', 'benefits', 'time_off_policies', 'onboarding_procedures'],
        capabilities: ['answer_hr_questions', 'process_time_off', 'onboard_employees', 'manage_benefits'],
        sampleDialogues: [
          {
            user: 'How do I request time off?',
            agent: 'I can help you with that. You can submit a time-off request through the employee portal or I can assist you with the process.',
          },
        ],
        configuration: {
          voice: 'professional',
          language: 'en',
          tone: 'supportive',
          responseStyle: 'clear',
        },
      },
      {
        id: 'agent_real_estate',
        name: 'Real Estate Agent',
        description: 'Qualifies buyers, schedules property viewings, and provides market information',
        industry: 'Real Estate',
        useCase: 'Property Inquiries',
        personality: 'Knowledgeable, enthusiastic, and trustworthy',
        instructions: 'You are a real estate agent. Help potential buyers find properties and schedule viewings.',
        knowledgeBase: ['property_listings', 'market_data', 'neighborhood_info', 'financing_options'],
        capabilities: ['search_properties', 'schedule_viewings', 'provide_market_info', 'qualify_buyers'],
        sampleDialogues: [
          {
            user: 'I\'m looking for a 3-bedroom house',
            agent: 'Excellent! I can help you find the perfect home. What\'s your preferred location and budget?',
          },
        ],
        configuration: {
          voice: 'confident',
          language: 'en',
          tone: 'enthusiastic',
          responseStyle: 'detailed',
        },
      },
      {
        id: 'agent_insurance',
        name: 'Insurance Agent',
        description: 'Provides quotes, explains coverage, and processes claims',
        industry: 'Insurance',
        useCase: 'Insurance Inquiries',
        personality: 'Trustworthy, informative, and patient',
        instructions: 'You are an insurance agent. Help customers understand their coverage options and process claims.',
        knowledgeBase: ['insurance_products', 'coverage_details', 'claims_process', 'pricing'],
        capabilities: ['provide_quotes', 'explain_coverage', 'process_claims', 'update_policies'],
        sampleDialogues: [
          {
            user: 'How much would car insurance cost?',
            agent: 'I can help you get a quote. I\'ll need some information about your vehicle and driving history.',
          },
        ],
        configuration: {
          voice: 'trustworthy',
          language: 'en',
          tone: 'informative',
          responseStyle: 'thorough',
        },
      },
      {
        id: 'agent_tech_support',
        name: 'Technical Support Agent',
        description: 'Troubleshoots technical issues and provides IT support',
        industry: 'Technology',
        useCase: 'Technical Support',
        personality: 'Patient, knowledgeable, and solution-oriented',
        instructions: 'You are a technical support agent. Help users troubleshoot and resolve technical issues.',
        knowledgeBase: ['troubleshooting_guides', 'system_requirements', 'known_issues', 'solutions'],
        capabilities: ['diagnose_issues', 'provide_solutions', 'escalate_tickets', 'remote_assistance'],
        sampleDialogues: [
          {
            user: 'My software won\'t start',
            agent: 'I understand how frustrating that can be. Let\'s troubleshoot this together. What error message are you seeing?',
          },
        ],
        configuration: {
          voice: 'patient',
          language: 'en',
          tone: 'helpful',
          responseStyle: 'step-by-step',
        },
      },
    ];

    agentTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  /**
   * Add workflow templates
   */
  private addWorkflowTemplates() {
    const workflowTemplates: WorkflowTemplate[] = [
      {
        id: 'workflow_lead_qualification',
        name: 'Lead Qualification Workflow',
        description: 'Automatically qualify leads and route to sales team',
        category: 'Sales',
        triggers: [
          { type: 'call_ended', conditions: { callType: 'inbound' } },
        ],
        actions: [
          { type: 'extract_data', fields: ['name', 'email', 'company', 'budget'] },
          { type: 'score_lead', criteria: 'budget > 10000' },
          { type: 'create_crm_contact', integration: 'salesforce' },
          { type: 'notify_sales_team', channel: 'slack' },
        ],
        conditions: [
          { if: 'lead_score > 80', then: 'assign_to_senior_rep' },
          { if: 'lead_score > 50', then: 'assign_to_junior_rep' },
          { else: 'add_to_nurture_campaign' },
        ],
        variables: {
          leadScore: 0,
          assignedRep: null,
        },
      },
      {
        id: 'workflow_appointment_confirmation',
        name: 'Appointment Confirmation Workflow',
        description: 'Send confirmation and reminders for appointments',
        category: 'Scheduling',
        triggers: [
          { type: 'appointment_booked' },
        ],
        actions: [
          { type: 'send_email', template: 'appointment_confirmation' },
          { type: 'send_sms', message: 'Your appointment is confirmed' },
          { type: 'schedule_reminder', time: '24_hours_before' },
          { type: 'add_to_calendar', integration: 'google_calendar' },
        ],
        conditions: [],
        variables: {
          appointmentId: null,
          customerEmail: null,
          customerPhone: null,
        },
      },
      {
        id: 'workflow_customer_feedback',
        name: 'Customer Feedback Collection',
        description: 'Automatically collect and analyze customer feedback',
        category: 'Customer Service',
        triggers: [
          { type: 'call_ended', conditions: { duration: '> 60' } },
        ],
        actions: [
          { type: 'send_survey', template: 'nps_survey' },
          { type: 'analyze_sentiment', source: 'call_transcript' },
          { type: 'update_customer_record', field: 'satisfaction_score' },
          { type: 'create_alert', condition: 'score < 3' },
        ],
        conditions: [
          { if: 'score < 3', then: 'notify_manager' },
          { if: 'score >= 4', then: 'request_review' },
        ],
        variables: {
          satisfactionScore: 0,
          sentimentAnalysis: null,
        },
      },
      {
        id: 'workflow_order_processing',
        name: 'Order Processing Workflow',
        description: 'Automate order processing and fulfillment',
        category: 'E-commerce',
        triggers: [
          { type: 'order_placed' },
        ],
        actions: [
          { type: 'validate_payment' },
          { type: 'check_inventory' },
          { type: 'create_shipping_label' },
          { type: 'send_confirmation_email' },
          { type: 'update_inventory' },
        ],
        conditions: [
          { if: 'payment_failed', then: 'notify_customer' },
          { if: 'out_of_stock', then: 'backorder' },
        ],
        variables: {
          orderId: null,
          paymentStatus: null,
          inventoryStatus: null,
        },
      },
      {
        id: 'workflow_escalation',
        name: 'Issue Escalation Workflow',
        description: 'Automatically escalate complex issues to human agents',
        category: 'Customer Service',
        triggers: [
          { type: 'sentiment_negative' },
          { type: 'keyword_detected', keywords: ['manager', 'complaint', 'cancel'] },
        ],
        actions: [
          { type: 'create_ticket', priority: 'high' },
          { type: 'notify_supervisor', channel: 'sms' },
          { type: 'transfer_to_human', department: 'escalations' },
          { type: 'log_incident' },
        ],
        conditions: [],
        variables: {
          ticketId: null,
          escalationReason: null,
        },
      },
    ];

    workflowTemplates.forEach(template => {
      this.workflowTemplates.set(template.id, template);
    });
  }

  /**
   * Load marketplace items from database
   */
  private async loadMarketplaceItems() {
    const { data, error } = await supabase
      .from('marketplace_items')
      .select('*')
      .order('featured', { ascending: false })
      .order('downloads', { ascending: false });

    if (error) {
      console.error('Error loading marketplace items:', error);
      return;
    }

    (data || []).forEach((row: any) => {
      const item: MarketplaceItem = {
        id: row.id,
        type: row.type,
        name: row.name,
        description: row.description,
        category: row.category,
        tags: JSON.parse(row.tags || '[]'),
        author: JSON.parse(row.author || '{}'),
        rating: row.rating,
        reviewCount: row.review_count,
        downloads: row.downloads,
        price: row.price,
        featured: row.featured,
        config: JSON.parse(row.config || '{}'),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        version: row.version,
        compatibility: JSON.parse(row.compatibility || '[]'),
      };
      this.items.set(item.id, item);
    });
  }

  /**
   * Search marketplace items
   */
  async search(query: string, filters?: {
    type?: string;
    category?: string;
    priceRange?: [number, number];
    minRating?: number;
  }): Promise<MarketplaceItem[]> {
    let items = Array.from(this.items.values());

    // Text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Apply filters
    if (filters?.type) {
      items = items.filter(item => item.type === filters.type);
    }
    if (filters?.category) {
      items = items.filter(item => item.category === filters.category);
    }
    if (filters?.priceRange) {
      const [min, max] = filters.priceRange;
      items = items.filter(item => item.price >= min && item.price <= max);
    }
    if (filters?.minRating) {
      items = items.filter(item => item.rating >= filters.minRating);
    }

    return items;
  }

  /**
   * Get featured items
   */
  getFeaturedItems(): MarketplaceItem[] {
    return Array.from(this.items.values())
      .filter(item => item.featured)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 10);
  }

  /**
   * Get popular items
   */
  getPopularItems(limit: number = 10): MarketplaceItem[] {
    return Array.from(this.items.values())
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, limit);
  }

  /**
   * Get item by ID
   */
  getItem(itemId: string): MarketplaceItem | undefined {
    return this.items.get(itemId);
  }

  /**
   * Get agent template
   */
  getAgentTemplate(templateId: string): AgentTemplate | undefined {
    return this.templates.get(templateId);
  }

  /**
   * Get all agent templates
   */
  getAllAgentTemplates(): AgentTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get workflow template
   */
  getWorkflowTemplate(templateId: string): WorkflowTemplate | undefined {
    return this.workflowTemplates.get(templateId);
  }

  /**
   * Get all workflow templates
   */
  getAllWorkflowTemplates(): WorkflowTemplate[] {
    return Array.from(this.workflowTemplates.values());
  }

  /**
   * Install marketplace item
   */
  async install(customerId: string, itemId: string): Promise<void> {
    const item = this.items.get(itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    // Record installation
    await supabase.from('marketplace_installations').insert({
      customer_id: customerId,
      item_id: itemId,
      installed_at: new Date().toISOString(),
    });

    // Increment download count
    item.downloads++;
    this.items.set(itemId, item);

    await supabase
      .from('marketplace_items')
      .update({ downloads: item.downloads })
      .eq('id', itemId);
  }

  /**
   * Publish item to marketplace
   */
  async publish(customerId: string, item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'updatedAt' | 'downloads' | 'reviewCount' | 'rating'>): Promise<MarketplaceItem> {
    const newItem: MarketplaceItem = {
      id: `item_${Date.now()}`,
      ...item,
      downloads: 0,
      reviewCount: 0,
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.set(newItem.id, newItem);

    await supabase.from('marketplace_items').insert({
      id: newItem.id,
      type: newItem.type,
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      tags: JSON.stringify(newItem.tags),
      author: JSON.stringify(newItem.author),
      rating: 0,
      review_count: 0,
      downloads: 0,
      price: newItem.price,
      featured: newItem.featured,
      config: JSON.stringify(newItem.config),
      version: newItem.version,
      compatibility: JSON.stringify(newItem.compatibility),
      created_at: newItem.createdAt.toISOString(),
      updated_at: newItem.updatedAt.toISOString(),
    });

    return newItem;
  }

  /**
   * Submit review
   */
  async submitReview(itemId: string, userId: string, userName: string, rating: number, comment: string): Promise<Review> {
    const review: Review = {
      id: `review_${Date.now()}`,
      itemId,
      userId,
      userName,
      rating,
      comment,
      helpful: 0,
      createdAt: new Date(),
    };

    await supabase.from('marketplace_reviews').insert({
      id: review.id,
      item_id: itemId,
      user_id: userId,
      user_name: userName,
      rating,
      comment,
      helpful: 0,
      created_at: review.createdAt.toISOString(),
    });

    // Update item rating
    await this.updateItemRating(itemId);

    return review;
  }

  /**
   * Get reviews for item
   */
  async getReviews(itemId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('marketplace_reviews')
      .select('*')
      .eq('item_id', itemId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((row: any) => ({
      id: row.id,
      itemId: row.item_id,
      userId: row.user_id,
      userName: row.user_name,
      rating: row.rating,
      comment: row.comment,
      helpful: row.helpful,
      createdAt: new Date(row.created_at),
    }));
  }

  /**
   * Update item rating
   */
  private async updateItemRating(itemId: string) {
    const reviews = await this.getReviews(itemId);
    if (reviews.length === 0) return;

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const item = this.items.get(itemId);
    
    if (item) {
      item.rating = avgRating;
      item.reviewCount = reviews.length;
      this.items.set(itemId, item);

      await supabase
        .from('marketplace_items')
        .update({ rating: avgRating, review_count: reviews.length })
        .eq('id', itemId);
    }
  }

  /**
   * Get categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    this.items.forEach(item => categories.add(item.category));
    return Array.from(categories).sort();
  }

  /**
   * Get installed items for customer
   */
  async getInstalledItems(customerId: string): Promise<MarketplaceItem[]> {
    const { data, error } = await supabase
      .from('marketplace_installations')
      .select('item_id')
      .eq('customer_id', customerId);

    if (error) throw error;

    const itemIds = (data || []).map((row: any) => row.item_id);
    return itemIds.map(id => this.items.get(id)).filter(Boolean) as MarketplaceItem[];
  }
}

export const aiMarketplace = new AIMarketplace();
