export function calculatePaginationEntries(
    totalCount: number,
    pageNumber: number,
    pageLimit: number
  ) {
    return {
      lastPage: Math.ceil(totalCount / pageLimit),
      from: (pageNumber - 1) * pageLimit + 1,
      to: pageNumber * pageLimit < totalCount ? pageNumber * pageLimit : totalCount
    };
  }
  
export const numberWithCommas = (x: any) => x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
