import { PaymentMethodType, BillingHistoryType, TeamMemberType } from "../types/types";

export const paymentMethods: PaymentMethodType[] = [
  {
    id: "2345600",
    type: "mastercard",
    name: "Mastercard",
    number: "****  ****  **** 3204",
    expiry: "31/2026",
  },
  {
    id: "2345601",
    type: "visa",
    name: "Visa",
    number: "****  ****  **** 3204",
    expiry: "31/2026",
  }
];


export const defaultData: BillingHistoryType[] = [
  {
    id: "2345600",
    name: "John carter_00",
    companyName: "Epic caller_00",
    service: "Minutes_00",
    date: "2024-03-28",
    email: "email_00@company.com",
    phone: "12345600",
    amount: "$82",
    status: "Paid",
  },
  {
    id: "2345601",
    name: "John carter_01",
    companyName: "Epic caller_01",
    service: "Minutes_01",
    date: "2024-03-27",
    email: "email_01@company.com",
    phone: "12345601",
    amount: "$72",
    status: "Paid",
  },
  {
    id: "2345602",
    name: "John carter_02",
    companyName: "Epic caller_02",
    service: "Minutes_02",
    date: "2024-04-20",
    email: "email_02@company.com",
    phone: "12345602",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345603",
    name: "John carter_03",
    companyName: "Epic caller_03",
    service: "Minutes_03",
    date: "2024-04-17",
    email: "email_03@company.com",
    phone: "12345603",
    amount: "$71",
    status: "Paid",
  },
  {
    id: "2345604",
    name: "John carter_04",
    companyName: "Epic caller_04",
    service: "Minutes_04",
    date: "2024-04-29",
    email: "email_04@company.com",
    phone: "12345604",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345605",
    name: "John carter_05",
    companyName: "Epic caller_05",
    service: "Minutes_05",
    date: "2024-04-12",
    email: "email_05@company.com",
    phone: "12345605",
    amount: "$21",
    status: "Paid",
  },
  {
    id: "2345606",
    name: "John carter_06",
    companyName: "Epic caller_06",
    service: "Minutes_06",
    date: "2024-04-07",
    email: "email_06@company.com",
    phone: "12345606",
    amount: "$70",
    status: "Paid",
  },
  {
    id: "2345607",
    name: "John carter_07",
    companyName: "Epic caller_07",
    service: "Minutes_07",
    date: "2024-04-10",
    email: "email_07@company.com",
    phone: "12345607",
    amount: "$10",
    status: "Paid",
  },
  {
    id: "2345608",
    name: "John carter_08",
    companyName: "Epic caller_08",
    service: "Minutes_08",
    date: "2024-04-25",
    email: "email_08@company.com",
    phone: "12345608",
    amount: "$52",
    status: "Paid",
  },
  {
    id: "2345609",
    name: "John carter_09",
    companyName: "Epic caller_09",
    service: "Minutes_09",
    date: "2024-04-17",
    email: "email_09@company.com",
    phone: "12345609",
    amount: "$71",
    status: "Paid",
  },
  {
    id: "2345610",
    name: "John carter_10",
    companyName: "Epic caller_10",
    service: "Minutes_10",
    date: "2024-04-25",
    email: "email_10@company.com",
    phone: "12345610",
    amount: "$52",
    status: "Paid",
  },
  {
    id: "2345611",
    name: "John carter_11",
    companyName: "Epic caller_11",
    service: "Minutes_11",
    date: "2024-03-29",
    email: "email_11@company.com",
    phone: "12345611",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345612",
    name: "John carter_12",
    companyName: "Epic caller_12",
    service: "Minutes_12",
    date: "2024-04-20",
    email: "email_12@company.com",
    phone: "12345612",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345613",
    name: "John carter_13",
    companyName: "Epic caller_13",
    service: "Minutes_13",
    date: "2024-04-03",
    email: "email_13@company.com",
    phone: "12345613",
    amount: "$30",
    status: "Paid",
  },
  {
    id: "2345614",
    name: "John carter_14",
    companyName: "Epic caller_14",
    service: "Minutes_14",
    date: "2024-03-29",
    email: "email_14@company.com",
    phone: "12345614",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345615",
    name: "John carter_15",
    companyName: "Epic caller_15",
    service: "Minutes_15",
    date: "2024-03-26",
    email: "email_15@company.com",
    phone: "12345615",
    amount: "$62",
    status: "Paid",
  },
  {
    id: "2345616",
    name: "John carter_16",
    companyName: "Epic caller_16",
    service: "Minutes_16",
    date: "2024-04-05",
    email: "email_16@company.com",
    phone: "12345616",
    amount: "$50",
    status: "Paid",
  },
  {
    id: "2345617",
    name: "John carter_17",
    companyName: "Epic caller_17",
    service: "Minutes_17",
    date: "2024-03-29",
    email: "email_17@company.com",
    phone: "12345617",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345618",
    name: "John carter_18",
    companyName: "Epic caller_18",
    service: "Minutes_18",
    date: "2024-04-17",
    email: "email_18@company.com",
    phone: "12345618",
    amount: "$71",
    status: "Paid",
  },
  {
    id: "2345619",
    name: "John carter_19",
    companyName: "Epic caller_19",
    service: "Minutes_19",
    date: "2024-04-11",
    email: "email_19@company.com",
    phone: "12345619",
    amount: "$11",
    status: "Paid",
  },
  {
    id: "2345620",
    name: "John carter_20",
    companyName: "Epic caller_20",
    service: "Minutes_20",
    date: "2024-03-30",
    email: "email_20@company.com",
    phone: "12345620",
    amount: "$30",
    status: "Paid",
  },
  {
    id: "2345621",
    name: "John carter_21",
    companyName: "Epic caller_21",
    service: "Minutes_21",
    date: "2024-04-21",
    email: "email_21@company.com",
    phone: "12345621",
    amount: "$12",
    status: "Paid",
  },
  {
    id: "2345622",
    name: "John carter_22",
    companyName: "Epic caller_22",
    service: "Minutes_22",
    date: "2024-04-02",
    email: "email_22@company.com",
    phone: "12345622",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345623",
    name: "John carter_23",
    companyName: "Epic caller_23",
    service: "Minutes_23",
    date: "2024-03-30",
    email: "email_23@company.com",
    phone: "12345623",
    amount: "$30",
    status: "Paid",
  },
  {
    id: "2345624",
    name: "John carter_24",
    companyName: "Epic caller_24",
    service: "Minutes_24",
    date: "2024-04-13",
    email: "email_24@company.com",
    phone: "12345624",
    amount: "$31",
    status: "Paid",
  },
  {
    id: "2345625",
    name: "John carter_25",
    companyName: "Epic caller_25",
    service: "Minutes_25",
    date: "2024-03-31",
    email: "email_25@company.com",
    phone: "12345625",
    amount: "$13",
    status: "Paid",
  },
  {
    id: "2345626",
    name: "John carter_26",
    companyName: "Epic caller_26",
    service: "Minutes_26",
    date: "2024-03-27",
    email: "email_26@company.com",
    phone: "12345626",
    amount: "$72",
    status: "Paid",
  },
  {
    id: "2345627",
    name: "John carter_27",
    companyName: "Epic caller_27",
    service: "Minutes_27",
    date: "2024-04-16",
    email: "email_27@company.com",
    phone: "12345627",
    amount: "$61",
    status: "Paid",
  },
  {
    id: "2345628",
    name: "John carter_28",
    companyName: "Epic caller_28",
    service: "Minutes_28",
    date: "2024-04-26",
    email: "email_28@company.com",
    phone: "12345628",
    amount: "$62",
    status: "Paid",
  },
  {
    id: "2345629",
    name: "John carter_29",
    companyName: "Epic caller_29",
    service: "Minutes_29",
    date: "2024-04-13",
    email: "email_29@company.com",
    phone: "12345629",
    amount: "$31",
    status: "Paid",
  },
  {
    id: "2345630",
    name: "John carter_30",
    companyName: "Epic caller_30",
    service: "Minutes_30",
    date: "2024-03-26",
    email: "email_30@company.com",
    phone: "12345630",
    amount: "$62",
    status: "Paid",
  },
  {
    id: "2345631",
    name: "John carter_31",
    companyName: "Epic caller_31",
    service: "Minutes_31",
    date: "2024-04-05",
    email: "email_31@company.com",
    phone: "12345631",
    amount: "$50",
    status: "Paid",
  },
  {
    id: "2345632",
    name: "John carter_32",
    companyName: "Epic caller_32",
    service: "Minutes_32",
    date: "2024-04-19",
    email: "email_32@company.com",
    phone: "12345632",
    amount: "$91",
    status: "Paid",
  },
  {
    id: "2345633",
    name: "John carter_33",
    companyName: "Epic caller_33",
    service: "Minutes_33",
    date: "2024-03-30",
    email: "email_33@company.com",
    phone: "12345633",
    amount: "$30",
    status: "Paid",
  },
  {
    id: "2345634",
    name: "John carter_34",
    companyName: "Epic caller_34",
    service: "Minutes_34",
    date: "2024-04-29",
    email: "email_34@company.com",
    phone: "12345634",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345635",
    name: "John carter_35",
    companyName: "Epic caller_35",
    service: "Minutes_35",
    date: "2024-04-20",
    email: "email_35@company.com",
    phone: "12345635",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345636",
    name: "John carter_36",
    companyName: "Epic caller_36",
    service: "Minutes_36",
    date: "2024-04-16",
    email: "email_36@company.com",
    phone: "12345636",
    amount: "$61",
    status: "Paid",
  },
  {
    id: "2345637",
    name: "John carter_37",
    companyName: "Epic caller_37",
    service: "Minutes_37",
    date: "2024-04-09",
    email: "email_37@company.com",
    phone: "12345637",
    amount: "$90",
    status: "Paid",
  },
  {
    id: "2345638",
    name: "John carter_38",
    companyName: "Epic caller_38",
    service: "Minutes_38",
    date: "2024-04-25",
    email: "email_38@company.com",
    phone: "12345638",
    amount: "$52",
    status: "Paid",
  },
  {
    id: "2345639",
    name: "John carter_39",
    companyName: "Epic caller_39",
    service: "Minutes_39",
    date: "2024-03-30",
    email: "email_39@company.com",
    phone: "12345639",
    amount: "$30",
    status: "Paid",
  },
  {
    id: "2345640",
    name: "John carter_40",
    companyName: "Epic caller_40",
    service: "Minutes_40",
    date: "2024-04-08",
    email: "email_40@company.com",
    phone: "12345640",
    amount: "$80",
    status: "Paid",
  },
  {
    id: "2345641",
    name: "John carter_41",
    companyName: "Epic caller_41",
    service: "Minutes_41",
    date: "2024-03-29",
    email: "email_41@company.com",
    phone: "12345641",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345642",
    name: "John carter_42",
    companyName: "Epic caller_42",
    service: "Minutes_42",
    date: "2024-04-02",
    email: "email_42@company.com",
    phone: "12345642",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345643",
    name: "John carter_43",
    companyName: "Epic caller_43",
    service: "Minutes_43",
    date: "2024-04-01",
    email: "email_43@company.com",
    phone: "12345643",
    amount: "$10",
    status: "Paid",
  },
  {
    id: "2345644",
    name: "John carter_44",
    companyName: "Epic caller_44",
    service: "Minutes_44",
    date: "2024-03-26",
    email: "email_44@company.com",
    phone: "12345644",
    amount: "$62",
    status: "Paid",
  },
  {
    id: "2345645",
    name: "John carter_45",
    companyName: "Epic caller_45",
    service: "Minutes_45",
    date: "2024-04-25",
    email: "email_45@company.com",
    phone: "12345645",
    amount: "$52",
    status: "Paid",
  },
  {
    id: "2345646",
    name: "John carter_46",
    companyName: "Epic caller_46",
    service: "Minutes_46",
    date: "2024-04-13",
    email: "email_46@company.com",
    phone: "12345646",
    amount: "$31",
    status: "Paid",
  },
  {
    id: "2345647",
    name: "John carter_47",
    companyName: "Epic caller_47",
    service: "Minutes_47",
    date: "2024-04-15",
    email: "email_47@company.com",
    phone: "12345647",
    amount: "$51",
    status: "Paid",
  },
  {
    id: "2345648",
    name: "John carter_48",
    companyName: "Epic caller_48",
    service: "Minutes_48",
    date: "2024-03-30",
    email: "email_48@company.com",
    phone: "12345648",
    amount: "$30",
    status: "Paid",
  },
  {
    id: "2345649",
    name: "John carter_49",
    companyName: "Epic caller_49",
    service: "Minutes_49",
    date: "2024-04-15",
    email: "email_49@company.com",
    phone: "12345649",
    amount: "$51",
    status: "Paid",
  },
  {
    id: "2345650",
    name: "John carter_50",
    companyName: "Epic caller_50",
    service: "Minutes_50",
    date: "2024-04-12",
    email: "email_50@company.com",
    phone: "12345650",
    amount: "$21",
    status: "Paid",
  },
  {
    id: "2345651",
    name: "John carter_51",
    companyName: "Epic caller_51",
    service: "Minutes_51",
    date: "2024-04-01",
    email: "email_51@company.com",
    phone: "12345651",
    amount: "$10",
    status: "Paid",
  },
  {
    id: "2345652",
    name: "John carter_52",
    companyName: "Epic caller_52",
    service: "Minutes_52",
    date: "2024-04-22",
    email: "email_52@company.com",
    phone: "12345652",
    amount: "$22",
    status: "Paid",
  },
  {
    id: "2345653",
    name: "John carter_53",
    companyName: "Epic caller_53",
    service: "Minutes_53",
    date: "2024-04-02",
    email: "email_53@company.com",
    phone: "12345653",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345654",
    name: "John carter_54",
    companyName: "Epic caller_54",
    service: "Minutes_54",
    date: "2024-04-16",
    email: "email_54@company.com",
    phone: "12345654",
    amount: "$61",
    status: "Paid",
  },
  {
    id: "2345655",
    name: "John carter_55",
    companyName: "Epic caller_55",
    service: "Minutes_55",
    date: "2024-04-01",
    email: "email_55@company.com",
    phone: "12345655",
    amount: "$10",
    status: "Paid",
  },
  {
    id: "2345656",
    name: "John carter_56",
    companyName: "Epic caller_56",
    service: "Minutes_56",
    date: "2024-04-05",
    email: "email_56@company.com",
    phone: "12345656",
    amount: "$50",
    status: "Paid",
  },
  {
    id: "2345657",
    name: "John carter_57",
    companyName: "Epic caller_57",
    service: "Minutes_57",
    date: "2024-04-11",
    email: "email_57@company.com",
    phone: "12345657",
    amount: "$11",
    status: "Paid",
  },
  {
    id: "2345658",
    name: "John carter_58",
    companyName: "Epic caller_58",
    service: "Minutes_58",
    date: "2024-04-25",
    email: "email_58@company.com",
    phone: "12345658",
    amount: "$52",
    status: "Paid",
  },
  {
    id: "2345659",
    name: "John carter_59",
    companyName: "Epic caller_59",
    service: "Minutes_59",
    date: "2024-03-27",
    email: "email_59@company.com",
    phone: "12345659",
    amount: "$72",
    status: "Paid",
  },
  {
    id: "2345660",
    name: "John carter_60",
    companyName: "Epic caller_60",
    service: "Minutes_60",
    date: "2024-04-06",
    email: "email_60@company.com",
    phone: "12345660",
    amount: "$60",
    status: "Paid",
  },
  {
    id: "2345661",
    name: "John carter_61",
    companyName: "Epic caller_61",
    service: "Minutes_61",
    date: "2024-03-26",
    email: "email_61@company.com",
    phone: "12345661",
    amount: "$62",
    status: "Paid",
  },
  {
    id: "2345662",
    name: "John carter_62",
    companyName: "Epic caller_62",
    service: "Minutes_62",
    date: "2024-04-14",
    email: "email_62@company.com",
    phone: "12345662",
    amount: "$41",
    status: "Paid",
  },
  {
    id: "2345663",
    name: "John carter_63",
    companyName: "Epic caller_63",
    service: "Minutes_63",
    date: "2024-04-16",
    email: "email_63@company.com",
    phone: "12345663",
    amount: "$61",
    status: "Paid",
  },
  {
    id: "2345664",
    name: "John carter_64",
    companyName: "Epic caller_64",
    service: "Minutes_64",
    date: "2024-04-10",
    email: "email_64@company.com",
    phone: "12345664",
    amount: "$10",
    status: "Paid",
  },
  {
    id: "2345665",
    name: "John carter_65",
    companyName: "Epic caller_65",
    service: "Minutes_65",
    date: "2024-04-20",
    email: "email_65@company.com",
    phone: "12345665",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345666",
    name: "John carter_66",
    companyName: "Epic caller_66",
    service: "Minutes_66",
    date: "2024-04-24",
    email: "email_66@company.com",
    phone: "12345666",
    amount: "$42",
    status: "Paid",
  },
  {
    id: "2345667",
    name: "John carter_67",
    companyName: "Epic caller_67",
    service: "Minutes_67",
    date: "2024-04-04",
    email: "email_67@company.com",
    phone: "12345667",
    amount: "$40",
    status: "Paid",
  },
  {
    id: "2345668",
    name: "John carter_68",
    companyName: "Epic caller_68",
    service: "Minutes_68",
    date: "2024-04-14",
    email: "email_68@company.com",
    phone: "12345668",
    amount: "$41",
    status: "Paid",
  },
  {
    id: "2345669",
    name: "John carter_69",
    companyName: "Epic caller_69",
    service: "Minutes_69",
    date: "2024-04-29",
    email: "email_69@company.com",
    phone: "12345669",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345670",
    name: "John carter_70",
    companyName: "Epic caller_70",
    service: "Minutes_70",
    date: "2024-04-22",
    email: "email_70@company.com",
    phone: "12345670",
    amount: "$22",
    status: "Paid",
  },
  {
    id: "2345671",
    name: "John carter_71",
    companyName: "Epic caller_71",
    service: "Minutes_71",
    date: "2024-04-02",
    email: "email_71@company.com",
    phone: "12345671",
    amount: "$20",
    status: "Paid",
  },
  {
    id: "2345672",
    name: "John carter_72",
    companyName: "Epic caller_72",
    service: "Minutes_72",
    date: "2024-04-19",
    email: "email_72@company.com",
    phone: "12345672",
    amount: "$91",
    status: "Paid",
  },
  {
    id: "2345673",
    name: "John carter_73",
    companyName: "Epic caller_73",
    service: "Minutes_73",
    date: "2024-03-26",
    email: "email_73@company.com",
    phone: "12345673",
    amount: "$62",
    status: "Paid",
  },
  {
    id: "2345674",
    name: "John carter_74",
    companyName: "Epic caller_74",
    service: "Minutes_74",
    date: "2024-03-29",
    email: "email_74@company.com",
    phone: "12345674",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345675",
    name: "John carter_75",
    companyName: "Epic caller_75",
    service: "Minutes_75",
    date: "2024-04-29",
    email: "email_75@company.com",
    phone: "12345675",
    amount: "$92",
    status: "Paid",
  },
  {
    id: "2345676",
    name: "John carter_76",
    companyName: "Epic caller_76",
    service: "Minutes_76",
    date: "2024-04-17",
    email: "email_76@company.com",
    phone: "12345676",
    amount: "$71",
    status: "Paid",
  },
  {
    id: "2345677",
    name: "John carter_77",
    companyName: "Epic caller_77",
    service: "Minutes_77",
    date: "2024-04-24",
    email: "email_77@company.com",
    phone: "12345677",
    amount: "$42",
    status: "Paid",
  },
  {
    id: "2345678",
    name: "John carter_78",
    companyName: "Epic caller_78",
    service: "Minutes_78",
    date: "2024-04-27",
    email: "email_78@company.com",
    phone: "12345678",
    amount: "$72",
    status: "Paid",
  },
  {
    id: "2345679",
    name: "John carter_79",
    companyName: "Epic caller_79",
    service: "Minutes_79",
    date: "2024-03-27",
    email: "email_79@company.com",
    phone: "12345679",
    amount: "$72",
    status: "Paid",
  },
  {
    id: "2345680",
    name: "John carter_80",
    companyName: "Epic caller_80",
    service: "Minutes_80",
    date: "2024-04-23",
    email: "email_80@company.com",
    phone: "12345680",
    amount: "$32",
    status: "Paid",
  },
  {
    id: "2345681",
    name: "John carter_81",
    companyName: "Epic caller_81",
    service: "Minutes_81",
    date: "2024-04-11",
    email: "email_81@company.com",
    phone: "12345681",
    amount: "$11",
    status: "Paid",
  },
  {
    id: "2345682",
    name: "John carter_82",
    companyName: "Epic caller_82",
    service: "Minutes_82",
    date: "2024-04-07",
    email: "email_82@company.com",
    phone: "12345682",
    amount: "$70",
    status: "Paid",
  },
  {
    id: "2345683",
    name: "John carter_83",
    companyName: "Epic caller_83",
    service: "Minutes_83",
    date: "2024-03-28",
    email: "email_83@company.com",
    phone: "12345683",
    amount: "$82",
    status: "Paid",
  },
  {
    id: "2345684",
    name: "John carter_84",
    companyName: "Epic caller_84",
    service: "Minutes_84",
    date: "2024-03-27",
    email: "email_84@company.com",
    phone: "12345684",
    amount: "$72",
    status: "Paid",
  },
  {
    id: "2345685",
    name: "John carter_85",
    companyName: "Epic caller_85",
    service: "Minutes_85",
    date: "2024-03-25",
    email: "email_85@company.com",
    phone: "12345685",
    amount: "$52",
    status: "Paid",
  },
  {
    id: "2345686",
    name: "John carter_86",
    companyName: "Epic caller_86",
    service: "Minutes_86",
    date: "2024-04-01",
    email: "email_86@company.com",
    phone: "12345686",
    amount: "$10",
    status: "Paid",
  },
  {
    id: "2345687",
    name: "John carter_87",
    companyName: "Epic caller_87",
    service: "Minutes_87",
    date: "2024-03-31",
    email: "email_87@company.com",
    phone: "12345687",
    amount: "$13",
    status: "Paid",
  },
  {
    id: "2345688",
    name: "John carter_88",
    companyName: "Epic caller_88",
    service: "Minutes_88",
    date: "2024-04-22",
    email: "email_88@company.com",
    phone: "12345688",
    amount: "$22",
    status: "Paid",
  },
  {
    id: "2345689",
    name: "John carter_89",
    companyName: "Epic caller_89",
    service: "Minutes_89",
    date: "2024-04-14",
    email: "email_89@company.com",
    phone: "12345689",
    amount: "$41",
    status: "Paid",
  },
  {
    id: "2345690",
    name: "John carter_90",
    companyName: "Epic caller_90",
    service: "Minutes_90",
    date: "2024-04-15",
    email: "email_90@company.com",
    phone: "12345690",
    amount: "$51",
    status: "Paid",
  },
  {
    id: "2345691",
    name: "John carter_91",
    companyName: "Epic caller_91",
    service: "Minutes_91",
    date: "2024-03-31",
    email: "email_91@company.com",
    phone: "12345691",
    amount: "$13",
    status: "Paid",
  },
];

export const teamMembers: TeamMemberType[] = [
  {
    id: 7,
    date_joined: "2024-07-24T07:14:34.835800Z",
    email: "test@test.com",
    username: "test",
    profile: {
      phone_number: "1237894567",
      role_manage: null
    }    
  },
];