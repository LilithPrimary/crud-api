import { BASE_URL } from '../src/constants/BASE_URL';
import { ErrorMsg } from '../src/types/ErrorMsg';
import { Methods } from '../src/types/Methods';
import { URLValidator } from '../src/utils/URLValidator';

const url = BASE_URL;
const emptyURL = '';
const extraSlashURL = `${url}/`;
const extraParametersURL = `${url}/${emptyURL}/${url}`;

describe('Test URL Validator', () => {
  it('should throw error when empty url', () => {
    const methods = [Methods.GET, Methods.POST, Methods.PUT, Methods.DELETE];
    methods.forEach((method) => {
      const result = () => URLValidator(emptyURL, method);
      expect(result).toThrow(Error);
      expect(result).toThrow(ErrorMsg.NonExistingEndpoint);
    });
  });

  it('should throw error when url with extra slash', () => {
    const methods = [Methods.GET, Methods.POST];
    methods.forEach((method) => {
      const result = () => URLValidator(extraSlashURL, method);
      expect(result).toThrow(Error);
      expect(result).toThrow(ErrorMsg.NonExistingEndpoint);
    });
  });

  it('should throw error when url has too much parameters', () => {
    const methods = [Methods.GET, Methods.POST, Methods.PUT, Methods.DELETE];
    methods.forEach((method) => {
      const result = () => URLValidator(extraParametersURL, method);
      expect(result).toThrow(Error);
      expect(result).toThrow(ErrorMsg.NonExistingEndpoint);
    });
  });

  it('should throw error when url hasn\'t got enough parameters (PUT, DELETE)', () => {
    const methods = [Methods.PUT, Methods.DELETE];
    methods.forEach((method) => {
      const result = () => URLValidator(url, method);
      expect(result).toThrow(Error);
      expect(result).toThrow(ErrorMsg.NonExistingEndpoint);
    });
  });
});
