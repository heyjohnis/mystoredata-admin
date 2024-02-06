export const cardNumberSecurity = (cardNumber: string): string => {
  return cardNumber?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$4-****-****-$4");
};
