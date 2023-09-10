export interface IShippingOrderSettings {
    opening_cost: number;
    small_package_per_km_cost: number;
    medium_package_per_km_cost: number;
    large_package_per_km_cost: number;
    light_package_per_km_cost_percentage_multiplier: number;
    medium_package_per_km_cost_percentage_multiplier: number;
    heavy_package_per_km_cost_percentage_multiplier: number;
}
