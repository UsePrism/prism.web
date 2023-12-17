import { fetchBtn } from "core/consts/styling";

export default function Pagination({
  pageSize = 20,
  pageNumber = 1,
  totalCount,
  onFetch = () => {},
}: {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  onFetch?: any;
}) {
  return (
    <>
      <button className={`${fetchBtn}`} onClick={() => onFetch()}>
        Prev
      </button>
      <button className={`${fetchBtn}`} onClick={() => onFetch()}>
        {pageNumber}
      </button>
      {!(pageNumber + 1 > totalCount) && (
        <button className={`${fetchBtn}`} onClick={() => onFetch()}>
          {pageNumber + 1}
        </button>
      )}
      <button className={`${fetchBtn}`} disabled>
        ...
      </button>
      {totalCount - 1 > 1 && totalCount - 1 > pageNumber + 1 && (
        <button
          className={`${fetchBtn}`}
          onClick={() => onFetch(totalCount - 1)}
        >
          {totalCount - 1}
        </button>
      )}
      <button className={`${fetchBtn}`} onClick={() => onFetch(pageNumber++)}>
        Next
      </button>
    </>
  );
}
