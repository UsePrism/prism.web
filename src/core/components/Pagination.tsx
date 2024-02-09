import { fetchBtn } from "core/consts/styling";

export default function Pagination({
  pagination = {
    CurrentPage: 1,
    HasNext: false,
    HasPrevious: false,
    PageSize: 10,
    TotalCount: 1,
    TotalPages: 1,
  },
  onFetch = () => {},
  boxStyle = "",
}: {
  boxStyle?: string;
  pagination?: Pagination;
  onFetch?: any;
}) {
  return (
    <div
      className={`mt-[25px] flex items-center justify-center gap-5 ${boxStyle}`}
    >
      <button
        disabled={!pagination?.HasPrevious}
        className={`${fetchBtn}`}
        onClick={() => onFetch(pagination?.CurrentPage - 1)}
      >
        Prev
      </button>

      <button className={`${fetchBtn} disabled:!cursor-pointer`} disabled>
        {pagination?.CurrentPage} | {pagination?.TotalPages}
      </button>

      <button
        disabled={!pagination?.HasNext}
        className={`${fetchBtn}`}
        onClick={() => onFetch(pagination?.CurrentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
