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
    data: any;
    errors: {} | any;
  }
}
