export interface CashKickPropType {
  name: string;
  status: string;
  maturity: Date;
  totalFinanced: number;
  totalReceived: number;
  id: number;
  userId: number;
}
export interface CashKickProp {
  name: string;
  status: string;
  maturity: Date;
  totalFinanced: number;
  totalReceived: number;
  userId: number;
}
export interface ContractPropType {
  id: number;
  name: string;
  status: string;
  type: string;
  perPayment: number;
  totalFinanced: string;
  totalAvailable: number;
  termLength: number;
  termRate: number;
  paymentAmount: number;
}

export interface CashKickContractsPropsType {
  cashkickId: number;
  contractId: number;
  id: number;
}

export interface UserPropType {
  id:number;
  name: string;
  email: string;
  password: string;
  availableCredit: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
  // availableCredit: number;
}
