export class Pagination {
    Data: any[];
    PageSize: number;
    Page: number;
    FirstInResponse: any;
    FirstInPreviousResponse: any;
    LastInResponse: any;
    LastInPreviousResponse: any;

    constructor() {
        this.Page = 0;
      }
}
