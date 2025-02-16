import { register } from 'tsconfig-paths';
import { compilerOptions } from '../tsconfig.json';

// Registra los path aliases definidos en tsconfig.json
register({
  baseUrl: compilerOptions.baseUrl,
  paths: compilerOptions.paths
});
