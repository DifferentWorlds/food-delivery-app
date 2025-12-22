import { Link } from "react-router";
import appstore from "../../assets/shop/appstore.png";
import gplay from "../../assets/shop/googleplay.png";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="footer">
        <Link to="https://play.google.com/store/apps?hl=en_NZ">
          <img className="footer-img" src={gplay} />
        </Link>
        <Link to="https://www.apple.com/nz/app-store/">
          <img className="footer-img" src={appstore} />
        </Link>
      </div>
    </>
  );
};

export default Footer;
