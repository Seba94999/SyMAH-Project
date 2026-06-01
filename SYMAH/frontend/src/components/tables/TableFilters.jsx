export default function TableFilters({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filterValue = "",
  onFilterChange,
  filterOptions = [],
}) {
  return (
    <div className="sy-table__filters">
      <div className="sy-table__filters-group">
        <input
          className="sy-input sy-table__search"
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder={searchPlaceholder}
        />
        {filterOptions.length > 0 ? (
          <select
            className="sy-select sy-table__select"
            value={filterValue}
            onChange={(event) => onFilterChange?.(event.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    </div>
  );
}
