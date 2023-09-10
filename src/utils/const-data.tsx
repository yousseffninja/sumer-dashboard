// export const fromCities = [
//     {
//         id: 1,
//         name: "New York",
//         country: "United States",
//     },
//     {
//         id: 2,
//         name: "Los Angeles",
//         country: "United States",
//     },
//     {
//         id: 3,
//         name: "Chicago",
//         country: "United States",
//     },
//     {
//         id: 4,
//         name: "Houston",
//         country: "United States",
//     }
// ]

// export const toCities = [
//     {
//         id: 1,
//         name: "New York",
//         country: "United States",
//     },
//     {
//         id: 2,
//         name: "Los Angeles",
//         country: "United States",
//     },
//     {
//         id: 3,
//         name: "Chicago",
//         country: "United States",
//     },
//     {
//         id: 4,
//         name: "Houston",
//         country: "United States",
//     }
// ]
export const intialSizes = [
    {
        id: 1,
        name: "Small",
        cost: 0
    },
    {
        id: 2,
        name: "Medium",
        cost: 0
    },
    {
        id: 3,
        name: "Large",
        cost: 0
    },
]
export const weights = [
    {
        id: 1,
        name: "Small",
        weight: 0
    },
    {
        id: 2,
        name: "Medium",
        weight: 0
    },
    {
        id: 3,
        name: "Large",
        weight: 0
    },
]

export const createSizes = (small_package_per_km_cost = 0, medium_package_per_km_cost = 0, large_package_per_km_cost = 0) => {
    return (
        [{
            id: 1,
            name: "Small",
            cost: small_package_per_km_cost
        },
        {
            id: 2,
            name: "Medium",
            cost: medium_package_per_km_cost
        },
        {
            id: 3,
            name: "Large",
            cost: large_package_per_km_cost
        }]
    )
}

export const createWeights = (light_package_per_km_cost_percentage_multiplier = 0, medium_package_per_km_cost_percentage_multiplier = 0, heavy_package_per_km_cost_percentage_multiplier = 0) => {
    return (
        [{
            id: 1,
            name: "Light",
            cost: light_package_per_km_cost_percentage_multiplier
        },
        {
            id: 2,
            name: "Medium",
            cost: medium_package_per_km_cost_percentage_multiplier
        },
        {
            id: 3,
            name: "Heavy",
            cost: heavy_package_per_km_cost_percentage_multiplier
        }]
    )
}


