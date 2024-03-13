import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../components/Layout";

const Home: FC = () => {
  const { session, address } = useOutletContext<IOutletContext>();

  return (
    <div className="bg-red-100 container">
      <div>email: {session?.user.email}</div>
      <div>address: {address}</div>
    </div>
  );
};

export default Home;
