import { BounceLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <BounceLoader color="#047857"/>
    </div>
  );
}
