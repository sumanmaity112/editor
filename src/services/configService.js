import httpInterceptor from '../utils/httpInterceptor';
import constants from '../constants';

export const getTree = () => {
    return httpInterceptor.get(`${constants.baseConfigUrl}`);
};

export const getContentOf = (filename) => {
    return httpInterceptor.get(`${constants.configContentUrl}?filename=${filename}`);
};