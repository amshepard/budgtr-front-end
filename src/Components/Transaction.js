import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>
        <Link to={`/transactions/${index}`} target="_blank" rel="noreferrer">
          {transaction.item_name.toUpperCase()}
        </Link>
      </td>
      <td>
        <span style={{ color: transaction.deposit ? "green" : "red" }}>
          {transaction.deposit ? transaction.amount : `-${transaction.amount}`}
        </span>
      </td>
    </tr>
  );
}

export default Transaction;
