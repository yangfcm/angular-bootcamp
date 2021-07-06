import { ConvertPipe } from './convert.pipe';

describe('ConvertPipe', () => {
  let pipe: ConvertPipe;

  beforeEach(() => {
    pipe = new ConvertPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if no value provided', () => {
    const piped = pipe.transform(0);
    expect(piped).toBeNull();
  });

  it('should return the converted number', () => {
    const piped = pipe.transform(3);
    expect(piped).toBe(4.82802);
  });

  it('should return the converted number with digits', () => {
    const piped = pipe.transform(3, 2);
    expect(piped).toBe(4.83);
  });
});
