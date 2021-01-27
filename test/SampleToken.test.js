const SampleToken = artifacts.require('SampleToken');
require('chai').use(require('chai-as-promised')).should();

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('Sample Token', ([owner, investor, investor2, investor3]) => {
  let sampleToken;

  before(async () => {
    // Load Contracts
    sampleToken = await SampleToken.new();
  });

  describe('Sample Token deployment & testing', async () => {
    it('has a name', async () => {
      const name = await sampleToken.name();
      assert.equal(name, 'Sample Token');
    });

    it('has a total supply', async () => {
      const totalSupply = await sampleToken.totalSupply();
      assert.equal(totalSupply, 75000 * 10 ** 18);
    });

    it('has a decimal of', async () => {
      const decimal = await sampleToken.decimals();
      assert.equal(decimal, 18);
    });

    it('transfer token from owner to investor', async () => {
      await sampleToken.transfer(investor, tokens('100'), { from: owner });
      const balanceOfInvestor = await sampleToken.balanceOf(investor);
      assert.equal(balanceOfInvestor, tokens('100'));
    });

    it('Provide approve and check allowance from investor to investor2', async () => {
      await sampleToken.approve(investor2, tokens('100'), { from: investor });
      const allowance = await sampleToken.allowance(investor, investor2, {
        from: investor,
      });
      assert.equal(allowance, tokens('100'));
    });

    it('Provide approve and check allowance from investor to investor2', async () => {
      await sampleToken.approve(investor2, tokens('100'), { from: investor });
      const allowance = await sampleToken.allowance(investor, investor2, {
        from: investor,
      });
      assert.equal(allowance, tokens('100'));
    });

    it('Do transfer on behalf of investor to investor3 ', async () => {
      await sampleToken.transferFrom(investor, investor3, tokens('100'), {
        from: investor2,
      });
      const balanceOfInvestor = await sampleToken.balanceOf(investor3);
      assert.equal(balanceOfInvestor, tokens('100'));
    });
  });
});
