import { InjectionToken } from '@angular/core';
import { EnvironmentProperties } from './environment-properties';

export const ENVIRONMENT = new InjectionToken<EnvironmentProperties>('environment');
