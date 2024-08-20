import packageJson from '../../package.json';

export interface BrandConfig {
  description: string;

  name: string;

  version: string;
}

const BRAND_CONFIG: BrandConfig = {
  name: 'aigraphr',
  version: packageJson.version,
  description: packageJson.description
};

export const getBrandConfig = (): BrandConfig => {
  return BRAND_CONFIG;
};
