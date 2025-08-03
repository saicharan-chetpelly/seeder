import { MyCashKickType, MyContractsType } from "@src/constants";
import {
  getAllCashKicksOfUser,
  getAllContractById,
  getAllContractsByCashkickId,
} from "../../services";
import {
  CashKickContractsPropsType,
  CashKickPropType,
} from "../../utils/interfaces/CashKick";
import React, { useState } from "react";
import { formatDate, separateNumberWithCommas } from "../../utils/helper";

export const useCashkick = (userId: number) => {
  const [loading,setLoading] = useState<boolean>(true);
  const [error,setError] = useState<boolean>(false);
  const [cashkicks, setCashkicks] = useState<MyCashKickType[]>([]);
  const [contracts, setContracts] = useState<MyContractsType[]>([]);
  const [connected,setConnected] = useState<boolean>(false);
  const fetchAllContractsOfUser = async () => {
    try {
      const cashkicksData = await getAllCashKicksOfUser(userId);

      const transformedData = await Promise.all(
        cashkicksData.data
          .filter((cashkick: CashKickPropType) => cashkick.userId == userId)
          .map(async (cashkick: CashKickPropType) => {
            const cashkickContracts = await getAllContractsByCashkickId(
              cashkick.id
            );

            const contractData = await Promise.all(
              cashkickContracts.data
                .filter(
                  (cashkickContract: CashKickContractsPropsType) =>
                    cashkickContract.cashkickId == cashkick.id
                )
                .map(async (cashkickContract: CashKickContractsPropsType) => {
                  try {
                    const contract = await getAllContractById(
                      cashkickContract.contractId
                    );

                   
                    const contractInfo = contract.data;
                    return {
                      id: contractInfo.id,
                      name: contractInfo.name,
                      status: contractInfo.status,
                      type: contractInfo.type,
                      perPayment: separateNumberWithCommas(
                        contractInfo.perPayment
                      ),
                      totalFinanced: contractInfo.totalFinanced,
                      totalAvailable: separateNumberWithCommas(
                        contractInfo.totalAvailable
                      ),
                    };
                  }catch (error) {
                    console.error("Error fetching contract:", error);
                    return null;
                  }
                })
            );
            const flattenedData = contractData.flat()
            return flattenedData;
          })
      );

      setLoading(false);
      setConnected(true);
      setTimeout(()=>{
        setConnected(false);
        setContracts(transformedData.flat());
      },1000)
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const fetchAllCashkicksOfUser = async () => {
    try {
      const response = await getAllCashKicksOfUser(userId);
      if (response.status == 200) {
        const transformedData: MyCashKickType[] = response.data.map(
          (contract: CashKickPropType) => {
            return {
              name: contract.name,
              status: contract.status,
              maturity: formatDate(contract.maturity as unknown as string),
              totalFinanced: separateNumberWithCommas(contract.totalFinanced),
              totalRecieved: separateNumberWithCommas(contract.totalReceived),
              id: contract.id,
            };
          }
        );
        setCashkicks(transformedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchAllCashkicksOfUser: fetchAllCashkicksOfUser,
    fetchAllContractsOfUser: fetchAllContractsOfUser,
    cashkicks: cashkicks,
    contracts: contracts,
    loading:loading,
    error:error,
    connected:connected
  };
};
