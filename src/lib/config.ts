// Each backend service is deployed separately on Render with its own URL —
// keep them here instead of scattering hardcoded hosts across API call sites.
export const IDENTITY_API_BASE_URL = "https://gamebackend-mbqb.onrender.com";
export const CATALOG_API_BASE_URL = "https://gamebackend-catalog-api.onrender.com";
