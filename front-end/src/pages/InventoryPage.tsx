import { useRecoilValue } from "recoil";
import SubNav from "../components/SubNav";
import { listProductToppings, product } from "../types/types";
import { filteredProducts } from "../atoms/product";

function InventoryPage() {
  const products = useRecoilValue<listProductToppings>(filteredProducts);

  const MenuColumns = ["Product ID", "Product Name", "Category", "Price"];
  const MenuData = products.products.map((product: product) => {
    return [product.product_id, product.name, product.category, product.price];
  });
  return (
    <>
      <SubNav>
        <nav>
          <button className="me-3">Manage Inventory</button>
          <button>Edit Menu</button>
        </nav>
      </SubNav>
      <div className="container">
        <Table columns={MenuColumns} data={MenuData} />
        <div className="container">
          <div className="container d-flex">
            <div className="d-flex flex-column">
              <div>Product Name</div>
              <div>Price</div>
            </div>
            <div>Catrgory</div>
          </div>
          <div>
            <button>Add</button>
            <button>Update</button>
            <button>Clear</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

const Table = ({ columns, data }: any) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          {columns.map((name: string, i: number) => {
            return (
              <th key={i} scope="col">
                {name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((array: any, i: number) => {
          return (
            <tr key={i}>
              {array.map((item: any, i: number) =>
                i === 0 ? <th scope="row">{item}</th> : <td key={i}>{item}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InventoryPage;
