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
      <button
        disabled={pageNumber - 1 < 1}
        className={`${fetchBtn}`}
        onClick={() => onFetch(pageNumber - 1)}
      >
        Prev
      </button>
      <button
        disabled={pageNumber === totalCount}
        className={`${fetchBtn}`}
        onClick={() => onFetch(pageNumber)}
      >
        {pageNumber}
      </button>
      {!(pageNumber + 1 > totalCount) && (
        <button
          disabled={pageNumber + 1 >= totalCount}
          className={`${fetchBtn}`}
          onClick={() => onFetch(pageNumber + 1)}
        >
          {pageNumber + 1}
        </button>
      )}
      <button className={`${fetchBtn} disabled:!cursor-pointer`} disabled>
        ...
      </button>
      {totalCount - 1 > 1 && totalCount - 1 > pageNumber + 1 && (
        <button
          className={`${fetchBtn}`}
          disabled={totalCount - 1 < 1}
          onClick={() => onFetch(totalCount - 1)}
        >
          {totalCount - 1}
        </button>
      )}
      <button
        disabled={pageNumber === totalCount}
        className={`${fetchBtn}`}
        onClick={() => onFetch(pageNumber + 1)}
      >
        Next
      </button>
    </>
  );
}
