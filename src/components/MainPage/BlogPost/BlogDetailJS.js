function formatCurrency(amount){
  const formattedAmount = amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  return formattedAmount;
}
export default formatCurrency;

