import { CartTableProps, product } from "../types/types";

const CartTable: React.FC<CartTableProps> = ({ columns, items }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((column: string) => (
            <th scope="col">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.items.map(
          (
            item: {
              product: product;
              toppings?: any;
              notes?: string;
            },
            i: number
          ) => (
            <tr>
              <th scope="row">{i}</th>
              <td>{item.product.product_id}</td>
              <td>{item.product.name}</td>
              <td>{item.product.category}</td>
              <td>{item.product.price}</td>
              <td></td>
            </tr>
          )
        )}
        <tr>
          <th></th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{items.total}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartTable;
