import { getAllPaymentsOfUser } from "../../services";
import { PaymentPropType } from "../../utils/interfaces/payment";
import React, { useState } from "react";
import { calculateDaysFromNow, separateNumberWithCommas } from "../../utils/helper";
import { MyPaymentType } from "../../constants";

export const usePayment = () => {
  const [loading,setLoading] = useState<boolean>(true);
  const [error,setError] = useState<boolean>(false)
  const [connected,setConnected] = useState<boolean>(false);

  const [payments, setPayments] = useState<MyPaymentType[]>([]);
 
  const fetchAllPaymentsOfUser = async (userId: number) => {
    try {
      const response = await getAllPaymentsOfUser(userId);
      if (response.status == 200) {
        const transformedData: MyPaymentType[] = response.data.map(
          (payment: PaymentPropType) => {
            const formatDays = calculateDaysFromNow(new Date(payment.dueDate));
            return {
              id: payment.id,
              status: payment.status,
              dueDate: {
                dueDate:payment.dueDate,
                fromDays:formatDays
              },
              expectedAmount: separateNumberWithCommas(payment.expectedAmount),
              outstandingAmount: separateNumberWithCommas(payment.oustandingAmount),
              userId: payment.id,
            };
          }  
        );

        setLoading(false);
        setConnected(true)
        setTimeout(()=>{
          setConnected(false);
          setPayments(transformedData);
        },1000)
      }
      setLoading(false);
    } catch (error) {
      setError(true)
      console.log(error);
    
    }
  };
  return {
    fetchAllPaymentsOfUser: fetchAllPaymentsOfUser,
    payments: payments,
    loading:loading,
    error:error,
    connected:connected
  };
};