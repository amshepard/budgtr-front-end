import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function TransactionsDetails() {
  const [transaction, setTransaction] = useState({});
  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [index, navigate]);

  const isDeposit = transaction.deposit;
  const amountDisplay = isDeposit ? transaction.amount : `-${transaction.amount}`;

  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => navigate(`/transactions`))
      .catch((e) => console.log("Error deleting transaction:", e));
  };

  return (
    <article>
      <h3>
        <span style={{ color: isDeposit ? "green" : "red" }}>{amountDisplay}</span>
      </h3>
      <h3>{transaction.item_name}</h3>
      <p>{transaction.amount}</p>
      <h5>{transaction.category}</h5>
      <div className="showNavigation">
        <div>
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}
