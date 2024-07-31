export const langList = [
    { value: "en", title: "English" },
    { value: "es", title: "Spanish" },
    { value: "pt", title: "Portuguese" },
];

export const agentLangList = [
    { value: "en", title: "English" },
    { value: "en-US", title: "English (US)" },
    { value: "en-GB", title: "English (UK)" },
    { value: "en-AU", title: "English (Australia)" },
    { value: "en-NZ", title: "English (New Zealand)" },
    { value: "en-IN", title: "English (India)" },
    { value: "zh", title: "Chinese (Mandarin, Simplified)" },
    { value: "zh-CN", title: "Chinese (Mandarin, Simplified, China)" },
    { value: "zh-Hans", title: "Chinese (Mandarin, Simplified, Hans)" },
    { value: "zh-TW", title: "Chinese (Mandarin, Traditional)" },
    { value: "zh-Hant", title: "Chinese (Mandarin, Traditional, Hant)" },
    { value: "es", title: "Spanish" },
    { value: "es-419", title: "Spanish (Latin America)" },
    { value: "fr", title: "French" },
    { value: "fr-CA", title: "French (Canada)" },
    { value: "de", title: "German" },
    { value: "el", title: "Greek" },
    { value: "hi", title: "Hindi" },
    { value: "hi-Latn", title: "Hindi (Latin script)" },
    { value: "ja", title: "Japanese" },
    { value: "ko", title: "Korean" },
    { value: "ko-KR", title: "Korean (Korea)" },
    { value: "pt", title: "Portuguese" },
    { value: "pt-BR", title: "Portuguese (Brazil)" },
    { value: "it", title: "Italian" },
    { value: "nl", title: "Dutch" },
    { value: "pl", title: "Polish" },
    { value: "ru", title: "Russian" },
    { value: "sv", title: "Swedish" },
    { value: "sv-SE", title: "Swedish (Sweden)" },
    { value: "da", title: "Danish" },
    { value: "da-DK", title: "Danish (Denmark)" },
    { value: "fi", title: "Finnish" },
    { value: "id", title: "Indonesian" },
    { value: "ms", title: "Malay" },
    { value: "tr", title: "Turkish" },
    { value: "uk", title: "Ukrainian" },
    { value: "bg", title: "Bulgarian" },
    { value: "cs", title: "Czech" },
    { value: "ro", title: "Romanian" },
    { value: "sk", title: "Slovak" },
];

export const genderList = [
    { value: "male", title: "Male" },
    { value: "female", title: "Female" },
];

export const voiceList = [
    { value: "84753c03-47d1-4f74-a72b-19df5f09f5d2", title: "American English Female" },
    { value: "37b3f1c8-a01e-4d70-b251-294733f08371", title: "American English Male" },
    { value: "8c7abf0b-152b-42cc-8de3-1ac4aacd22ee", title: "English Aussie Male" },
    { value: "c73848cb-ec70-497f-9299-89e34fb218f1", title: "Spanish Neutral Male" },
    { value: "a40268e7-4315-40ba-8c7e-a0ed77804226", title: "Spanish Neutral Female" },
    { value: "7236db80-b710-4208-a9a8-8d32c2301242", title: "Brazilian Portuguese Male" },
    { value: "3f1aef5c-42c0-4eea-a994-35ec5f9c85c6", title: "Brazilian Portuguese Female" },
];


export const roleList = [
    "Admin",
    "Manager",
    "Member",
    "Technical Support",
    "Customer Support",
    "Accountant",
    "Sales Representative",
];

export const currencyList = [
    "USD",
    "BRL",
    "AUD",
    "COP",
    "MXN",
    "EUR",
    "ARS",
    "GBP",
];


export const aiGenerateTypes = [
    { type: "knowledge", placeholder: `Write a Knowledge base for a company dedicated to 'add what your company does'` },
    { type: "policies", placeholder: `Write company policies for a company dedicated to 'add what your company does'` },
    { type: "objectives", placeholder: `Write possible objectives for clients who might be interested in 'add what your company services/products are' create in a table of two columns in objectives and response.` },
    { type: "rules", placeholder: `Write rules of engagement for an AI voice bot to use in a call with clients as a representative of a company who is dedicated to 'add what your company does'` },
    { type: "temperature", placeholder: `Set the temperature and interrution rate` },
]

export const exportContactHeaders = ["first_name", "last_name", "email", "phone", "company_name", "company_address", "customer_ID", "comment"];
