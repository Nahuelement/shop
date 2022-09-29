

export interface BashboardSummaryResponse {
    numberOfOrders:        number;
    paidOrders:            number;
    notPaidOrders:         number;
    numberOfClients:       number;
    numberOfProducts:      number;
    productWihNoInventory: number;
    lowInventory:          number;
}