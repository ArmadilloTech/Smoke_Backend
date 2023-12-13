"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareUpdatePriceLists = void 0;
async function prepareUpdatePriceLists({ container, data, }) {
    const { price_lists: priceListsData } = data;
    const remoteQuery = container.resolve("remoteQuery");
    const variantPriceSetMap = new Map();
    const priceListPricesMap = new Map();
    const variantIds = priceListsData
        .map((priceListData) => priceListData.prices?.map((p) => p.variant_id))
        .flat();
    const variables = {
        variant_id: variantIds,
        take: null,
    };
    const query = {
        product_variant_price_set: {
            __args: variables,
            fields: ["variant_id", "price_set_id"],
        },
    };
    const variantPriceSets = await remoteQuery(query);
    for (const { variant_id, price_set_id } of variantPriceSets) {
        variantPriceSetMap.set(variant_id, price_set_id);
    }
    const priceLists = priceListsData.map((priceListData) => {
        const priceListPrices = [];
        priceListData.prices?.forEach((price) => {
            const { variant_id, ...priceData } = price;
            if (!variant_id) {
                return;
            }
            priceListPrices.push({
                id: priceData.id,
                price_set_id: variantPriceSetMap.get(variant_id),
                currency_code: priceData.currency_code,
                amount: priceData.amount,
                min_quantity: priceData.min_quantity,
                max_quantity: priceData.max_quantity,
            });
            return;
        });
        priceListPricesMap.set(priceListData.id, priceListPrices);
        delete priceListData?.prices;
        const priceListDataClone = {
            ...priceListData,
        };
        if (priceListData.name) {
            priceListDataClone.title = priceListData.name;
        }
        return priceListDataClone;
    });
    return { priceLists, priceListPricesMap };
}
exports.prepareUpdatePriceLists = prepareUpdatePriceLists;
prepareUpdatePriceLists.aliases = {
    payload: "prepare",
};
//# sourceMappingURL=prepare-update-price-lists.js.map