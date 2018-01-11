export abstract class CookiesService {
  abstract set(key: string, value: string);

  abstract get(key: string): string;
}
