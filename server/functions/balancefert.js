const cropCompositions = require("../composition/cropcompo");
const fertilizerCompositions = require('../composition/ferticompo');

function balancefert(predictedFert, crop, userN, userP, userK) {
    const required = cropCompositions[crop];
    const predicted = fertilizerCompositions[predictedFert.replace(/\.$/, '').trim()];

    if (!required || !predicted) {
        throw new Error("Invalid crop or fertilizer name");
    }

    const needed = {
        N: required.N - userN,
        P: required.P - userP,
        K: required.K - userK
    };

    const applyRatios = [];

    if (predicted.N > 0 && needed.N > 0)
        applyRatios.push(needed.N / (predicted.N / 100));
    if (predicted.P > 0 && needed.P > 0)
        applyRatios.push(needed.P / (predicted.P / 100));
    if (predicted.K > 0 && needed.K > 0)
        applyRatios.push(needed.K / (predicted.K / 100));

    const fixedFertKg = applyRatios.length > 0 ? Math.ceil(Math.max(...applyRatios)) : 0;

    console.log(fixedFertKg);
    const fulfilled = {
        N: (predicted.N / 100) * fixedFertKg,
        P: (predicted.P / 100) * fixedFertKg,
        K: (predicted.K / 100) * fixedFertKg
    };

    const remaining = {
        N: Math.max(0, required.N - (userN + fulfilled.N)),
        P: Math.max(0, required.P - (userP + fulfilled.P)),
        K: Math.max(0, required.K - (userK + fulfilled.K))
    };

    const suggestions = [];

    for (const [name, comp] of Object.entries(fertilizerCompositions)) {
        if (name === predictedFert) continue;

        let requiredKg = 0;

        // Suggest based on highest requirement among available nutrients
        const nRatio = (comp.N > 0 && remaining.N > 0) ? remaining.N / (comp.N / 100) : 0;
        const pRatio = (comp.P > 0 && remaining.P > 0) ? remaining.P / (comp.P / 100) : 0;
        const kRatio = (comp.K > 0 && remaining.K > 0) ? remaining.K / (comp.K / 100) : 0;

        const maxRatio = Math.max(nRatio, pRatio, kRatio);

        if (maxRatio > 0) {
            requiredKg = Math.ceil(maxRatio);
            suggestions.push({
                name,
                N: comp.N,
                P: comp.P,
                K: comp.K,
                requiredKgPerHa: parseFloat(requiredKg.toFixed(2))
            });

            // Update remaining after applying this suggestion
            remaining.N = Math.max(0, remaining.N - (comp.N / 100) * requiredKg);
            remaining.P = Math.max(0, remaining.P - (comp.P / 100) * requiredKg);
            remaining.K = Math.max(0, remaining.K - (comp.K / 100) * requiredKg);

            if (remaining.N <= 0 && remaining.P <= 0 && remaining.K <= 0) break;
        }
    }

    return {
        fixedFertilizer: {
            name: predictedFert,
            appliedKgPerHa: parseFloat(fixedFertKg.toFixed(2))
        },
        remaining,
        suggestions
    };
}

module.exports = balancefert;
