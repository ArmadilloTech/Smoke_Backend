"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
const utils_2 = require("../utils");
class LinkModuleService {
    constructor({ baseRepository, linkService, primaryKey, foreignKey, extraFields, }, moduleDeclaration) {
        this.moduleDeclaration = moduleDeclaration;
        this.baseRepository_ = baseRepository;
        this.linkService_ = linkService;
        this.primaryKey_ = !Array.isArray(primaryKey) ? [primaryKey] : primaryKey;
        this.foreignKey_ = foreignKey;
        this.extraFields_ = extraFields;
    }
    __joinerConfig() {
        return {};
    }
    buildData(primaryKeyData, foreignKeyData, extra = {}) {
        if (this.primaryKey_.length > 1) {
            if (!Array.isArray(primaryKeyData) ||
                primaryKeyData.length !== this.primaryKey_.length) {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Primary key data must be an array ${this.primaryKey_.length} values`);
            }
        }
        const pk = this.primaryKey_.join(",");
        return {
            [pk]: primaryKeyData,
            [this.foreignKey_]: foreignKeyData,
            ...extra,
        };
    }
    isValidKeyName(name) {
        return this.primaryKey_.concat(this.foreignKey_).includes(name);
    }
    validateFields(data) {
        const keys = Object.keys(data);
        if (!keys.every((k) => this.isValidKeyName(k))) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, `Invalid field name provided. Valid field names are ${this.primaryKey_.concat(this.foreignKey_)}`);
        }
    }
    async retrieve(primaryKeyData, foreignKeyData, sharedContext = {}) {
        const filter = this.buildData(primaryKeyData, foreignKeyData);
        const queryOptions = utils_1.ModulesSdkUtils.buildQuery(filter);
        const entry = await this.linkService_.list(queryOptions, {}, sharedContext);
        if (!entry?.length) {
            const pk = this.primaryKey_.join(",");
            const errMessage = `${pk}[${primaryKeyData}] and ${this.foreignKey_}[${foreignKeyData}]`;
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_FOUND, `Entry ${errMessage} was not found`);
        }
        return entry[0];
    }
    async list(filters = {}, config = {}, sharedContext = {}) {
        if (!(0, utils_1.isDefined)(config.take)) {
            config.take = null;
        }
        const rows = await this.linkService_.list(filters, config, sharedContext);
        return await this.baseRepository_.serialize(rows);
    }
    async listAndCount(filters = {}, config = {}, sharedContext = {}) {
        if (!(0, utils_1.isDefined)(config.take)) {
            config.take = null;
        }
        const [rows, count] = await this.linkService_.listAndCount(filters, config, sharedContext);
        return [await this.baseRepository_.serialize(rows), count];
    }
    async create(primaryKeyOrBulkData, foreignKeyData, extraFields, sharedContext = {}) {
        const data = [];
        if (foreignKeyData === undefined && Array.isArray(primaryKeyOrBulkData)) {
            for (const [primaryKey, foreignKey, extra] of primaryKeyOrBulkData) {
                data.push(this.buildData(primaryKey, foreignKey, extra));
            }
        }
        else {
            data.push(this.buildData(primaryKeyOrBulkData, foreignKeyData, extraFields));
        }
        const links = await this.linkService_.create(data, sharedContext);
        return await this.baseRepository_.serialize(links);
    }
    async dismiss(primaryKeyOrBulkData, foreignKeyData, sharedContext = {}) {
        const data = [];
        if (foreignKeyData === undefined && Array.isArray(primaryKeyOrBulkData)) {
            for (const [primaryKey, foreignKey] of primaryKeyOrBulkData) {
                data.push(this.buildData(primaryKey, foreignKey));
            }
        }
        else {
            data.push(this.buildData(primaryKeyOrBulkData, foreignKeyData));
        }
        const links = await this.linkService_.dismiss(data, sharedContext);
        return await this.baseRepository_.serialize(links);
    }
    async delete(data, sharedContext = {}) {
        this.validateFields(data);
        await this.linkService_.delete(data, sharedContext);
    }
    async softDelete(data, { returnLinkableKeys } = {}, sharedContext = {}) {
        this.validateFields(data);
        let [, cascadedEntitiesMap] = await this.softDelete_(data, sharedContext);
        const pk = this.primaryKey_.join(",");
        const entityNameToLinkableKeysMap = {
            LinkModel: [
                { mapTo: pk, valueFrom: pk },
                { mapTo: this.foreignKey_, valueFrom: this.foreignKey_ },
            ],
        };
        let mappedCascadedEntitiesMap;
        if (returnLinkableKeys) {
            // Map internal table/column names to their respective external linkable keys
            // eg: product.id = product_id, variant.id = variant_id
            mappedCascadedEntitiesMap = (0, utils_1.mapObjectTo)(cascadedEntitiesMap, entityNameToLinkableKeysMap, {
                pick: returnLinkableKeys,
            });
        }
        return mappedCascadedEntitiesMap ? mappedCascadedEntitiesMap : void 0;
    }
    async softDelete_(data, sharedContext = {}) {
        return await this.linkService_.softDelete(data, sharedContext);
    }
    async restore(data, { returnLinkableKeys } = {}, sharedContext = {}) {
        this.validateFields(data);
        let [, cascadedEntitiesMap] = await this.restore_(data, sharedContext);
        const pk = this.primaryKey_.join(",");
        const entityNameToLinkableKeysMap = {
            LinkModel: [
                { mapTo: pk, valueFrom: pk },
                { mapTo: this.foreignKey_, valueFrom: this.foreignKey_ },
            ],
        };
        let mappedCascadedEntitiesMap;
        if (returnLinkableKeys) {
            // Map internal table/column names to their respective external linkable keys
            // eg: product.id = product_id, variant.id = variant_id
            mappedCascadedEntitiesMap = (0, utils_1.mapObjectTo)(cascadedEntitiesMap, entityNameToLinkableKeysMap, {
                pick: returnLinkableKeys,
            });
        }
        return mappedCascadedEntitiesMap ? mappedCascadedEntitiesMap : void 0;
    }
    async restore_(data, sharedContext = {}) {
        return await this.linkService_.restore(data, sharedContext);
    }
}
exports.default = LinkModuleService;
__decorate([
    (0, utils_1.InjectManager)("baseRepository_"),
    __param(2, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "retrieve", null);
__decorate([
    (0, utils_1.InjectManager)("baseRepository_"),
    __param(2, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "list", null);
__decorate([
    (0, utils_1.InjectManager)("baseRepository_"),
    __param(2, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "listAndCount", null);
__decorate([
    (0, utils_1.InjectTransactionManager)(utils_2.shouldForceTransaction, "baseRepository_"),
    __param(3, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "create", null);
__decorate([
    (0, utils_1.InjectTransactionManager)(utils_2.shouldForceTransaction, "baseRepository_"),
    __param(2, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "dismiss", null);
__decorate([
    (0, utils_1.InjectTransactionManager)(utils_2.shouldForceTransaction, "baseRepository_"),
    __param(1, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "delete", null);
__decorate([
    (0, utils_1.InjectTransactionManager)(utils_2.shouldForceTransaction, "baseRepository_"),
    __param(1, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "softDelete_", null);
__decorate([
    (0, utils_1.InjectTransactionManager)(utils_2.shouldForceTransaction, "baseRepository_"),
    __param(1, (0, utils_1.MedusaContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LinkModuleService.prototype, "restore_", null);
