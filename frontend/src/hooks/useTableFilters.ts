import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

interface UseTableFiltersProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  pageSize?: number;
}

export const useTableFilters = <T>({
  data,
  searchFields,
  pageSize = 10,
}: UseTableFiltersProps<T>) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;

    const searchLower = debouncedSearch.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return String(value).toLowerCase().includes(searchLower);
      })
    );
  }, [data, debouncedSearch, searchFields]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return {
    search,
    setSearch: handleSearchChange,
    currentPage,
    totalPages,
    paginatedData,
    filteredCount: filteredData.length,
    totalCount: data.length,
    handlePageChange,
  };
};
