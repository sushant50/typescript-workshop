// import { ExtendedMK } from '@/interfaces/extended_mk.interface';
// import { AllProducts, ProductExtensionMk } from '@/interfaces/product.interface';
import { Product } from './interfaces/product';
import { format, startOfDay } from 'date-fns';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
    if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    } else {
        return false;
    }
};

export const groupBy = <T>(array: T[], key: string): { [k: string]: T[] } => {
    // Return the end result
    return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
    }, {}); // empty object is the initial value for result object
};

/**
 * Calculates limit and offset for pagination
 * @param page Page number requested
 * @param size Max number of MKs to be displayed
 * @returns Object containing determined page and size
 */
export const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

/**
 * Overloaded method for preparing API res
 * @param data Object containing number of MKs and MK information
 * @param page Page number requested
 * @param limit Max number of MKs to be displayed
 * @param agg_column Column to aggregate data on
 * @returns Object containing API res
 */
export const getPagingData = <T>(data: { rows: T[]; count: number }, page: number, limit: number, agg_column: string) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const res = { totalItems, totalPages, currentPage, [agg_column]: rows };
    return res;
};

export const findFirstObjInArray = (arr, key, val) => arr.find(item => item[key] === val);

export const extractIDs = (items: Product[], idName: string): string[] => {
    return items.map(item => item[idName]);
};

export const dateNow = () => startOfDay(new Date());

export const isToday = date => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (typeof date === 'string') {
        return today === date;
    } else if (date instanceof Date) {
        return today === format(date, 'yyyy-MM-dd');
    }
};


