// import { BiLoaderCircle } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";

export default function PageLoading() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0  overflow-hidden w-full flex justify-center items-center">
      {/* <BiLoaderCircle size={50} className="animate-spin mx-auto text-primary" /> */}
      <ImSpinner9 size={64} className="duration-500 text-primary animate-spin mx-auto" />
    </div>
  );
}
