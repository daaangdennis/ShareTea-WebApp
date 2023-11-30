import "../styles/MenuPage.css";
import { SubNavProps } from "../types/types";

const SubNav: React.FC<SubNavProps> = ({ children }) => {
  return (
    <div className="menupage-navbar">
      <div className="menupage-navbar-link-container py-2">{children}</div>
    </div>
  );
};

export default SubNav;
