import MenuContent from "../components/MenuContent";
import MenuNav from "../components/MenuNav";
import MenuSidebar from "../components/MenuSidebar";
import ProductGrid from "../components/ProductGrid";

function MenuPage() {
  return (
    <div className="d-flex align-items-center py-4">
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <MenuNav />
        <div style={{ display: "flex" }}>
          <MenuSidebar />
          <MenuContent />
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
