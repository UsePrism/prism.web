import { useEffect, useState } from "react";
import InputField from "./formfields/InputField";
import { useNavigate, useSearchParams } from "react-router-dom";
import notification from "core/helpers/notification";
import { searchIcon } from "core/consts/images";

interface Props {
  id?: string;
  formStyle?: string;
  inputStyle?: string;
  buttonStyle?: string;
  closeModal?: any;
}

export default function SearchBox({
  formStyle = "",
  buttonStyle = "",
  id = "",
  closeModal = () => {},
  inputStyle,
}: Props) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams]: any = useSearchParams();

  const search = (e: any) => {
    e.preventDefault();

    if (searchTerm?.length > 0) {
      closeModal();
      navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
    } else {
      notification({
        message: "Please include a search term",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    var term = searchParams.get("term");
    setSearchTerm(term == null ? "" : term);
  }, [searchParams.get("term")]);

  // TODO: Add suggestions when typing in search field

  return (
    <form id={id} className={formStyle} onSubmit={search}>
      <InputField
        boxStyle={inputStyle}
        placeholder="Search for a business"
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e?.target?.value)}
      />
      <button className={buttonStyle}>
        <img src={searchIcon} alt="" className="p-1" />
      </button>
    </form>
  );
}
