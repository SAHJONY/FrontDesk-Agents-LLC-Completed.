/**
 * Employee Directory and Contact Management System
 * Centralized system for managing employee information and contact details
 */

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  department: string;
  team?: string;
  manager?: string;
  phone?: string;
  location?: string;
  startDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  accessLevel: 'executive' | 'department_head' | 'manager' | 'employee';
  distributionLists: string[];
}

export interface Department {
  id: string;
  name: string;
  email: string;
  head: string;
  vp?: string;
  description: string;
  teams: string[];
}

export interface DistributionList {
  id: string;
  name: string;
  email: string;
  description: string;
  members: string[];
  type: 'company' | 'department' | 'team' | 'cross_functional';
}

/**
 * Employee Directory Service
 */
export class EmployeeDirectoryService {
  private employees: Map<string, Employee> = new Map();
  private departments: Map<string, Department> = new Map();
  private distributionLists: Map<string, DistributionList> = new Map();

  constructor() {
    this.initializeDirectory();
  }

  /**
   * Initialize directory with default structure
   */
  private initializeDirectory(): void {
    // Initialize departments
    this.initializeDepartments();
    
    // Initialize distribution lists
    this.initializeDistributionLists();
  }

  /**
   * Initialize company departments
   */
  private initializeDepartments(): void {
    const departments: Department[] = [
      {
        id: 'sales',
        name: 'Sales',
        email: 'sales@frontdeskagents.com',
        head: 'director.sales@frontdeskagents.com',
        vp: 'vp.sales@frontdeskagents.com',
        description: 'Revenue generation and customer acquisition',
        teams: ['Enterprise Sales', 'SMB Sales', 'Inside Sales'],
      },
      {
        id: 'engineering',
        name: 'Engineering',
        email: 'engineering@frontdeskagents.com',
        head: 'director.engineering@frontdeskagents.com',
        vp: 'vp.engineering@frontdeskagents.com',
        description: 'Product development and technical infrastructure',
        teams: ['Backend', 'Frontend', 'AI/ML', 'DevOps', 'QA'],
      },
      {
        id: 'product',
        name: 'Product',
        email: 'product@frontdeskagents.com',
        head: 'director.product@frontdeskagents.com',
        vp: 'vp.product@frontdeskagents.com',
        description: 'Product strategy and user experience',
        teams: ['Product Management', 'Product Design', 'UX Research'],
      },
      {
        id: 'marketing',
        name: 'Marketing',
        email: 'marketing@frontdeskagents.com',
        head: 'director.marketing@frontdeskagents.com',
        vp: 'vp.marketing@frontdeskagents.com',
        description: 'Brand awareness and demand generation',
        teams: ['Content', 'Social Media', 'SEO', 'Paid Ads', 'Events'],
      },
      {
        id: 'support',
        name: 'Support',
        email: 'support@frontdeskagents.com',
        head: 'director.support@frontdeskagents.com',
        vp: 'vp.support@frontdeskagents.com',
        description: 'Customer technical support',
        teams: ['Technical Support', 'Support Operations', 'Escalations'],
      },
      {
        id: 'customer_success',
        name: 'Customer Success',
        email: 'success@frontdeskagents.com',
        head: 'director.customersuccess@frontdeskagents.com',
        vp: 'vp.customersuccess@frontdeskagents.com',
        description: 'Customer retention and growth',
        teams: ['Customer Success Management', 'Onboarding', 'Training'],
      },
      {
        id: 'finance',
        name: 'Finance',
        email: 'finance@frontdeskagents.com',
        head: 'controller@frontdeskagents.com',
        vp: 'vp.finance@frontdeskagents.com',
        description: 'Financial planning and accounting',
        teams: ['Accounting', 'Billing', 'Payroll', 'FP&A'],
      },
      {
        id: 'hr',
        name: 'Human Resources',
        email: 'hr@frontdeskagents.com',
        head: 'director.hr@frontdeskagents.com',
        vp: 'vp.hr@frontdeskagents.com',
        description: 'People operations and talent management',
        teams: ['Recruiting', 'Benefits', 'Training', 'People Ops'],
      },
    ];

    departments.forEach(dept => this.departments.set(dept.id, dept));
  }

  /**
   * Initialize distribution lists
   */
  private initializeDistributionLists(): void {
    const lists: DistributionList[] = [
      {
        id: 'all',
        name: 'All Employees',
        email: 'all@frontdeskagents.com',
        description: 'All company employees',
        members: [],
        type: 'company',
      },
      {
        id: 'leadership',
        name: 'Leadership Team',
        email: 'leadership@frontdeskagents.com',
        description: 'C-suite executives and VPs',
        members: [],
        type: 'company',
      },
      {
        id: 'managers',
        name: 'All Managers',
        email: 'managers@frontdeskagents.com',
        description: 'All people managers',
        members: [],
        type: 'company',
      },
      {
        id: 'sales_team',
        name: 'Sales Team',
        email: 'sales-team@frontdeskagents.com',
        description: 'All sales department members',
        members: [],
        type: 'department',
      },
      {
        id: 'engineering_team',
        name: 'Engineering Team',
        email: 'engineering-team@frontdeskagents.com',
        description: 'All engineering department members',
        members: [],
        type: 'department',
      },
      {
        id: 'product_team',
        name: 'Product Team',
        email: 'product-team@frontdeskagents.com',
        description: 'All product department members',
        members: [],
        type: 'department',
      },
      {
        id: 'marketing_team',
        name: 'Marketing Team',
        email: 'marketing-team@frontdeskagents.com',
        description: 'All marketing department members',
        members: [],
        type: 'department',
      },
      {
        id: 'support_team',
        name: 'Support Team',
        email: 'support-team@frontdeskagents.com',
        description: 'All support department members',
        members: [],
        type: 'department',
      },
      {
        id: 'go_to_market',
        name: 'Go-to-Market Team',
        email: 'go-to-market@frontdeskagents.com',
        description: 'Sales, marketing, and customer success',
        members: [],
        type: 'cross_functional',
      },
      {
        id: 'product_council',
        name: 'Product Council',
        email: 'product-council@frontdeskagents.com',
        description: 'Product decision makers',
        members: [],
        type: 'cross_functional',
      },
      {
        id: 'tech_leads',
        name: 'Tech Leads',
        email: 'tech-leads@frontdeskagents.com',
        description: 'Technical leadership',
        members: [],
        type: 'cross_functional',
      },
    ];

    lists.forEach(list => this.distributionLists.set(list.id, list));
  }

  /**
   * Add employee to directory
   */
  addEmployee(employee: Employee): void {
    this.employees.set(employee.id, employee);
    
    // Add to distribution lists
    this.addToDistributionLists(employee);
  }

  /**
   * Add employee to appropriate distribution lists
   */
  private addToDistributionLists(employee: Employee): void {
    // Add to all employees list
    this.addToList('all', employee.email);

    // Add to leadership if executive or department head
    if (employee.accessLevel === 'executive' || employee.accessLevel === 'department_head') {
      this.addToList('leadership', employee.email);
    }

    // Add to managers if manager or above
    if (['executive', 'department_head', 'manager'].includes(employee.accessLevel)) {
      this.addToList('managers', employee.email);
    }

    // Add to department list
    const deptListId = `${employee.department.toLowerCase().replace(/\s+/g, '_')}_team`;
    if (this.distributionLists.has(deptListId)) {
      this.addToList(deptListId, employee.email);
    }

    // Add to custom distribution lists
    employee.distributionLists.forEach(listId => {
      this.addToList(listId, employee.email);
    });
  }

  /**
   * Add member to distribution list
   */
  private addToList(listId: string, email: string): void {
    const list = this.distributionLists.get(listId);
    if (list && !list.members.includes(email)) {
      list.members.push(email);
    }
  }

  /**
   * Remove employee from directory
   */
  removeEmployee(employeeId: string): void {
    const employee = this.employees.get(employeeId);
    if (employee) {
      // Remove from all distribution lists
      this.distributionLists.forEach(list => {
        list.members = list.members.filter(email => email !== employee.email);
      });
      
      // Mark as inactive instead of deleting
      employee.status = 'inactive';
    }
  }

  /**
   * Update employee information
   */
  updateEmployee(employeeId: string, updates: Partial<Employee>): void {
    const employee = this.employees.get(employeeId);
    if (employee) {
      Object.assign(employee, updates);
      
      // Update distribution lists if department or access level changed
      if (updates.department || updates.accessLevel) {
        this.removeFromAllLists(employee.email);
        this.addToDistributionLists(employee);
      }
    }
  }

  /**
   * Remove employee from all distribution lists
   */
  private removeFromAllLists(email: string): void {
    this.distributionLists.forEach(list => {
      list.members = list.members.filter(member => member !== email);
    });
  }

  /**
   * Get employee by ID
   */
  getEmployee(employeeId: string): Employee | undefined {
    return this.employees.get(employeeId);
  }

  /**
   * Get employee by email
   */
  getEmployeeByEmail(email: string): Employee | undefined {
    return Array.from(this.employees.values()).find(emp => emp.email === email);
  }

  /**
   * Get all employees in department
   */
  getEmployeesByDepartment(department: string): Employee[] {
    return Array.from(this.employees.values()).filter(
      emp => emp.department === department && emp.status === 'active'
    );
  }

  /**
   * Get all employees in team
   */
  getEmployeesByTeam(team: string): Employee[] {
    return Array.from(this.employees.values()).filter(
      emp => emp.team === team && emp.status === 'active'
    );
  }

  /**
   * Get all employees reporting to manager
   */
  getDirectReports(managerEmail: string): Employee[] {
    return Array.from(this.employees.values()).filter(
      emp => emp.manager === managerEmail && emp.status === 'active'
    );
  }

  /**
   * Get department information
   */
  getDepartment(departmentId: string): Department | undefined {
    return this.departments.get(departmentId);
  }

  /**
   * Get all departments
   */
  getAllDepartments(): Department[] {
    return Array.from(this.departments.values());
  }

  /**
   * Get distribution list
   */
  getDistributionList(listId: string): DistributionList | undefined {
    return this.distributionLists.get(listId);
  }

  /**
   * Get all distribution lists
   */
  getAllDistributionLists(): DistributionList[] {
    return Array.from(this.distributionLists.values());
  }

  /**
   * Get distribution list members
   */
  getDistributionListMembers(listId: string): string[] {
    const list = this.distributionLists.get(listId);
    return list ? list.members : [];
  }

  /**
   * Search employees
   */
  searchEmployees(query: string): Employee[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.employees.values()).filter(emp => {
      return (
        emp.status === 'active' &&
        (emp.firstName.toLowerCase().includes(lowerQuery) ||
          emp.lastName.toLowerCase().includes(lowerQuery) ||
          emp.email.toLowerCase().includes(lowerQuery) ||
          emp.title.toLowerCase().includes(lowerQuery) ||
          emp.department.toLowerCase().includes(lowerQuery))
      );
    });
  }

  /**
   * Get employee count by department
   */
  getEmployeeCountByDepartment(): Map<string, number> {
    const counts = new Map<string, number>();
    this.employees.forEach(emp => {
      if (emp.status === 'active') {
        const count = counts.get(emp.department) || 0;
        counts.set(emp.department, count + 1);
      }
    });
    return counts;
  }

  /**
   * Get total active employees
   */
  getTotalActiveEmployees(): number {
    return Array.from(this.employees.values()).filter(emp => emp.status === 'active').length;
  }

  /**
   * Export directory to JSON
   */
  exportDirectory(): {
    employees: Employee[];
    departments: Department[];
    distributionLists: DistributionList[];
  } {
    return {
      employees: Array.from(this.employees.values()),
      departments: Array.from(this.departments.values()),
      distributionLists: Array.from(this.distributionLists.values()),
    };
  }

  /**
   * Import directory from JSON
   */
  importDirectory(data: {
    employees?: Employee[];
    departments?: Department[];
    distributionLists?: DistributionList[];
  }): void {
    if (data.employees) {
      data.employees.forEach(emp => this.employees.set(emp.id, emp));
    }
    if (data.departments) {
      data.departments.forEach(dept => this.departments.set(dept.id, dept));
    }
    if (data.distributionLists) {
      data.distributionLists.forEach(list => this.distributionLists.set(list.id, list));
    }
  }
}

// Singleton instance
export const employeeDirectory = new EmployeeDirectoryService();
