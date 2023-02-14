// function createArrayOfSize(n) {
//   return new Array(n).fill(0);
// }

// function Pagination() {
//   let pages = [1].map((a, i) => <button data-testid="page-btn">1</button>);
//   return <div>{pages}</div>;
// }

// export default Pagination;


function createArrayOfSize(n) {
  return new Array(n).fill(0);
}

function Pagination({
  totalPage,
  currentPage,
  handleChange}) {
  let pages = createArrayOfSize(totalPage).map((a, index) => <button data-testid="page-btn"
  disabled={index + 1 == currentPage}
  onClick ={() => handleChange(index + 1)}
  >{index + 1}</button>);
  return <div>{pages}</div>;
}

export default Pagination;