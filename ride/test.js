const auctionDuration = 1;

const WAVES = 10 ** 8;

const SETSCRIPT_FEE = 1400000;
const ISSUE_FEE = 0.01 * WAVES;
const INV_FEE = 0.005 * WAVES;
const ADD_FEE = 0.004 * WAVES;

const MIN_BID = 100000;
const DEPOSIT = 100000 * 2;

const SALT = '123';
const HASH = '6b5T4LvLek31XvgaAEemH7h6xhhlfdpCB2kBI6SLnDo='; // base64(hash(SALT + MIN_BID.toString()))

var issueTxId;
var auctionId;
var auctionStartTx;
var customer2Before;
var revealStart;

async function rememberBalances(text, forAddress, tokenId) {
  const tokenBal = await assetBalance(tokenId, forAddress);
  const wavesBal = await balance(forAddress);

  console.log(text + ': ' + wavesBal + ' WAVES, ' + tokenBal + ' NFT');

  return [wavesBal, tokenBal];
}

describe('Auction test Suite', async function() {
  this.timeout(100000);

  before(async function() {
    await setupAccounts(
      {
        auction: SETSCRIPT_FEE,
        customer1: ISSUE_FEE + 3 * INV_FEE,
        customer2: 3 * INV_FEE,
        customer3: 3 * INV_FEE,
      },
      {
        masterSeed:
          'toilet decade kick ready access merge skull achieve state visual diary label',
      }
    );

    const compiledDApp = compile(file('file_1.ride'));

    const ssTx = setScript(
      { script: compiledDApp, fee: SETSCRIPT_FEE },
      accounts.auction
    );

    console.log('[Auction] Signed');

    await broadcast(ssTx);

    console.log('[Auction] Broadcasted');

    const issueTx = issue(
      {
        name: 'MyNFTtest',
        description: '',
        quantity: 1,
        decimals: 0,
        reissuable: false,
        fee: ISSUE_FEE,
      },
      accounts.customer1
    );

    console.log('[NFT] Signed');

    await broadcast(issueTx);

    console.log('[NFT] Broadcasted');

    await waitForTx(issueTx.id);

    console.log('[NFT] Mined');

    issueTxId = issueTx.id;
    console.log('[NFT] Token id: ' + issueTxId);
    await waitForTx(ssTx.id);

    console.log('[Auction] Mined');
    console.log('[Auction] id: ' + ssTx.id);
  });

  it('Customer1: Start Auction', async function() {
    const invTx = invokeScript(
      {
        fee: INV_FEE,
        dApp: address(accounts.auction),
        call: {
          function: '  ',
          args: [
            { type: 'integer', value: auctionDuration },
            { type: 'integer', value: 100000 },
            { type: 'string', value: 'WAVES' },
            { type: 'integer', value: 200000 },
          ],
        },
        payment: [{ amount: 1, assetId: issueTxId }],
      },
      accounts.customer1
    );

    console.log('[Start Auction] Created');
    await broadcast(invTx);

    console.log('[Start Auction] Broadcasted');

    auctionStartTx = await waitForTx(invTx.id);

    console.log('[Start Auction] Mined');

    auctionId = auctionStartTx.id;

    console.log('Start auction height : ' + auctionStartTx.height);

    revealStart = auctionStartTx.height + auctionDuration;

    console.log('Reveal start auction height : ' + revealStart);
  });

  it('Customer2: Bid Auction', async function() {
    const invTx = invokeScript(
      {
        fee: INV_FEE,
        dApp: address(accounts.auction),
        call: {
          function: 'bid',
          args: [
            { type: 'string', value: auctionId },
            { type: 'string', value: HASH },
          ],
        },
        payment: [{ amount: DEPOSIT }],
      },
      accounts.customer2
    );

    console.log('[Bid Customer 2 Created');
    await broadcast(invTx);

    console.log('[Bid Customer 2] Broadcasted');

    auctionStartTx = await waitForTx(invTx.id);

    console.log('[Bid Customer 2] Mined');

    console.log('Bid Customer 2 : ' + auctionStartTx.height);
  });

  it('Customer3: Bid Auction', async function() {
    const invTx = invokeScript(
      {
        fee: INV_FEE,
        dApp: address(accounts.auction),
        call: {
          function: 'bid',
          args: [
            { type: 'string', value: auctionId },
            { type: 'string', value: HASH },
          ],
        },
        payment: [{ amount: DEPOSIT }],
      },
      accounts.customer3
    );

    console.log('[Bid Customer 3 Created');
    await broadcast(invTx);

    console.log('[Bid Customer 3] Broadcasted');

    auctionStartTx = await waitForTx(invTx.id);

    console.log('[Bid Customer 3] Mined');

    console.log('Bid Customer 3 : ' + auctionStartTx.height);
  });

  it('Customer2: Reveal Auction', async function() {
    const timeout = 180000;
    this.timeout(timeout);

    console.log(
      '[Reveal Customer] 2 Wait for reveal at ' +
        revealStart +
        ' now ' +
        (await currentHeight())
    );
    await waitForHeight(revealStart);

    const invTx = invokeScript(
      {
        fee: INV_FEE,
        dApp: address(accounts.auction),
        call: {
          function: 'reveal',
          args: [
            { type: 'string', value: auctionId },
            { type: 'integer', value: MIN_BID },
            { type: 'string', value: SALT },
          ],
        },
      },
      accounts.customer2
    );

    console.log('[Reveal Customer 2 Created');
    await broadcast(invTx);

    console.log('[Reveal Customer 2] Broadcasted');

    auctionStartTx = await waitForTx(invTx.id);

    console.log('[Reveal Customer 2] Mined');

    console.log('Reveal Customer 2 : ' + auctionStartTx.height);
  });

  it('Customer3: Reveal Auction', async function() {
    const timeout = 180000;
    this.timeout(timeout);

    console.log(
      '[Reveal Customer] 3 Wait for reveal at ' +
        revealStart +
        ' now ' +
        (await currentHeight())
    );
    await waitForHeight(revealStart);

    const invTx = invokeScript(
      {
        fee: INV_FEE,
        dApp: address(accounts.auction),
        call: {
          function: 'reveal',
          args: [
            { type: 'string', value: auctionId },
            { type: 'integer', value: MIN_BID },
            { type: 'string', value: SALT },
          ],
        },
      },
      accounts.customer3
    );

    console.log('[Reveal Customer 3 Created');
    await broadcast(invTx);

    console.log('[Reveal Customer 3] Broadcasted');

    auctionStartTx = await waitForTx(invTx.id);

    console.log('[Reveal Customer 3] Mined');

    console.log('Reveal Customer 3 : ' + auctionStartTx.height);
  });

  it('Customer2: Withdraw', async function() {
    const timeout = 180000;
    this.timeout(timeout);

    console.log('[Withdraw Customer] 2 Withdtaw');

    const invTx = invokeScript(
      {
        fee: INV_FEE,
        dApp: address(accounts.auction),
        call: {
          function: 'withdraw',
          args: [{ type: 'string', value: auctionId }],
        },
      },
      accounts.customer2
    );

    console.log('[Withdraw Customer 2 Created');
    await broadcast(invTx);

    console.log('[Withdraw Customer 2] Broadcasted');

    auctionStartTx = await waitForTx(invTx.id);

    console.log('[Withdraw Customer 2] Mined');

    console.log('Withdraw Customer 2 : ' + auctionStartTx.height);
  });
});
