// // src/types/parcel.ts

// export enum IParcelStatus {
//   Requested = "Requested",
//   Approved = "Approved",
//   Dispatched = "Dispatched",
//   Picked = "Picked",
//   InTransit = "In Transit",
//   Delivered = "Delivered",
//   Returned = "Returned",
//   Cancelled = "Cancelled",
// }

// export interface IStatusLog {
//   status: IParcelStatus;
//   timestamp: string; // backend er Date -> frontend e string
//   location?: string;
//   updatedBy?: string; 
//   note?: string;
// }

// export interface IUser {
//   id: string;
//   name?: string;
//   email?: string;
// }

// export interface IParcel {
//   id: string; // frontend e _id -> id
//   trackingId: string;
//   sender: IUser | string; 
//   receiver: IUser | string;
//   parcelType: string;
//   weight: number;
//   deliveryAddress: string;
//   currentStatus: IParcelStatus;
//   parcelFee?: number;
//   DeliveryDate?: string; 
//   isCancelled: boolean;
//   isDelivered: boolean;
//   isBlocked: boolean;
//   statusLogs?: IStatusLog[];
//   createdAt: string;
//   updatedAt: string;
// }