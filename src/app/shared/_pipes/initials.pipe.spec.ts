import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let initialsPipe: InitialsPipe;
  beforeEach(() => {
    initialsPipe = new InitialsPipe();
  });
  it('create an instance', () => {
    expect(initialsPipe).toBeTruthy();
  });
  it('transform 1 word 2 first letters', () => {
    expect(initialsPipe.transform('Teste')).toBe('TE');
  });
  it('transform 2 words 2 first letters', () => {
    expect(initialsPipe.transform('Teste Hoje')).toBe('TH');
  });
});
