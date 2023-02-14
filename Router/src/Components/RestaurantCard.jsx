import { Link } from "react-router-dom";

export default function RestaurantCard() {
  return (
    <tr data-testid="item">
      <td>
        <Link data-testid="name"></Link>
      </td>
      <td data-testid="rating"></td>
      <td data-testid="type"></td>
      <td data-testid="price"></td>
    </tr>
  );
}
