// import { ExtendedMK } from '@/interfaces/extended_mk.interface';
// import { AllProducts, ProductExtensionMk } from '@/interfaces/product.interface';
// import { MKPools } from '@interfaces/mk_pools.interface';
const { format, startOfDay } = require('date-fns');

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value) => {
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

const groupBy = (array, key) => {
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
const getPagination = (page, size) => {
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
const getPagingData = (data, page, limit, agg_column) => {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const res = { totalItems, totalPages, currentPage, [agg_column]: rows };
    return res;
};

const findFirstObjInArray = (arr, key, val) => arr.find(item => item[key] === val);

const extractIDs = (items, idName) => {
    return items.map(item => item[idName]);
};

const dateNow = () => startOfDay(new Date());

const isToday = date => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (typeof date === 'string') {
        return today === date;
    } else if (date instanceof Date) {
        return today === format(date, 'yyyy-MM-dd');
    }
};


module.exports = {
    isEmpty,
    groupBy,
    getPagination,
    getPagingData,
    findFirstObjInArray,
    extractIDs,
    dateNow,
    isToday
};
