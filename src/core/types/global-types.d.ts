export {};

declare global {
  interface RoutesType {
    name: string;
    layout: string;
    component: JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
  }

  interface GeneralResponse {
    status: boolean;
    statusCode: number,
    message: string;
    data: any;
    errors: {} | any;
  }
}
