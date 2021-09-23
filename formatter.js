import data from './data.json'
import grandTotal from './math.js'

const clientes = data.clientes
const purchases = data.purchases

const idList = clientes.map(({ id }) => id); // create an array with all active customers id's

const purchasesOrderedByCustomer = idList.map(idNumber => {
  return purchases.filter(entry => entry.clients_id === idNumber);
}); // create an array for each customer containing all purchases,

const orderedByDate = purchasesOrderedByCustomer.map(elem => {
  const andOrderedByDate = elem.sort((a, b) => {
    let dateValuea = Number(new Date(a.data));
    let dateValueb = Number(new Date(b.data));
    return dateValuea == dateValueb ? 0 : dateValuea > dateValueb ? 1 : -1;
  });
  return andOrderedByDate;
}); // orders purchasesOrderedByCustomer arrays by date

function nameFinder(customerId) {
  let index = customerId - 1;
  return clientes[index].name;
}

function shoppingHistory(customerId) {
  let index = customerId - 1;
  let datesArr = [];
  let valuesArr = [];
  for (let j = 0; j < purchasesOrderedByCustomer[index].length; j++) {
    datesArr.push(purchasesOrderedByCustomer[index][j].data);
    valuesArr.push(purchasesOrderedByCustomer[index][j].total);
    console.log(
      `Compra em ${datesArr[j]} no total de R$ ${valuesArr[j].toFixed(2)}.`
    );
  }
}

export function printOutForm(customerId) {
  console.log('\n')
  console.log(`Cliente: ${customerId} - ${nameFinder(customerId)}`)
  shoppingHistory(customerId),
  console.log(`Total do cliente: R$${grandTotal(customerId)}.`)
}

export function fullListing() {
  idList.forEach((customerId) => {
    printOutForm(customerId)
  })
}


// ////////////////////////////////////////////////////////////////////////////////
