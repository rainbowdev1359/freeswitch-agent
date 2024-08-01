import { agentCalls, agentType } from "../types/types";
export const createAgentOptions = [
  {
    title: "Create a new Agent",
    options: [
      {
        id: 1,
        title: "Sales",
        desc: "Ideal for clients aiming to boost their sales efforts. Our agents specialize in proactively reaching out to potential customers and handling incoming inquiries about products and services.",
        label: "Sales",
        value: "Sales",
      },
      // {
      //   id: 2,
      //   title: "Customer service",
      //   desc: "Perfect for clients needing support for their customers. This option involves managing both inbound issues and outbound follow-ups to ensure customer satisfaction and resolve any service-related concerns.",
      //   label: "customerService",
      //   value: "cservice",
      // },
      // {
      //   id: 3,
      //   title: "Secretary",
      //   desc: "Suitable for clients requiring assistance with administrative tasks. Our agents can manage appointments, handle call routing, and provide general information, acting as the first point of contact for your business.",
      //   label: "secretary",
      //   value: "secretary",
      // },
      {
        id: 4,
        title: "Feedback Collection Agent",
        desc: "For clients focused on improving their products or services through customer insights. These agents are trained to gather detailed customer feedback through outbound calls and manage inbound feedback queries.",
        label: "fca",
        value: "fca",
      },
      // {
      //   id: 5,
      //   title: "Institutional Agent",
      //   desc: "Best for clients dealing with institutional, educational, or corporate partners. These agents are equipped to handle formal inquiries, provide detailed information, and facilitate communication between organizations.",
      //   label: "iagent",
      //   value: "iagent",
      // },
      // {
      //   id: 6,
      //   title: "Custom",
      //   desc: "No training whatsoever has been made for this mode, it is a blank canvas.",
      //   label: "iagent",
      //   value: "iagent",
      // }
    ],
    btntext: "Create agent"
  },
  {
    title: "Choose your editing mode",
    options: [
      {
        id: 1,
        title: "Standard (Recommended)",
        desc: "The Standard mode facilitates a swifter and more streamlined launch of Epic Caller, necessitating minimal time and technical proficiency. It stands as the preferred option for the vast majority of our clientele. In instances of uncertainty regarding selection, opting for this mode is advisable.",
        label: "standard",
        value: "standard",
      },
      {
        id: 2,
        title: "Advanced",
        desc: "The Advanced mode empowers users to modify Epic Caller's core prompt and model, catering specifically to individuals possessing a heightened technical acumen and a desire to delve into more intricate testing procedures. It is exclusively recommended for those with prior experience in prompt manipulation.",
        label: "advanced",
        value: "advanced",
      }
    ],
    btntext: "Choose selected method"
  },
  {
    title: "What's your preferred method for crafting your agent's script?",
    options: [
      {
        id: 1,
        title: "AI assisted creation",
        desc: "Let the power of AI craft your script effortlessly. Simply upload a call recording, enter an existing script, or respond to a few questions from Epic Caller to provide context, and watch as your script is generated as if by magic.",
        label: "ai",
        value: "ai",
      },
      {
        id: 2,
        title: "Manual creation",
        desc: "Begin with a clean slate and construct your script manually from the ground up.",
        label: "manual",
        value: "manual",
      },
      {
        id: 3,
        title: "Professional Assistance from Epic Caller Management",
        desc: "Seek the expertise of Epic Caller Management team for personalized, professional guidance in script development. Perfect for those looking for a tailored approach and expert input.",
        label: "assistance",
        value: "assistance",
      }
    ],
    btntext: "Choose selected method"
  }]

export const agentLists: agentType[] = [
  {
    profile: "/agents/agent01.png",
    name: "Brianna",
    minutesTalked: "00:40:01",
    completedLeads: "64/100",
    rateTime: 3.5,
    incomingCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    finishedCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    totalIncomingCalls: "250",
    totalFinishedCalls: "3000",
    date: "2024-04-12",
    time: "4",
    client1: 21,
    client2: 24,
    id: 1,
  },
  {
    profile: "/agents/agent02.png",
    name: "Carl",
    minutesTalked: "00:40:01",
    completedLeads: "65/100",
    rateTime: 6.6,
    incomingCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    finishedCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    totalIncomingCalls: "250",
    totalFinishedCalls: "3000",
    date: "2024-04-17",
    time: "7",
    client1: 21,
    client2: 24,
    id: 2,
  },
  {
    profile: "/agents/agent03.png",
    name: "Sandra",
    minutesTalked: "00:40:01",
    completedLeads: "66/100",
    rateTime: 2.8,
    incomingCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    finishedCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    totalIncomingCalls: "250",
    totalFinishedCalls: "3000",
    date: "2024-03-28",
    time: "3",
    client1: 21,
    client2: 24,
    id: 3,
  },
  {
    profile: "/agents/agent04.png",
    name: "Jossie",
    minutesTalked: "00:40:01",
    completedLeads: "67/100",
    rateTime: 7.8,
    incomingCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    finishedCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    totalIncomingCalls: "250",
    totalFinishedCalls: "3000",
    date: "2024-04-20",
    time: "8",
    client1: 21,
    client2: 24,
    id: 4,
  },
  {
    profile: "/agents/agent05.png",
    name: "Jess",
    minutesTalked: "00:40:01",
    completedLeads: "67/100",
    rateTime: 7.8,
    incomingCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    finishedCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    totalIncomingCalls: "250",
    totalFinishedCalls: "3000",
    date: "2024-04-20",
    time: "8",
    client1: 21,
    client2: 24,
    id: 4,
  },
  {
    profile: "/agents/agent06.png",
    name: "Chad",
    minutesTalked: "00:40:01",
    completedLeads: "67/100",
    rateTime: 7.8,
    incomingCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    finishedCalls: [{
      month: 1,
      numberOfCall: 20
    },
    {
      month: 2,
      numberOfCall: 30
    },
    {
      month: 3,
      numberOfCall: 40
    },
    {
      month: 4,
      numberOfCall: 50
    },
    {
      month: 5,
      numberOfCall: 60
    },
    {
      month: 6,
      numberOfCall: 70
    },
    {
      month: 7,
      numberOfCall: 80
    },
    {
      month: 8,
      numberOfCall: 90
    },
    {
      month: 9,
      numberOfCall: 100
    },
    {
      month: 10,
      numberOfCall: 30
    },
    {
      month: 11,
      numberOfCall: 50
    },
    {
      month: 12,
      numberOfCall: 150
    }],
    totalIncomingCalls: "250",
    totalFinishedCalls: "3000",
    date: "2024-04-20",
    time: "8",
    client1: 21,
    client2: 24,
    id: 4,
  },
];

export const newAgent: agentType = {
  profile: "/userProfile.png",
  name: "Agent Name",
  minutesTalked: "00:00:00",
  completedLeads: "0/100",
  rateTime: 0,
  incomingCalls: [{
    month: 1,
    numberOfCall: 0
  },
  {
    month: 2,
    numberOfCall: 0
  },
  {
    month: 3,
    numberOfCall: 0
  },
  {
    month: 4,
    numberOfCall: 0
  },
  {
    month: 5,
    numberOfCall: 0
  },
  {
    month: 6,
    numberOfCall: 0
  },
  {
    month: 7,
    numberOfCall: 0
  },
  {
    month: 8,
    numberOfCall: 0
  },
  {
    month: 9,
    numberOfCall: 0
  },
  {
    month: 10,
    numberOfCall: 0
  },
  {
    month: 11,
    numberOfCall: 0
  },
  {
    month: 12,
    numberOfCall: 0
  }],
  finishedCalls: [{
    month: 1,
    numberOfCall: 0
  },
  {
    month: 2,
    numberOfCall: 0
  },
  {
    month: 3,
    numberOfCall: 0
  },
  {
    month: 4,
    numberOfCall: 0
  },
  {
    month: 5,
    numberOfCall: 0
  },
  {
    month: 6,
    numberOfCall: 0
  },
  {
    month: 7,
    numberOfCall: 0
  },
  {
    month: 8,
    numberOfCall: 0
  },
  {
    month: 9,
    numberOfCall: 0
  },
  {
    month: 10,
    numberOfCall: 0
  },
  {
    month: 11,
    numberOfCall: 0
  },
  {
    month: 12,
    numberOfCall: 0
  }],
  totalIncomingCalls: "0",
  totalFinishedCalls: "0",
  date: "2024-05-03",
  time: "0",
  client1: 0,
  client2: 0,
  id: 5,
}

export const agentCallSetting: agentCalls[] = [
  {
    name: "Agent1",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 1,
  },
  {
    name: "Agent2",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 2,
  },
  {
    name: "Agent3",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 3,
  },
  {
    name: "Agent4",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 4,
  },
  {
    name: "Agent5",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 5,
  },
  {
    name: "Agent6",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 6,
  },
  {
    name: "Agent7",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 7,
  },
  {
    name: "Agent8",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 8,
  },
  {
    name: "Agent9",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 9,
  },
  {
    name: "Agent10",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 10,
  },
  {
    name: "Agent11",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 11,
  },
  {
    name: "Agent12",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 12,
  },
  {
    name: "Agent13",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 13,
  },
  {
    name: "Agent14",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 14,
  },
  {
    name: "Agent15",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 15,
  },
  {
    name: "Agent16",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 16,
  },
  {
    name: "Agent17",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 17,
  },
  {
    name: "Agent18",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 18,
  },
  {
    name: "Agent19",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 19,
  },
  {
    name: "Agent20",
    time: "4",
    message: "64/100",
    receivedCalls: "250",
    missedCalls: "3000",
    minutesTalked: "00:40:01",
    client1: 21,
    client2: 24,
    id: 20,
  },
];
