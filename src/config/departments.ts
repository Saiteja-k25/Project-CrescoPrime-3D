export interface Department {
  id: string;
  name: string;
  email: string;
  iconName: string;
  description: string;
  dashboardPath: string;
}

export const DEPARTMENTS: Record<string, Department> = {
  crypto: {
    id: "crypto",
    name: "Crypto",
    email: "hr@crescoprime.com",
    iconName: "Bitcoin",
    description: "Cryptocurrency Prop-Trading Desk",
    dashboardPath: "/dashboard/crypto"
  },
  commodities: {
    id: "commodities",
    name: "Commodities",
    email: "hr@crescoprime.com",
    iconName: "TrendingUp",
    description: "Commodities & Precious Metals Trading",
    dashboardPath: "/dashboard/commodities"
  },
  operations: {
    id: "operations",
    name: "Operations",
    email: "hr@crescoprime.com",
    iconName: "Settings",
    description: "Operations & Infrastructure Control",
    dashboardPath: "/dashboard/operations"
  },
  accounts: {
    id: "accounts",
    name: "Accounts",
    email: "accounts@crescoprime.com",
    iconName: "Wallet",
    description: "Financial Accounts & Treasury",
    dashboardPath: "/dashboard/accounts"
  },
  hr: {
    id: "hr",
    name: "HR Department",
    email: "hr@crescoprime.com",
    iconName: "Users",
    description: "Human Resources & Talent Management",
    dashboardPath: "/dashboard/hr"
  }
};
