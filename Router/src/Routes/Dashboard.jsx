
import { useContext, useEffect, useState } from "react";

import Loader from "../Components/Loader";
import RestaurantTable from "../Components/RestaurantTable";
import Pagination from "../Components/Pagination";
import { AppContext } from "../Context/AppContext"
import { Link } from "react-router-dom";


function Dashboard() {
  const [data, setData] = useState([])
  const [totalpage, setTotalpage] = useState(0);
  const [page, setPage] = useState(1)
  const { handleLogout, state } = useContext(AppContext)

  const getDate = () => {
    fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((res) => {
        setTotalpage(res.totalPages);
        setData(res.data);
        console.log(res.data)
      })

  }

  useEffect(() => {
    getDate();
  }, [page])

  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <button data-testid="logout-btn">Logout</button>
        <p>
          Token:
          <b data-testid="user-token"></b>
        </p>
      </div>
      <br />
      <div>
        <select data-testid="filter-box">
          <option value="">All</option>
          {/* fine_dining, ethnic, fast_food, cafe, casual_dining	 */}
        </select>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data.map((item) => {
          return (
            <div 
            key={item.id}
            style={{
              display:"flex"
              , flexDirection:"column",
              alignItems:"center",
              padding:'10px',
              margin:"auto"
            }}
            >
              
              {/* <img src={item.image} alt="" /> */}
              {/* <h1>{item.type}</h1>
              <p>{item.name}</p>
              <h1>{item.rating}</h1> */}
              {/* <Link to={`/dashboard/${item.id}`}>price_starts_from: {item.price_starts_from}</Link> */}
              <Loader key={item.id} {...item} />;
            </div>
          )

        })}
        {/* <Loader /> */}
        {/* Restaurant Table, remember to show loading indicator when API is loading */}
      </div>
      <br />
      <div data-testid="pagination-container"><Pagination/></div>
    </div>
  );
}

export default Dashboard;
