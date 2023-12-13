"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.AdminGetProductParams = exports.getProductWithIsolatedProductModule = void 0;
var utils_1 = require("@medusajs/utils");
var common_1 = require("../../../../types/common");
var index_1 = require("./index");
/**
 * @oas [get] /admin/products/{id}
 * operationId: "GetProductsProduct"
 * summary: "Get a Product"
 * description: "Retrieve a Product's details."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Product.
 * x-codegen:
 *   method: retrieve
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.products.retrieve(productId)
 *       .then(({ product }) => {
 *         console.log(product.id);
 *       })
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl '{backend_url}/admin/products/{id}' \
 *       -H 'x-medusa-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Products
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminProductsRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 *   "404":
 *     $ref: "#/components/responses/not_found_error"
 *   "409":
 *     $ref: "#/components/responses/invalid_state_error"
 *   "422":
 *     $ref: "#/components/responses/invalid_request_error"
 *   "500":
 *     $ref: "#/components/responses/500_error"
 */
exports.default = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productService, pricingService, featureFlagRouter, productVariantInventoryService, salesChannelService, rawProduct, shouldSetPricing, product, decoratePromises, shouldSetAvailability, _a, salesChannelsIds;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                productService = req.scope.resolve("productService");
                pricingService = req.scope.resolve("pricingService");
                featureFlagRouter = req.scope.resolve("featureFlagRouter");
                productVariantInventoryService = req.scope.resolve("productVariantInventoryService");
                salesChannelService = req.scope.resolve("salesChannelService");
                if (!featureFlagRouter.isFeatureEnabled(utils_1.MedusaV2Flag.key)) return [3 /*break*/, 2];
                return [4 /*yield*/, getProductWithIsolatedProductModule(req, id, req.retrieveConfig)];
            case 1:
                rawProduct = _c.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, productService.retrieve(id, req.retrieveConfig)];
            case 3:
                rawProduct = _c.sent();
                _c.label = 4;
            case 4:
                shouldSetPricing = ["variants", "variants.prices"].every(function (relation) { var _a; return (_a = req.retrieveConfig.relations) === null || _a === void 0 ? void 0 : _a.includes(relation); });
                product = rawProduct;
                decoratePromises = [];
                if (shouldSetPricing) {
                    decoratePromises.push(pricingService.setAdminProductPricing([product]));
                }
                shouldSetAvailability = (_b = req.retrieveConfig.relations) === null || _b === void 0 ? void 0 : _b.includes("variants");
                if (!shouldSetAvailability) return [3 /*break*/, 6];
                return [4 /*yield*/, salesChannelService.listAndCount({}, { select: ["id"] })];
            case 5:
                _a = __read.apply(void 0, [_c.sent(), 1]), salesChannelsIds = _a[0];
                decoratePromises.push(productVariantInventoryService.setProductAvailability([product], salesChannelsIds.map(function (salesChannel) { return salesChannel.id; })));
                _c.label = 6;
            case 6: return [4 /*yield*/, (0, utils_1.promiseAll)(decoratePromises)];
            case 7:
                _c.sent();
                res.json({ product: product });
                return [2 /*return*/];
        }
    });
}); });
function getProductWithIsolatedProductModule(req, id, retrieveConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var remoteQuery, variables, query, _b, product;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    remoteQuery = req.scope.resolve("remoteQuery");
                    variables = { id: id };
                    query = {
                        product: __assign({ __args: variables }, index_1.defaultAdminProductRemoteQueryObject),
                    };
                    return [4 /*yield*/, remoteQuery(query)];
                case 1:
                    _b = __read.apply(void 0, [_c.sent(), 1]), product = _b[0];
                    if (!product) {
                        throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_FOUND, "Product with id: ".concat(id, " not found"));
                    }
                    product.profile_id = (_a = product.profile) === null || _a === void 0 ? void 0 : _a.id;
                    return [2 /*return*/, product];
            }
        });
    });
}
exports.getProductWithIsolatedProductModule = getProductWithIsolatedProductModule;
var AdminGetProductParams = /** @class */ (function (_super) {
    __extends(AdminGetProductParams, _super);
    function AdminGetProductParams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AdminGetProductParams;
}(common_1.FindParams));
exports.AdminGetProductParams = AdminGetProductParams;
//# sourceMappingURL=get-product.js.map