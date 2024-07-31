import { TicketTableType } from "../types/types";

export const defaultData: TicketTableType[] = [
  {
    ticket_ID: "123455",
    customer_name: "Raam A",
    company: "Company Name",
    phone_number: "3093578590",
    subject: "Feedback issue",
    agent: "Assigned agent",
    issue: "Problem on the Agent stop talking around 1:20 and end the call",
    reported_at: "24-11-23 \ 8:00am",
    reported_time: "8:00 am",
    details: "Details",
  },
];

export const TicketActionOptions = [
  {
    id: 1,
    title: "Open",
    value: "open",
  },
  {
    id: 2,
    title: "In progress",
    value: "in_progress",
  },
  {
    id: 3,
    title: "Resolved",
    value: "resolved",
  },
  {
    id: 4,
    title: "Closed",
    value: "closed",
  },
  {
    id: 5,
    title: "Pending",
    value: "pending",
  },
  {
    id: 6,
    title: "Technical support",
    value: "technical_support",
  },
  {
    id: 7,
    title: "Billing",
    value: "billing",
  },
  {
    id: 8,
    title: "Escalate to management",
    value: "escalate_to_management",
  },
]

export const TicketHeaderData = [
  {
    id: 1,
    title: "All",
    value: 47,
  },
  {
    id: 2,
    title: "Open",
    value: 8,
  },
  {
    id: 3,
    title: "Closed",
    value: 4,
  },
  {
    id: 4,
    title: "Re-opened",
    value: 12,
  },
  {
    id: 5,
    title: "Escalated",
    value: 5,
  },
  {
    id: 6,
    title: "Pending",
    value: 3,
  },
  {
    id: 7,
    title: "Technical",
    value: 6,
  },
  {
    id: 8,
    title: "Billing",
    value: 9,
  },
]

export const ticketStatusList = [
  "Open",
  "In progress",
  "Resolved",
  "Closed",
  "Pending",
  "Technical support",
  "Billing",
  "Escalate to management",
]