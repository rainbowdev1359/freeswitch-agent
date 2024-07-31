interface agentType {
  profile: string;
  name: string;
  rateTime?: number;
  minutesTalked: string;
  completedLeads: string;
  incomingCalls: CallType[];
  finishedCalls: callType[];
  totalIncomingCalls: string;
  totalFinishedCalls: string;
  date: string;
  time: string;
  client1: number;
  client2: number;
  id: number;
  policies: string;
  rules: string;
}
interface AgentProfile {
  profile: string;
  name: string;
  rateTime?: number;
  minutesTalked: string;
  completedLeads: string;
  incomingCalls: CallType[];
  finishedCalls: callType[];
  totalIncomingCalls: string;
  totalFinishedCalls: string;
  date: string;
  time: string;
  client1: number;
  client2: number;
  id: number;
}

export interface callType {
  month: number;
  numberOfCall: number;
}
interface callPart {
  name: string;
}
interface agentCalls {
  name: string;
  minutesTalked: string;
  receivedCalls: string;
  missedCalls: string;
  message: string;
  time: string;
  client1: number;
  client2: number;
  id: number;
  info: Array;
}

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}
interface RowSelection {
  [key: string]: boolean;
}
interface RecordingTableType {
  contact: string;
  number: string;
  campaign: string;
  call: string;
  Date: string;
  duration: string;
  outcome: string;
  id?: string;
}
interface ContactTableType {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  companyName: string;
  campaign: string;
  list: string;
  addedDate: string;
}
interface ListTableType {
  id: string;
  listName: string;
  assignedAgent: string;
  company: string;
  followUp: number;
  notInterested: number;
  closed: number;
  notAnswered: number;
  invalidNumbers: number;
  dateCreated: string;
}

interface TicketTableType {
  ticket_ID: string;
  customer_name: string;
  company: string;
  phone_number: string;
  subject: string;
  agent: string;
  issue: string;
  reported_at: string;
  reported_time: string;
  details: string;
}

interface CallTableType {
  agentName: string;
  contact: string;
  campaign: string;
  call: string;
  created_at: string;
  initiatedTime: string;
  corrected_duration: string;
  outcome: string;
  id?: string;
  agent__info: Array;
  inbound: boolean;
  variables: object;
  transcripts: object;
  call_status: string;
}

interface SuperAdminTableType {
  companyName: string;
  adminName: string;
  email: string;
  licenseName: string;
  registeredTime: string;
  usedDays: number;
  serversRunning: number;
  lastLoginDate: string;
}

interface EditMinutePriceTableType {
  code: number;
  destination: string;
  increments: number;
  cost_per_minute: number;
  connect_charge: number;
  additional_cost: number;
  tts_cost_min: number;
  engine_cost_min: number;
  total_cost_min: number;
  margins_percent: number;
  margins_cost: number;
  sale_price: number;
  vip_price: number;
}

interface LicenseMinutePriceTableType {
  code: number;
  destination: string;
  cost_min: number;
  essential_launchpad: number;
  professional_expansion: number;
  advanced_engagement: number;
  elite_performance: number;
}

interface EditPackType {
  description: string;
  starter: string;
  professional: string;
  enterprise: string;
  ultimate: string;
}

interface BuySpaceType {
  description: string;
  starter: string;
  silver: string;
  gold: string;
  platinum: string;
}

interface AgentRateType {
  amount: number;
  line_cost: number;
  engine_cost: number;
  total_cost: number;
  margins: number;
  sale_agent: number;
  vip_price: number;
}

interface AgentType {
  id: number;
  name: string;
}

interface CampaignTableType {
  type: string;
  name: string;
  costOutcome: number;
  outcome: string;
  id?: string;
  budget: number;
  agents: AgentType[];
  dials: number;
  pickups: number;
  failed: number;
  busy: number;
  amount_spent: number;
  list: string;
}
interface CompanyTableType {
  emailAddress: string;
  companyName: string;
  costOutcome: number;
  outcome: string;
  id?: string;
  phoneNumber: string;
  registeredTime: string;
  dials: number;
  pickups: number;
  failed: number;
  busy: number;
  amountspent: number;
  registeredTime: string;
}

interface contactType {
  columnName: string;
  example: string;
  list: string;
  description: string;
}

interface contactEditType {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  company_address: string;
  customer_ID: string;
  comment: string;
}
interface CallStep {
  name: string;
  color: string;
  active: boolean;
  value: number;
}

export interface HomeDataType {
  id: number;
  name: string;
  contact: string;
  averageTime: string;
  followUp: string;
  closing: string;
  callSteps: CallStep[];
}

interface notificationType {
  id: number;
  message: string;
  isRead: boolean;
  isDelete: boolean;
  time: string;
}

interface PaymentMethodType {
  id: string;
  type: string;
  name: string;
  number: string;
  expiry: string;
}

interface BillingHistoryType {
  id: string;
  name: string;
  companyName: string;
  service: string;
  date: string;
  email: string;
  phone: string;
  amount: string;
  status: string;
}

interface TeamMemberType {
  id: number;
  username: string;
  email: string;
  date_joined: string;
  profile: {
    phone_number: string;
    group_id: number | null
  }
}

interface SuperRoleTableType {
  action_section: string;
  sub_category: string;
  super_admin: boolean;
  admin: boolean;
  technical_support: boolean;
  customer_support: boolean;
  billing_support: boolean;
  marketing_branding: boolean;
  representative: boolean;
  representative_assistance: boolean;
  id: number;
}
