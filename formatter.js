import data from './data.json'
import grandTotal from './math.js'

//---------------------------------------------------------
const clientes = data.clientes
const purchases = data.purchases

function formatedDate(date) {
  date = date.split('/').reverse().join('/')
  return date
} //formats date to yyyy/mm/dd

const idList = clientes.map(({ id }) => id); // create an array with all active customers id's

const purchasesOrderedByCustomer = idList.map(idNumber => {
  return purchases.filter(entry => entry.clients_id === idNumber);
}); // create an array for each customer containing all purchases,

const orderedByDate = purchasesOrderedByCustomer.map(elem => {
  const andOrderedByDate = [...elem].sort((a, b) => {
    let dateValuea = formatedDate(a.data);
    let dateValueb = formatedDate(b.data);
    return dateValuea == dateValueb ? 0 : dateValuea > dateValueb ? 1 : -1;
  });
  return andOrderedByDate;
}); // orders purchasesOrderedByCustomer arrays by date

function nameFinder(customerId) {
  // let index = customerId - 1;
  const customerData = clientes.find(({id}) => id === customerId)
  return customerData.name
}

function shoppingHistory(customerId) {
  const index = idList.indexOf(customerId);
  for (let j = 0; j < orderedByDate[index].length; j++) {
    console.log(
      `Compra em ${orderedByDate[index][j].data} no total de R$ ${orderedByDate[index][j].total.toFixed(2)}.`
    )}
}

export function printOutForm(customerId) {
  console.log('\n')
  console.log(`Cliente: ${customerId} - ${nameFinder(customerId)}`)
  shoppingHistory(customerId)
  console.log(`Total do cliente: R$${grandTotal(customerId)}.`)
}//print all purchases form selected customer

export function fullListing() {
  idList.forEach((customerId) => {
    printOutForm(customerId)
  })
}//prints all purchases
