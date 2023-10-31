export interface IContact {
  id: string;
  name: string;
  phone?: string;
  age?: number;
  email?: string;
}

export enum ResponseStatus {
  Success = "success",
  Error = "error",
}

export interface IApiResponse {
  status: ResponseStatus;
  data?: IContact[];
  error?: string;
}

export enum ToastStatus {
  Primary = "Primary",
  Secondary = "Secondary",
  Success = "Success",
  Danger = "Danger",
  Warning = "Warning",
  Info = "Info",
  Light = "Light",
  Dark = "Dark",
}

export interface IToastData {
  status: ToastStatus;
  message: string;
}
