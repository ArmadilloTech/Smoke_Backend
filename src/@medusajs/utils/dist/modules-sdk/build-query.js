"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = void 0;
var common_1 = require("../common");
var dal_1 = require("../dal");
function buildQuery(filters, config) {
    var _a, _b, _c, _d;
    if (filters === void 0) { filters = {}; }
    if (config === void 0) { config = {}; }
    var where = {};
    buildWhere(filters, where);
    var primaryKeyFieldArray = (0, common_1.isDefined)(config.primaryKeyFields)
        ? !Array.isArray(config.primaryKeyFields)
            ? [config.primaryKeyFields]
            : config.primaryKeyFields
        : ["id"];
    var whereHasPrimaryKeyFields = primaryKeyFieldArray.some(function (pkField) { return !!where[pkField]; });
    var defaultLimit = whereHasPrimaryKeyFields ? undefined : 15;
    delete config.primaryKeyFields;
    var findOptions = {
        populate: (0, common_1.deduplicate)((_a = config.relations) !== null && _a !== void 0 ? _a : []),
        fields: config.select,
        limit: (Number.isSafeInteger(config.take) && config.take >= 0) ||
            null === config.take
            ? (_b = config.take) !== null && _b !== void 0 ? _b : undefined
            : defaultLimit,
        offset: (Number.isSafeInteger(config.skip) && config.skip >= 0) ||
            null === config.skip
            ? (_c = config.skip) !== null && _c !== void 0 ? _c : undefined
            : 0,
    };
    if (config.order) {
        findOptions.orderBy = config.order;
    }
    if (config.withDeleted) {
        (_d = findOptions.filters) !== null && _d !== void 0 ? _d : (findOptions.filters = {});
        findOptions.filters[dal_1.SoftDeletableFilterKey] = {
            withDeleted: true,
        };
    }
    return { where: where, options: findOptions };
}
exports.buildQuery = buildQuery;
function buildWhere(filters, where) {
    var e_1, _a;
    if (filters === void 0) { filters = {}; }
    if (where === void 0) { where = {}; }
    try {
        for (var _b = __values(Object.entries(filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), prop = _d[0], value = _d[1];
            if (["$or", "$and"].includes(prop)) {
                where[prop] = value.map(function (val) {
                    var deepWhere = {};
                    buildWhere(val, deepWhere);
                    return deepWhere;
                });
                continue;
            }
            if (Array.isArray(value)) {
                value = (0, common_1.deduplicate)(value);
                where[prop] = ["$in", "$nin"].includes(prop) ? value : { $in: value };
                continue;
            }
            if ((0, common_1.isObject)(value)) {
                where[prop] = {};
                buildWhere(value, where[prop]);
                continue;
            }
            where[prop] = value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
//# sourceMappingURL=build-query.js.map