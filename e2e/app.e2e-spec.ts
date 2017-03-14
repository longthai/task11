import { Task6Page } from './app.po';

describe('task6 App', function() {
  let page: Task6Page;

  beforeEach(() => {
    page = new Task6Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
