import App from '../app';

export const pinia = () => App.store ?? null;

export const useStore = id => pinia()?._s?.get(id) ?? null;

export const currentRoute = () => App.router?.currentRoute?.value ?? null;
