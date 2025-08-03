export const separateNumberWithCommas = (number: number): string => {
  if(number==0){
    const formattedNumber = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits:0
    }).format(number);

    return formattedNumber;
  }
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);

  return formattedNumber;
}

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

export const formatAvailableCredit = (availableCredit:number) => {
  if (availableCredit >= 1000) {
    return `$${(availableCredit / 1000).toFixed(1)}k`;
  } else if(availableCredit == 0){
    return `$0`;
  }else {
    return `$${availableCredit.toFixed(2)}`;
  }
}

export const generateRandomId = (): number => {
  return Math.floor(Math.random() * 10000);
};

export const calculateDaysFromNow = (dueDate: Date): string => {
  const now = new Date();
  const differenceInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return `${differenceInDays+1} day(s) from now`;
};

export const calculateNoOfDaysToPay = (dueDate: Date): string => {
  const now = new Date();
  const differenceInDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return `Due in ${differenceInDays+1} day(s)`;
};

export const getTodaysDateYear = ():string => {
  const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const formattedDateString = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    return formattedDateString;
}