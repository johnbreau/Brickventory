import { BrickventoryPage } from './app.po';

describe('brickventory App', () => {
  let page: BrickventoryPage;

  beforeEach(() => {
    page = new BrickventoryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
