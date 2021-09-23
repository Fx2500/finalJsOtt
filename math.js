import data from './data.json'
const purchases = data.purchases

export default function grandTotal(id) {
  let sumUp = purchases.filter(({clients_id}) => clients_id === id)
.reduce((totalBalance, purchases) => totalBalance + purchases.total, 0)
return sumUp.toFixed(2)
}
 