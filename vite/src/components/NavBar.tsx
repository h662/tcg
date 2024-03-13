import { FC } from "react";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 bg-blue-100 w-full h-12">
      <div className="flex h-full max-w-screen-sm mx-auto">
        <Link className="bg-yellow-200 nav-btn" to="/">
          Main
        </Link>
        <Link className="bg-orange-200 nav-btn" to="/news">
          News
        </Link>
        <Link className="bg-green-200 nav-btn" to="/my-nft">
          My NFT
        </Link>
        <Link className="bg-purple-200 nav-btn" to="/trade">
          Trade
        </Link>
        <Link className="bg-orange-200 nav-btn" to="/settings">
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
