window.FruitBankAccounts = {
  apple: {
    badge: 'Basic',
    emoji: '🍎',
    title: 'Apple Basic Saving',
    rate: '2.5%',
    rateLabel: '2.5% Annual interest rate',
    bodyClass: 'apple',
    features: [
      'No monthly maintenance fees',
      '$0 minimum opening deposit',
      'Free online & mobile banking',
      'Up to 6 withdrawals/month',
      '24/7 customer support'
    ],
    stats: [
      { val: '2.5%', desc: 'Annual interest rate' },
      { val: '$0', desc: 'Min. Balance' },
      { val: 'Free', desc: 'Transfers' },
      { val: 'Protected', desc: 'Deposit insurance' }
    ],
    ctaTitle: 'Ready to start saving? 🍎',
    ctaDesc: 'Open your Apple Basic Saving account in minutes. No paperwork, no hassle — just great rates.',
    deepLink: 'apple_saving',
    highlights: [
      'No monthly maintenance fees',
      '$0 minimum opening deposit',
      '24/7 customer support'
    ]
  },
  banana: {
    badge: '★ Most Popular',
    emoji: '🍌',
    title: 'Banana Premium Saving',
    rate: '4.2%',
    rateLabel: '4.2% Annual interest rate',
    bodyClass: 'banana',
    features: [
      'Fees waived with $1,000 balance',
      'Priority customer support',
      'Cashback on debit purchases',
      'Unlimited withdrawals',
      'Wealth dashboard included'
    ],
    stats: [
      { val: '4.2%', desc: 'Annual interest rate' },
      { val: '$1K', desc: 'Min. Balance' },
      { val: 'Cash', desc: 'Rewards' },
      { val: 'Protected', desc: 'Deposit insurance' }
    ],
    ctaTitle: 'Grow more, earn more 🍌',
    ctaDesc: 'The Banana Premium account is our most popular — enjoy higher yields and exclusive perks.',
    deepLink: 'banana_saving',
    highlights: [
      'Fees waived with $1,000 balance',
      'Priority customer support',
      'Cashback on debit purchases'
    ]
  },
  peach: {
    badge: 'Super Saver',
    emoji: '🍑',
    title: 'Peach Super Saving',
    rate: '5.8%',
    rateLabel: '5.8% Annual interest rate',
    bodyClass: 'peach',
    features: [
      'Premium wealth management tools',
      'Dedicated relationship manager',
      'Travel insurance included',
      'Global ATM fee reimbursement',
      'Concierge banking service'
    ],
    stats: [
      { val: '5.8%', desc: 'Annual interest rate' },
      { val: '$10K', desc: 'Min. Balance' },
      { val: 'VIP', desc: 'Service' },
      { val: 'Protected', desc: 'Deposit insurance' }
    ],
    ctaTitle: 'Elevate your savings 🍑',
    ctaDesc: 'Peach Super Saving is built for serious savers. Maximize returns with our highest annual interest rate.',
    deepLink: 'peach_saving',
    highlights: [
      'Premium wealth tools',
      'Dedicated relationship manager',
      'Global ATM fee reimbursement'
    ]
  }
};

var _fruitBankScriptEl = document.currentScript || document.querySelector('script[src*="assets/js/finance-data.js"]');
var _fruitBankScriptSrc = (_fruitBankScriptEl && _fruitBankScriptEl.src) || '';
var _fruitBankImageBase = _fruitBankScriptSrc
  ? new URL('../image/', _fruitBankScriptSrc).href
  : '../assets/image/';

window.FruitBankAppConfig = {
  downloadLink: 'https://onelink-sim.onelink.me/coiD/4kggix5o',
  accountLinks: {
    apple: 'https://onelink-sim.onelink.me/coiD/tknc1c54',
    banana: 'https://onelink-sim.onelink.me/coiD/qnnw8c06',
    peach: 'https://onelink-sim.onelink.me/coiD/f9prgj5x'
  },
  accountQr: {
    apple: _fruitBankImageBase + 'qr_code_apples.png',
    banana: _fruitBankImageBase + 'qr_code_bananas.png',
    peach: _fruitBankImageBase + 'qr_code_peaches.png'
  },
  defaultQr: _fruitBankImageBase + 'qr_code.png'
};
