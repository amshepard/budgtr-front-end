import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${API}/transactions`);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const calculateTotal = () => {
    return transactions.reduce((total, transaction) => {
      return total + (transaction.deposit ? Number(transaction.amount) : -Number(transaction.amount));
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div>
      <header className="total">
        <h3>Expense Total: <span style={{ color: total > 0 ? "green" : "red" }}>${total}</span></h3>
      </header>
      {transactions.map((transaction, index) => (
        <div key={transaction.id} className="transactions">
          <span>{transaction.date}</span>
          <Link to={`/transaction/${index}`}>
            <h3>{transaction.item_name}</h3>
          </Link>
          <span style={{ color: transaction.deposit ? "green" : "red" }} className="money">
            {!transaction.deposit ? "-" : ""}{transaction.amount}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Transactions;
