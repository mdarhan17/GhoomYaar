export const APP_NAME = "GhoomYaar";

export const API_PREFIX = "/api/v1";

export const APP_DESCRIPTION =
  "Explore India, Every State, Every Season.";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type UserRole = "USER" | "ADMIN" | "EDITOR";

export type TripStatus =
  | "DRAFT"
  | "PLANNED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export type TravelMode =
  | "CAR"
  | "BIKE"
  | "BUS"
  | "TRAIN"
  | "FLIGHT";

export type TravelSeason =
  | "SUMMER"
  | "MONSOON"
  | "WINTER"
  | "SPRING"
  | "AUTUMN";