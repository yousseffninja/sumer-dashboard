import { Filter } from "@/@types/filter";

export const filtersString = (filters: Filter[] | undefined): string | undefined => {
  if (filters !== undefined) {
    return filters
      .map((filter) => {
        if (filter.value !== "") {
          let encodedValue = encodeURIComponent(filter.value);
          if (filter.operator === "<") {
            encodedValue = encodeURIComponent(`<${filter.value}`);
            return `filters=${filter.key}${encodedValue}`
          } else if (filter.operator === ">") {
            encodedValue = encodeURIComponent(`>${filter.value}`);
            return `filters=${filter.key}${encodedValue}`
          }else if (filter.operator === "><") {
            encodedValue = encodeURIComponent(`>${filter.value}`);
            let encodedValueEnd = encodeURIComponent(`<${filter.end}`);
            return `filters=${filter.key}${encodedValue}%2C${filter.key}${encodedValueEnd}`
          }
          return `filters=${filter.key}<>${encodedValue}`;
        }
      })
      .filter(Boolean) // Remove any undefined or falsy values
      .join("&");
  } else {
    return undefined;
  }
};