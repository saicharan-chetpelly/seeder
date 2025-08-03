import axios from "axios";
import API from "./API";
import {
  CashKickContractsPropsType,
  CashKickProp,
  CashKickPropType,
  ContractPropType,
  User,
  UserPropType,
} from "../utils/interfaces/CashKick";
import { PaymentPropType } from "@src/utils/interfaces/payment";

export const checkUsers = async (email: string, password: string) => {
  try {
    const response = await API.get("/user");
    const users = response.data;
    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return false;
  }
};

export const login = async (email: string, password: string) => {
  const response = await API.post('/user/login', {
    email: email,
    password: password
  });
  return response;
};

export const getAllCashKicksOfUser = async (userId: number) => {
  const response = await API.get(`/cashkick?userId=${userId}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
  );
  return response;
};

export const getAllContractsByCashkickId = async (
  cashkickId: number | undefined
) => {
  const response = await API.get(`cashkickContract?cashkickId=${cashkickId}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
  );
  return response;
};
export const getAllContractById = async (contractId: number) => {
  const response = await API.get(`/contract/${contractId}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
  );
  return response;
};
export const getAllPaymentsOfUser = async (userId: number) => {
  const response = await API.get(`/payment/user/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
  );

  return response;
};

export const createNewCashkick = async (data: CashKickProp) => {
  const response = await API.post("/cashkick", {
    name: data.name,
    totalFinanced: data.totalFinanced,
    totalReceived: data.totalReceived,
    userId: data.userId,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response;
};

export const createCashkickContract = async (
  cashkickContracts: CashKickContractsPropsType[]
) => {
  try {
    const promises = cashkickContracts.map(
      async (cashkickContract: CashKickContractsPropsType) => {
        const response = await API.post("/cashkickContract", {
          cashkickId: cashkickContract.cashkickId,
          contractId: cashkickContract.contractId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        return response;
      }
    );

    const responses = await Promise.all(promises);

    return responses;
  } catch (error) {
    console.error(error);
  }
};

export const updateAvailableCreditOfUser = async (
  updatedCreditBalance: number,
  userId: number,
) => {
  try {
    const response = await API.patch(
      `/user/availableCredit/${userId}?availableCredit=${updatedCreditBalance}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};



export const updatePaymentsOfUser = async (
  userId: number,
  newOutstandingAmount: number
) => {
  try {
    const response = await getAllPaymentsOfUser(userId);
    if (response.status == 200 && response.data.length>0) {
      const payments = response.data.sort(
        (a: PaymentPropType, b: PaymentPropType) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
      const expectedAmountForAllPayments = newOutstandingAmount/12;

      for (const payment of payments) {
        const updatedPayment = {
          oustandingAmount: newOutstandingAmount-expectedAmountForAllPayments,
          expectedAmount: expectedAmountForAllPayments
        };
        await API.patch(`/payment/${payment.id}`, {
          ...updatedPayment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        newOutstandingAmount = newOutstandingAmount - expectedAmountForAllPayments;
      }
    } else {
      const currentDate = new Date();
      const expectedAmountForAllPayments = newOutstandingAmount/12;

      for (let i = 0; i < 12; i++) {
        const dueDate = new Date(currentDate);
        dueDate.setMonth(currentDate.getMonth() + i+1);
        const newPayment = {
          userId: userId,
          dueDate: dueDate,
          status: "Upcoming",
          oustandingAmount: newOutstandingAmount-expectedAmountForAllPayments,
          expectedAmount: expectedAmountForAllPayments
        };

        await API.post("/payment", newPayment, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        newOutstandingAmount = newOutstandingAmount - expectedAmountForAllPayments;
      }
    }

    console.log("Payments updated successfully.");
  } catch (error) {
    console.error("Error updating payments:", error);
  }
};

export const getUserById = async(userId:number) => {
    const response = await API.get(`/user/${userId}`);
    return response;
}

export const getUserByEmail = async(userEmail:string) => {
  const response = await API.get(`/user/email?email=${userEmail}`);
  return response;
}

export const updateUserPassword = async(email:string,password:string) => {
  const response = await API.patch(`/user?email=${email}`,{
    password:password
  });
  return response;
}

export const registerUser = (user: User) => {
  const response =  API.post('/user', {
    name:user.name,
    email:user.email,
    password: user.password,
  });
  return response;
};

export const getUserFundsById = async(userFundId:number,token:string) => {
  const response = await API.get(`/userFunds/${userFundId}`,
  {
    headers: {
      Authorization: token ? `Bearer ${token}` : `Bearer ${localStorage.getItem("token")}`
    }
  }
  );
  return response;
}