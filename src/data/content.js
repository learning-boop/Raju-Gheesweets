import { IMAGES as I } from './images.js'

// Menu shown with photography (tabbed). Swap or extend freely.
export const MENU = [
  {
    id: 'ghee',
    label: 'Ghee Classics',
    te: 'నెయ్యి మిఠాయిలు',
    blurb: 'The counter’s foundation — sweets where the ghee does the talking.',
    items: [
      { name: 'Motichoor Laddu', te: 'మోతీచూర్ లడ్డు', desc: 'Pearl-fine boondi bound with ghee, cardamom and a thread of saffron.', tag: 'Classic', img: I.motichoor },
      { name: 'Kaju Katli', te: 'కాజు కట్లీ', desc: 'Cashew paste rolled thin, cut into diamonds and finished with silver leaf.', tag: 'Silver leaf', img: I.kajuKatli },
      { name: 'Besan Laddu', te: 'శనగపిండి లడ్డు', desc: 'Gram flour roasted low in ghee until nutty, then rolled while warm.', tag: 'Ghee-roasted', img: I.besan },
      { name: 'Jangiri', te: 'జాంగ్రీ', desc: 'Urad dal spirals fried crisp and soaked in warm saffron syrup.', tag: 'Syrup-soaked', img: I.imarti },
      { name: 'Jalebi', te: 'జిలేబీ', desc: 'Thin, crackling spirals fried golden and dipped in hot syrup.', tag: 'Hot & crisp', img: I.jalebiStall },
      { name: 'Nuvvula Laddu', te: 'నువ్వుల లడ్డు', desc: 'Toasted sesame and jaggery rolled tight — a Sankranti favourite.', tag: 'Sankranti', img: I.tilLadoo },
    ],
  },
  {
    id: 'milk',
    label: 'Milk & Syrup',
    te: 'పాల మిఠాయిలు',
    blurb: 'Milk and khoya, reduced slowly until they turn rich, soft and fudgy.',
    items: [
      { name: 'Gulab Jamun', te: 'గులాబ్ జామూన్', desc: 'Khoya dumplings fried golden and steeped in rose-cardamom syrup.', tag: 'Warm or cold', img: I.gulabJamun },
      { name: 'Milk Cake', te: 'మిల్క్ కేక్', desc: 'Caramelised at the centre, milky and crumbly at the edges.', tag: 'Caramelised', img: I.milkCake },
      { name: 'Rose Barfi', te: 'రోజ్ బర్ఫీ', desc: 'Milk barfi scented with rose, set soft and cut into squares.', tag: 'Floral', img: I.roseBarfi },
      { name: 'Badam Barfi', te: 'బాదం బర్ఫీ', desc: 'Ground almonds and ghee, set slowly and topped with nuts.', tag: 'Almond', img: I.almondBarfi },
      { name: 'Malpua', te: 'మాల్పువా', desc: 'Soft, lacy pancakes fried in ghee and soaked in syrup.', tag: 'Festive', img: I.malpua },
    ],
  },
]

// Andhra specials — editorial list (add `img` later when the shop has photos)
export const SPECIALS = [
  { name: 'Ghee Mysore Pak', te: 'ఘీ మైసూర్ పాక్', desc: 'Besan roasted slowly in ghee until porous and melt-in-the-mouth.', img: I.mysorePak },
  { name: 'Pootharekulu', te: 'పూతరేకులు', desc: 'Paper-thin rice sheets layered with ghee and powdered sugar or jaggery.', img: I.pootharekulu },
  { name: 'Kakinada Kaja', te: 'కాకినాడ కాజా', desc: 'Layered, fried and dripping with syrup — the coastal favourite.', img: I.kakinadaKaja },
  { name: 'Sunnundalu', te: 'సున్నుండలు', desc: 'Roasted urad dal, jaggery and ghee — the wholesome Andhra laddu.', img: I.sunnundalu },
  { name: 'Ariselu', te: 'అరిసెలు', desc: 'Rice flour and jaggery discs fried in ghee, with a sesame finish.', img: I.ariselu },
  { name: 'Bobbatlu', te: 'బొబ్బట్లు', desc: 'Soft flatbread filled with chana dal and jaggery, brushed with ghee.', img: I.bobbatlu },
  { name: 'Palakova', te: 'పాలకోవా', desc: 'Milk reduced for hours into a soft, caramel-sweet fudge.', img: I.palakova },
  { name: 'Kalakand', te: 'కలాకండ్', desc: 'Grainy, milky and just sweet enough, topped with pistachio.', img: I.kalakand },
]

export const SNACKS = [
  { name: 'Janthikalu', te: 'జంతికలు', desc: 'Pressed murukku spirals — light, brittle and endlessly snackable.', notes: ['Brittle', 'Classic'], img: I.chakli },
  { name: 'Mixture', te: 'మిక్స్చర్', desc: 'Sev, boondi, peanuts and curry leaves tossed together in spice.', notes: ['Crunchy', 'Spiced'], img: I.mixture, focus: { at: '52% 77%', zoom: 2.3 } },
  { name: 'Ribbon Pakodi', te: 'రిబ్బన్ పకోడీ', desc: 'Ribbons of besan and rice flour, scented with ajwain.', notes: ['Airy', 'Mild'], img: I.ribbon },
  { name: 'Kara Boondi', te: 'కారా బూందీ', desc: 'Gram-flour pearls fried crisp with chilli and a pinch of hing.', notes: ['Crisp', 'Hot'], img: I.boondi, focus: { at: '50% 50%', zoom: 1.6 } },
  { name: 'Banana Chips', te: 'అరటి చిప్స్', desc: 'Thin raw-banana slices fried crisp and lightly salted.', notes: ['Thin', 'Salted'], img: I.bananaChips },
  { name: 'Chekkalu', te: 'చెక్కలు', desc: 'Rice crackers with chana dal, sesame and green chilli.', notes: ['Thin', 'Savoury'], img: I.chekkalu },
  { name: 'Kaju Pakodi', te: 'కాజు పకోడీ', desc: 'Whole cashews in a crisp, curry-leaf batter.', notes: ['Rich', 'Crunchy'], img: I.kajuPakodi },
  { name: 'Masala Pallilu', te: 'మసాలా పల్లీలు', desc: 'Peanuts coated in spiced besan and fried crisp.', notes: ['Crunchy', 'Spiced'], img: I.masalaPeanuts },
]

export const MARQUEE = [
  { name: 'Motichoor Laddu', img: I.motichoor },
  { name: 'Kaju Katli', img: I.kajuKatli },
  { name: 'Gulab Jamun', img: I.gulabJamun },
  { name: 'Jangiri', img: I.imarti },
  { name: 'Rose Barfi', img: I.roseBarfi },
  { name: 'Milk Cake', img: I.milkCake },
  { name: 'Besan Laddu', img: I.besan },
  { name: 'Malpua', img: I.malpua },
]

export const MARQUEE_TE = ['పూతరేకులు', 'కాకినాడ కాజా', 'సున్నుండలు', 'అరిసెలు', 'బొబ్బట్లు', 'పాలకోవా', 'జంతికలు', 'చెక్కలు']

export const PILLARS = [
  { icon: 'drop', title: 'Pure ghee, always', text: 'It’s in the name. Ghee is the backbone of the counter, from Mysore Pak to Bobbatlu.', img: I.pureGhee },
  { icon: 'bowl', title: 'Sweets and hots', text: 'From kaju katli to kara boondi — one counter for every craving and every guest.', img: I.sweetsAndHotsSpread },
  { icon: 'box', title: 'Orders, big or small', text: 'A quarter kilo for the evening or trays for a wedding — tell us the occasion.', img: I.ordersTrays },
]

export const STEPS = [
  { no: '01', title: 'Ghee first', text: 'Every recipe starts with the ghee. It carries the flavour, so it gets the most care.', img: I.gheeJars },
  { no: '02', title: 'Low, slow fire', text: 'Batters, dals and khoya are cooked gently, for as long as they need — no rushing the colour.', img: I.jalebiPiping },
  { no: '03', title: 'Small batches', text: 'Shaped by hand, in batches small enough to watch, then weighed out fresh at the counter.', img: I.laddooHand },
  { no: '04', title: 'Packed for you', text: 'Boxed and tied at the counter — ready for the pooja room, the office or the party.', img: I.boxTying },
]

export const GIFTING = {
  festival: { eyebrow: 'Festival boxes', title: 'Assorted ghee sweets, packed for the festival.', text: 'Pick a ready box or build your own — mix ghee classics, milk sweets and Andhra specials.', chips: ['Sankranti', 'Ugadi', 'Dasara', 'Diwali'], img: I.giftStack, cta: 'Build a festival box' },
  functions: { eyebrow: 'Weddings & functions', title: 'Trays for every guest.', text: 'Bulk sweets and hots for weddings, house-warmings and pujas, in the quantities you need.', img: I.sharingSweets, cta: 'Plan a bulk order' },
  corporate: { eyebrow: 'Corporate gifting', title: 'Gifts your team will open first.', text: 'Assortment boxes for teams, clients and festive greetings, with your message on the card.', img: I.laddooGiftBox, cta: 'Enquire for your office' },
  combo: { eyebrow: 'Combo box', title: 'Sweets & hots, one box.', text: 'Pair something sweet with something spicy, the way every Andhra host does.', img: I.sweetsAndHots, cta: 'Make it a combo' },
}

// How a gift order comes together (shown under the gifting cards)
export const GIFT_STEPS = [
  { title: 'Pick a box', text: 'Half a kilo, a kilo, or trays for a whole hall.' },
  { title: 'Fill it', text: 'Mix ghee classics, milk sweets, Andhra specials and hots.' },
  { title: 'Add a message', text: 'A printed card with your note, family or company name.' },
  { title: 'We pack and send', text: 'Pick it up, or we deliver in Vijayawada and courier across India.' },
]
