import { EshopPage } from './app.po';

describe('eshop App', () => {
  let page: EshopPage;

  beforeEach(() => {
    page = new EshopPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
