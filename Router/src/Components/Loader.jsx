import React from "react";
import { Link } from "react-router-dom";
//import styled from "styled-components";

  
 function Loader(props) {
  const {id,  name, type, rating, number_of_votes, image } = props;

  return (
    <>
      <Link to={`/dashboard/${id}`}>
        <Flex>
          <img src={image} alt={title} height="200px" width={"200px"} />
          <h3>{name}</h3>
          <h4>{type}</h4>
          <p>{rating}</p>
          <p>{number_of_votes}</p>
        </Flex>
      </Link>
    </>
  );
  // return <h3 data-testid="loading-container">...Loading</h3>;
}

export default Loader;



