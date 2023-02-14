import Loader from "../Components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const getDate= (url) => {
  return fetch(url).then((res) => res.json());
};

function RestaurantPage() {

  const [datafetch, setDatafetch] = useState({});
  const {dashboard_id} = useParams();

  // const {name, type, rating, number_of_votes, price_starts_from, image} = data;

  useEffect(() => {
    getDate(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants/${dashboard_id}`).then((res) => 
        setDatafetch(res.data)
      )
  }, [dashboard_id]);

  console.log(datafetch)

  // if (true) {
  //   return (
  //   <Loader />
  //   )
  // }


  return (
    <div data-testid="restaurant-container">
      
      {/* <h1>dashboard ID : {params.id}</h1> */}
               <img src={datafetch.image} alt="" />
               <h1>Name: {datafetch.name}</h1>
<h1>Rating : {datafetch.rating}</h1>
<h1>Type : {datafetch.type}</h1>
<h1>Number of Votes : {datafetch.number_of_votes}</h1>
    </div>
  );

}
export default RestaurantPage;
