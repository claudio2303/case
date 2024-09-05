import { CategoryEnum } from "../_interfaces/category.enum";
import { CaseFilterPipe } from "./search.pipe";

describe('CaseFilterPipe', () => {
  let casePipe: CaseFilterPipe;
  beforeEach(() => {
    casePipe = new CaseFilterPipe();
  });
  it('create an instance', () => {
    expect(casePipe).toBeTruthy();
  });
  it('should search for name and find one item', () => {
    expect(casePipe.transform([
      {
        code: '12',
        category: CategoryEnum.WHOLESALE,
        name: 'Testes'
      },
      {
        code: '11',
        category: CategoryEnum.WHOLESALE,
        name: 'Casa'
      }
    ], {
      code: '',
      category:'',
      name: 'Testes'
    })).toEqual([{
      code: '12',
      category: CategoryEnum.WHOLESALE,
      name: 'Testes'
    }]);
  });
});
