/**
 * CRM-lite Module
 * Lead capture, pipeline management, notes, tasks, and source attribution
 */

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  source: 'web' | 'call' | 'sms' | 'email' | 'referral' | 'other';
  sourceDetails?: string;
  stage: 'new' | 'contacted' | 'qualified' | 'booked' | 'won' | 'lost';
  score: number; // 0-100
  tags: string[];
  notes: Note[];
  tasks: Task[];
  customFields?: Record<string, any>;
  assignedTo?: string; // userId
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
}

export interface Note {
  id: string;
  leadId: string;
  content: string;
  createdBy: string; // userId or 'ai'
  createdAt: Date;
}

export interface Task {
  id: string;
  leadId: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
  assignedTo: string; // userId
  createdBy: string; // userId
  createdAt: Date;
}

export interface LeadScoringRule {
  id: string;
  name: string;
  condition: {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
  };
  scoreChange: number; // positive or negative
  active: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  createdAt: Date;
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  probability: number; // 0-100 (chance of closing)
  color: string;
}

export class CRMService {
  private scoringRules: LeadScoringRule[] = [];

  /**
   * Create a new lead
   */
  async createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'notes' | 'tasks'>): Promise<Lead> {
    const lead: Lead = {
      ...leadData,
      id: this.generateLeadId(),
      notes: [],
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Calculate initial lead score
    lead.score = await this.calculateLeadScore(lead);

    // TODO: Save to database
    // TODO: Trigger lead capture webhook
    // TODO: Send notification to assigned user

    return lead;
  }

  /**
   * Update lead information
   */
  async updateLead(leadId: string, updates: Partial<Lead>): Promise<Lead> {
    // TODO: Get existing lead from database
    // TODO: Apply updates
    // TODO: Recalculate score if relevant fields changed
    // TODO: Save to database
    // TODO: Trigger update webhook

    throw new Error('Not implemented');
  }

  /**
   * Move lead to a different stage
   */
  async moveLeadToStage(leadId: string, newStage: Lead['stage']): Promise<Lead> {
    // TODO: Get existing lead
    // TODO: Update stage
    // TODO: Log stage change in notes
    // TODO: Trigger stage change webhook
    // TODO: Update lastContactedAt if moving to 'contacted'

    throw new Error('Not implemented');
  }

  /**
   * Add note to lead
   */
  async addNote(leadId: string, content: string, createdBy: string): Promise<Note> {
    const note: Note = {
      id: this.generateNoteId(),
      leadId,
      content,
      createdBy,
      createdAt: new Date(),
    };

    // TODO: Save note to database
    // TODO: Update lead.lastContactedAt if note is from human

    return note;
  }

  /**
   * Add task for lead
   */
  async addTask(taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>): Promise<Task> {
    const task: Task = {
      ...taskData,
      id: this.generateTaskId(),
      completed: false,
      createdAt: new Date(),
    };

    // TODO: Save task to database
    // TODO: Send notification to assignedTo user

    return task;
  }

  /**
   * Complete a task
   */
  async completeTask(taskId: string): Promise<Task> {
    // TODO: Get task from database
    // TODO: Mark as completed
    // TODO: Set completedAt timestamp
    // TODO: Save to database

    throw new Error('Not implemented');
  }

  /**
   * Calculate lead score based on rules
   */
  async calculateLeadScore(lead: Lead): Promise<number> {
    let score = 50; // Base score

    // Apply scoring rules
    for (const rule of this.scoringRules.filter(r => r.active)) {
      const fieldValue = (lead as any)[rule.condition.field];
      let matches = false;

      switch (rule.condition.operator) {
        case 'equals':
          matches = fieldValue === rule.condition.value;
          break;
        case 'contains':
          matches = String(fieldValue).toLowerCase().includes(String(rule.condition.value).toLowerCase());
          break;
        case 'greater_than':
          matches = Number(fieldValue) > Number(rule.condition.value);
          break;
        case 'less_than':
          matches = Number(fieldValue) < Number(rule.condition.value);
          break;
      }

      if (matches) {
        score += rule.scoreChange;
      }
    }

    // Ensure score is within 0-100 range
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get leads with filters
   */
  async getLeads(filters?: {
    stage?: Lead['stage'];
    source?: Lead['source'];
    assignedTo?: string;
    tags?: string[];
    minScore?: number;
    maxScore?: number;
  }): Promise<Lead[]> {
    // TODO: Query database with filters
    // TODO: Apply sorting (by score, createdAt, etc.)
    return [];
  }

  /**
   * Search leads by name, email, or phone
   */
  async searchLeads(query: string): Promise<Lead[]> {
    // TODO: Full-text search in database
    return [];
  }

  /**
   * Get lead by ID
   */
  async getLeadById(leadId: string): Promise<Lead | null> {
    // TODO: Query database
    return null;
  }

  /**
   * Get lead activity timeline
   */
  async getLeadTimeline(leadId: string): Promise<Array<{
    type: 'note' | 'task' | 'stage_change' | 'call' | 'sms' | 'email';
    timestamp: Date;
    description: string;
    createdBy?: string;
  }>> {
    // TODO: Aggregate all activities for this lead
    return [];
  }

  /**
   * Export leads to CSV
   */
  async exportLeadsToCSV(filters?: any): Promise<string> {
    const leads = await this.getLeads(filters);
    
    // CSV header
    let csv = 'ID,First Name,Last Name,Email,Phone,Company,Source,Stage,Score,Tags,Created At\n';

    // CSV rows
    for (const lead of leads) {
      csv += [
        lead.id,
        lead.firstName,
        lead.lastName,
        lead.email,
        lead.phone,
        lead.company || '',
        lead.source,
        lead.stage,
        lead.score,
        lead.tags.join(';'),
        lead.createdAt.toISOString(),
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',') + '\n';
    }

    return csv;
  }

  /**
   * Import leads from CSV
   */
  async importLeadsFromCSV(csvContent: string): Promise<{
    imported: number;
    failed: number;
    errors: string[];
  }> {
    // TODO: Parse CSV
    // TODO: Validate each row
    // TODO: Create leads
    // TODO: Return import results

    throw new Error('Not implemented');
  }

  /**
   * Get pipeline statistics
   */
  async getPipelineStats(): Promise<{
    totalLeads: number;
    byStage: Record<Lead['stage'], number>;
    bySource: Record<Lead['source'], number>;
    averageScore: number;
    conversionRate: number;
  }> {
    // TODO: Aggregate statistics from database
    return {
      totalLeads: 0,
      byStage: {
        new: 0,
        contacted: 0,
        qualified: 0,
        booked: 0,
        won: 0,
        lost: 0,
      },
      bySource: {
        web: 0,
        call: 0,
        sms: 0,
        email: 0,
        referral: 0,
        other: 0,
      },
      averageScore: 0,
      conversionRate: 0,
    };
  }

  /**
   * Add or update lead scoring rule
   */
  async addScoringRule(rule: Omit<LeadScoringRule, 'id'>): Promise<LeadScoringRule> {
    const scoringRule: LeadScoringRule = {
      ...rule,
      id: this.generateRuleId(),
    };

    this.scoringRules.push(scoringRule);

    // TODO: Save to database
    // TODO: Recalculate scores for all existing leads

    return scoringRule;
  }

  /**
   * Generate unique IDs
   */
  private generateLeadId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateNoteId(): string {
    return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTaskId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateRuleId(): string {
    return `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default CRMService;
