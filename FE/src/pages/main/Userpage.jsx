import { Titlepage } from "../../components/Titlepage";
import { FaUsersGear } from "react-icons/fa6";
export function Userpage() {
  return (
    <>
      <div className="max-w-full">
        <Titlepage title={`Users Data`} icon={FaUsersGear} />
      </div>
    </>
  );
}
