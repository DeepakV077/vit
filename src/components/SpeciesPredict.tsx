// This file previously contained a large, updated SpeciesPredict implementation.
// It was causing a parser error due to trailing corrupted tokens. To avoid
// build-time parse issues we now re-export the cleaned implementation that
// lives in SpeciesPredictClean.tsx.

export { SpeciesPredict } from './SpeciesPredictClean';

export default SpeciesPredict;
