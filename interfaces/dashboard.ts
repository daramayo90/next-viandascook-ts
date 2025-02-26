export interface DashboardSummaryResponse {
   numberOfOrders: number;
   paidOrders: number;
   cancelOrders: number;
   totalIncome: number;
   numberOfSelledProducts: number;
   totalPacksSold: number;
   discounts: number;
   mpOrders: number;
   cashOrders: number;
   transferOrders: number;
   mpIncome: number;
   cashIncome: number;
   transferIncome: number;
   numberOfClients: number;
   numberOfProducts: number;
   productsWithNoInventory: number;
}
