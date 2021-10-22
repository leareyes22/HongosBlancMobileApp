import { action } from 'mobx';
export interface UIWrapper<x> {
  data: x;
  hasData: boolean;
  loading: boolean;
  firstLoad: boolean;
  hasError: boolean;
  errorCode?: number;
  errorMessage?: string;
}

export const initialUIWrapper = (data: any): UIWrapper<any> => {
  return {
    data: data,
    hasData: false,
    firstLoad: true,
    loading: false,
    hasError: false,
  };
};

export const setLoading = action((wrapper: UIWrapper<any>): void => {
  wrapper.loading = true;
});
