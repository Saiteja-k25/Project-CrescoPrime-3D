export interface Report {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  author: string;
}

export const DEPARTMENT_REPORTS: Record<string, Report[]> = {
  crypto: [
    {
      id: "crypto-june-2026",
      title: "Crypto Desk Alpha & Yield Report",
      date: "June 2026",
      fileUrl: "/reports/crypto/june-2026.html",
      author: "Data Analyst Dept"
    },
    {
      id: "crypto-may-2026",
      title: "BTC Liquid Majors Arbitrage Performance",
      date: "May 2026",
      fileUrl: "/reports/crypto/may-2026.html",
      author: "Data Analyst Dept"
    }
  ],
  commodities: [
    {
      id: "commodities-june-2026",
      title: "XAU/USD Trend & Volatility Analysis",
      date: "June 2026",
      fileUrl: "/reports/commodities/june-2026.html",
      author: "Data Analyst Dept"
    }
  ],
  operations: [
    {
      id: "ops-june-2026",
      title: "System Performance & Execution Latency Audit",
      date: "June 2026",
      fileUrl: "/reports/operations/june-2026.html",
      author: "Data Analyst Dept"
    }
  ],
  accounts: [
    {
      id: "accounts-june-2026",
      title: "Settlements & Treasury Ledger Balance",
      date: "June 2026",
      fileUrl: "/reports/accounts/june-2026.html",
      author: "Data Analyst Dept"
    }
  ],
  hr: [
    {
      id: "hr-june-2026",
      title: "Staff Performance & Hiring Dashboard",
      date: "June 2026",
      fileUrl: "/reports/hr/june-2026.html",
      author: "Data Analyst Dept"
    }
  ]
};
