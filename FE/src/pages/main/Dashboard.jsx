import { FaTachometerAlt } from "react-icons/fa";
import { Titlepage } from "../../shared/Titlepage";

export function Dashboard() {
  const handleSearch = () => {};
  return (
    <>
      <div className="max-w full">
        <Titlepage
          title={`Dashboard`}
          icon={FaTachometerAlt}
          onSearch={handleSearch}
        />
      </div>
    </>
  );
}
