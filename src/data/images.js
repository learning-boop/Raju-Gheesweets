// ─────────────────────────────────────────────────────────────
//  All photography in one place.
//
//  These are real, freely licensed photos. Pexels and Unsplash
//  are free for commercial use with no attribution required.
//  Wikimedia Commons photos (CC BY-SA) MUST keep their credit:
//  it is shown under "Photo credits" in the footer and in
//  CREDITS.md, so don't remove those while they are in use.
//
//  To switch any image to the shop's own photo:
//    1. drop the file in /public/images/  (e.g. motichoor.jpg)
//    2. add  local: '/images/motichoor.jpg'  to that entry.
//  The <Img> component uses `local` first when it exists.
// ─────────────────────────────────────────────────────────────

const pexelsUrl = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
const unsplashUrl = (id, w) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const px = (id, alt, by, page) => ({ provider: 'pexels', id, alt, by, page, license: 'Pexels License' })
// The shop's own photos, served from public/images/ (no credit needed)
const own = (local, alt) => ({ provider: 'shop', local, alt })
const us = (id, alt, by, page) => ({ provider: 'unsplash', id, alt, by, page, license: 'Unsplash License' })
// `url` is the Commons 500px thumbnail, which is plenty for a snack card
const wm = (url, alt, by, page, license) => ({ provider: 'commons', url, alt, by, page, license })

export const IMAGES = {
  // Gaurav Kumar's mithai series (Pexels) — one consistent, moody look
  platterNuts: px(18488301, 'Assorted Indian sweets garnished with almonds and pistachios', 'Gaurav Kumar', 'https://www.pexels.com/photo/traditional-indian-sweets-18488301/'),
  motichoor: own('/images/motichoor-laddu.webp', 'Laddus piled on a banana leaf in a brass plate'),
  besan: own('/images/besan-laddu.webp', 'Besan laddus with pistachio and saffron on a brass plate'),
  kajuKatli: own('/images/kaju-katli.webp', 'Two platters of silver-leaf kaju katli'),
  imarti: px(18488314, 'Imarti — the sweet known in Andhra as jangiri', 'Gaurav Kumar', 'https://www.pexels.com/photo/traditional-indian-sweets-imrati-18488314/'),
  gulabJamun: px(18488298, 'Gulab jamun', 'Gaurav Kumar', 'https://www.pexels.com/photo/gulab-jamun-18488298/'),
  roseBarfi: px(18488320, 'Rose barfi', 'Gaurav Kumar', 'https://www.pexels.com/photo/rose-barfi-18488320/'),
  almondBarfi: px(18488299, 'Almond barfi', 'Gaurav Kumar', 'https://www.pexels.com/photo/almond-barfi-18488299/'),
  milkCake: px(18488313, 'Roasted milk cake', 'Gaurav Kumar', 'https://www.pexels.com/photo/roasted-milkcake-18488313/'),
  malpua: px(18488303, 'Malpua', 'Gaurav Kumar', 'https://www.pexels.com/photo/malpua-18488303/'),

  // Other Pexels contributors
  // The craft
  gheeJars: own('/images/ghee-pour.webp', 'Golden ghee being poured into roasted semolina'),
  jalebiPiping: px(5916371, 'A cook piping jalebi into hot oil', 'kunal Deotare', 'https://www.pexels.com/photo/cook-making-jalebi-at-a-street-stall-5916371/'),
  laddooHand: px(8659010, 'A hand placing a freshly made laddoo', 'Divya Jain', 'https://www.pexels.com/photo/balls-of-laddu-in-close-up-shot-8659010/'),
  boxTying: px(7552580, 'Hands tying a ribbon on a sweet box', 'Hanna Pad', 'https://www.pexels.com/photo/person-tying-the-ribbon-on-cardboard-box-7552580/'),
  // Gifting
  giftStack: own('/images/festival-box.webp', 'Platters of sweets and a festival gift box with marigolds and diyas'),
  ordersTrays: own('/images/orders-trays.webp', 'A small laddu box, a plate of sweets and stacked gold gift trays tied with ribbon'),
  sweetsAndHotsSpread: own('/images/sweets-and-hots.webp', 'A spread of sweets and savouries in brass plates and bowls'),
  pureGhee: own('/images/pure-ghee.webp', 'Golden ghee falling from a spoon into a brass bowl'),
  sharingSweets: px(8819850, 'Guests sharing Indian sweets at a celebration', 'Yan Krukau', 'https://www.pexels.com/photo/people-sharing-traditional-sweets-8819850/'),
  laddooGiftBox: px(19151506, 'A gift box of laddoos', 'Sharath G.', 'https://www.pexels.com/photo/close-up-of-a-box-of-laddu-19151506/'),
  sweetsAndHots: px(39524791, 'Sweets and savouries together on one tray', 'Yogendra Banjare', 'https://www.pexels.com/photo/assorted-indian-sweets-and-snacks-on-tray-39524791/'),
  chakli: px(7496245, 'A basket of crisp janthikalu', 'Saveurs Secretes', 'https://www.pexels.com/photo/basket-full-of-chakli-snack-7496245/'),
  ribbon: own('/images/ribbon-pakodi.webp', 'A brass bowl of crisp ribbon pakodi with curry leaves'),
  bananaChips: px(9191924, 'A basket of banana chips', 'Saveurs Secretes', 'https://www.pexels.com/photo/a-basket-of-dried-banana-chips-9191924/'),
  mixture: px(27643179, 'A plate of sev and peanut mixture', 'ALOK DAS', 'https://www.pexels.com/photo/tea-time-27643179/'),
  masalaPeanuts: px(40456064, 'Orange spice-coated peanuts', 'Mustafa Akın', 'https://www.pexels.com/photo/vibrant-orange-peanut-snack-close-up-40456064/'),

  // Wikimedia Commons
  boondi: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Besan_Boondi.JPG/500px-Besan_Boondi.JPG', 'A plate of fried gram-flour boondi', 'Tamizhmuhil', 'https://commons.wikimedia.org/wiki/File:Besan_Boondi.JPG', 'CC BY-SA 4.0'),
  chekkalu: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Chekkalu-_Sri_Sai_Telangana_foods%2CHafeezpet-Telangana-DSC_0004.jpg/500px-Chekkalu-_Sri_Sai_Telangana_foods%2CHafeezpet-Telangana-DSC_0004.jpg', 'Crisp round chekkalu', 'Divya4232', 'https://commons.wikimedia.org/wiki/File:Chekkalu-_Sri_Sai_Telangana_foods,Hafeezpet-Telangana-DSC_0004.jpg', 'CC BY-SA 4.0'),
  kajuPakodi: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Cashew_nut_pakora.jpg/500px-Cashew_nut_pakora.jpg', 'A plate of cashew pakodi', 'Thamizhpparithi Maari', 'https://commons.wikimedia.org/wiki/File:Cashew_nut_pakora.jpg', 'CC BY-SA 4.0'),

  // Andhra specials (Wikimedia Commons)
  mysorePak: own('/images/mysore-pak.webp', 'Pieces of ghee Mysore pak'),
  pootharekulu: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Pootharekulu_dry_fruits.jpg/500px-Pootharekulu_dry_fruits.jpg', 'Pootharekulu rolls filled with dry fruits', 'Balajijagadesh', 'https://commons.wikimedia.org/wiki/File:Pootharekulu_dry_fruits.jpg', 'CC BY-SA 3.0'),
  kakinadaKaja: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Kaja_from_Kakinada.jpg/500px-Kaja_from_Kakinada.jpg', 'Syrup-glazed Kakinada kaja', 'Deepak Vallamsetti', 'https://commons.wikimedia.org/wiki/File:Kaja_from_Kakinada.jpg', 'CC BY-SA 4.0'),
  sunnundalu: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Minapa_Sunnundalu.jpg/500px-Minapa_Sunnundalu.jpg', 'A bowl of sunnundalu', 'Muralikrishna Musunuri', 'https://commons.wikimedia.org/wiki/File:Minapa_Sunnundalu.jpg', 'CC BY-SA 4.0'),
  ariselu: own('/images/ariselu.webp', 'Sesame-topped ariselu on a banana leaf in a brass plate'),
  bobbatlu: own('/images/bobbatlu.webp', 'Bobbatlu with a sweet chana dal filling on a banana leaf'),
  palakova: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Palkova.jpg/500px-Palkova.jpg', 'Palakova topped with almonds', 'Chozha', 'https://commons.wikimedia.org/wiki/File:Palkova.jpg', 'CC BY-SA 4.0'),
  kalakand: wm('https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Kalakand_of_Salem.jpg/500px-Kalakand_of_Salem.jpg', 'Squares of kalakand with pistachio', 'Thamizhpparithi Maari', 'https://commons.wikimedia.org/wiki/File:Kalakand_of_Salem.jpg', 'CC BY-SA 4.0'),

  // Unsplash
  jalebiStall: us('1760263217152-009971f0bccc', 'A pile of golden jalebi on a sweet stall', 'Zoshua Colah', 'https://unsplash.com/photos/KKnpil90IBw'),
  tilLadoo: us('1610508500445-a4592435e27e', 'Sesame laddoos on a wooden tray', 'Prchi Palwe', 'https://unsplash.com/photos/Bn4vWSX0d1Y'),
}

export function imgSrc(img, w = 1200) {
  if (img.local) return img.local
  if (img.url) return img.url
  return img.provider === 'pexels' ? pexelsUrl(img.id, w) : unsplashUrl(img.id, w)
}

export function imgSrcSet(img, widths = [480, 800, 1200, 1800]) {
  if (img.local || img.url) return undefined
  return widths.map((w) => `${imgSrc(img, w)} ${w}w`).join(', ')
}

// stock photos only: the shop's own photos need no credit
export const CREDITS = Object.entries(IMAGES)
  .filter(([, img]) => img.provider !== 'shop')
  .map(([key, img]) => ({ key, ...img }))
