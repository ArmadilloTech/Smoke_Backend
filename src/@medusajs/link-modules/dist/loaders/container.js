"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerLoader = void 0;
const _repositories_1 = require("../repositories");
const _services_1 = require("../services");
const awilix_1 = require("awilix");
function containerLoader(entity, joinerConfig) {
    return async ({ options, container, }, moduleDeclaration) => {
        const [primary, foreign] = joinerConfig.relationships;
        container.register({
            joinerConfig: (0, awilix_1.asValue)(joinerConfig),
            primaryKey: (0, awilix_1.asValue)(primary.foreignKey.split(",")),
            foreignKey: (0, awilix_1.asValue)(foreign.foreignKey),
            extraFields: (0, awilix_1.asValue)(Object.keys(joinerConfig.databaseConfig?.extraFields || {})),
            linkModuleService: (0, awilix_1.asClass)((0, _services_1.getModuleService)(joinerConfig)).singleton(),
            linkService: (0, awilix_1.asClass)(_services_1.LinkService).singleton(),
            baseRepository: (0, awilix_1.asClass)(_repositories_1.BaseRepository).singleton(),
            linkRepository: (0, awilix_1.asClass)((0, _repositories_1.getLinkRepository)(entity)).singleton(),
        });
    };
}
exports.containerLoader = containerLoader;
