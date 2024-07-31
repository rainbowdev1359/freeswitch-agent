export const durationTypes = [
  "None",
  "Less than a minute",
  "1-5 minutes",
  "5-15 minutes",
  "15-30 minutes",
  "30-60 minutes",
  "More than an hour"
]

export const feedbackTypes = [
  "Call went completely silent",
  "Long Latency At Beginning Of Call",
  "Experienced 3 Second Plus Mid Call Latency Delays",
  "Voice Sounded Bad",
  "Action Live Transfer did not fire",
  "Agent Restarted My Script",
  "agent didn't follow The Seript",
  "Agent Used The Wrong Script",
  "Did Not Refer To Knowedge Base",
  "Other",
]

export const outcomeTypes = [
  "None",
  "Voicemail",
  "Not interested",
  "Low Interest",
  "Follow Up",
  "Meeting Scheduled",
  "Awaiting Payment",
  "Close",
]

export function isLeapYear() {
  const currentYear = new Date().getFullYear();
  return (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0;
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function generateNumbersUpTo(number: number) {
  return Array.from({ length: number }, (_, index) => index + 1);
}

export const checkTimeRange = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes < 1) {
    return durationTypes[1];
  } else if (totalMinutes >= 1 && totalMinutes <= 5) {
    return durationTypes[2];
  } else if (totalMinutes > 5 && totalMinutes <= 15) {
    return durationTypes[3];
  } else if (totalMinutes > 15 && totalMinutes <= 30) {
    return durationTypes[4];
  } else if (totalMinutes > 30 && totalMinutes <= 60) {
    return durationTypes[5];
  } else {
    return durationTypes[6];
  }
};