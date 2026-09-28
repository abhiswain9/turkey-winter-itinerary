/* Turkey Winter Escape: itinerary data + behavior. Plain JS, no build step. */
(function () {
'use strict';

/* ---------- Photo credits (Wikimedia Commons) ---------- */
var PHOTOS = {"hero":{"a":"Tarikkaanmuslu","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Eminonu_waterfront_with_Yeni_Cami_and_Suleymaniye_Mosque_from_Galata_Bridge,_Istanbul_-_Tarik_Kaan_Muslu.jpg","w":2200,"h":1467,"t":"Hero: Eminönü waterfront from the Galata Bridge"},"karakoy":{"a":"Julian Nyča","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Istanbul_Karak%C3%B6y_Galata.JPG","w":1200,"h":800,"t":"Karaköy and Galata Tower"},"hagia-sophia":{"a":"Arild Vågen","l":"CC BY-SA 3.0","lu":"https://creativecommons.org/licenses/by-sa/3.0","src":"https://commons.wikimedia.org/wiki/File:Hagia_Sophia_Mars_2013.jpg","w":1200,"h":801,"t":"Hagia Sophia"},"blue-mosque":{"a":"Moonik","l":"CC BY-SA 3.0","lu":"https://creativecommons.org/licenses/by-sa/3.0","src":"https://commons.wikimedia.org/wiki/File:Exterior_of_Sultan_Ahmed_I_Mosque_in_Istanbul,_Turkey_002.jpg","w":1200,"h":783,"t":"Sultan Ahmed (Blue) Mosque"},"basilica-cistern":{"a":"Diego Delso","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Cisterna_Bas%C3%ADlica,_Estambul,_Turqu%C3%ADa,_2024-09-28,_DD_58-60_HDR.jpg","w":1200,"h":960,"t":"Basilica Cistern"},"hippodrome":{"a":"Ninara","l":"CC BY 2.0","lu":"https://creativecommons.org/licenses/by/2.0","src":"https://commons.wikimedia.org/wiki/File:Sultanahmet_Square,_Obelisk_of_Theodosius,_Istanbul_(52121868925).jpg","w":1200,"h":884,"t":"Hippodrome, Obelisk of Theodosius"},"t1-tram":{"a":"Zach1055","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Tram_@_Sultanahmet,_Istanbul_Turkey_2023.jpg","w":1200,"h":900,"t":"T1 tram at Sultanahmet"},"topkapi":{"a":"Dosseman","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Topkap%C4%B1_Second_courtyard_Front_of_the_Gate_of_Felicity_in_2006_05_1183.jpg","w":1200,"h":797,"t":"Topkapı Palace, Gate of Felicity"},"grand-bazaar":{"a":"Jorge Franganillo","l":"CC BY 4.0","lu":"https://creativecommons.org/licenses/by/4.0","src":"https://commons.wikimedia.org/wiki/File:Istanbul_-_Grand_Bazaar_(55107617958).jpg","w":1200,"h":899,"t":"Grand Bazaar"},"spice-bazaar":{"a":"Jorge Franganillo","l":"CC BY 4.0","lu":"https://creativecommons.org/licenses/by/4.0","src":"https://commons.wikimedia.org/wiki/File:Istanbul_-_Spice_Bazaar_(55106538052).jpg","w":1200,"h":800,"t":"Spice Bazaar"},"galata-bridge":{"a":"Joseph Kranak","l":"CC BY 2.0","lu":"https://creativecommons.org/licenses/by/2.0","src":"https://commons.wikimedia.org/wiki/File:Sunset_over_Istanbul_from_the_Galata_Bridge.jpg","w":1200,"h":805,"t":"Sunset from the Galata Bridge"},"bosphorus-ferry":{"a":"Tarikkaanmuslu","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Istanbul_ferry_at_sunset_on_the_Bosphorus_-_Tarik_Kaan_Muslu.jpg","w":1200,"h":800,"t":"Ferry on the Bosphorus"},"galata-tower":{"a":"Alexxx1979","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Istanbul_Galata_Tower_IMG_8211_1920.jpg","w":1200,"h":788,"t":"Galata Tower"},"istiklal":{"a":"CeeGee","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:NostalgicTram%C4%B0stiklalAvenue.jpg","w":1200,"h":795,"t":"Heritage tram on İstiklal Avenue"},"balat":{"a":"Antoloji","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Balat_houses.jpg","w":1200,"h":900,"t":"Houses in Balat"},"kadikoy":{"a":"CeeGee","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Kad%C4%B1k%C3%B6yOldFerryPier.jpg","w":1200,"h":779,"t":"Kadıköy old ferry pier"},"suleymaniye-hamam":{"a":"Roser Goula","l":"CC BY 2.0","lu":"https://creativecommons.org/licenses/by/2.0","src":"https://commons.wikimedia.org/wiki/File:Hamam_Suleymaniye_(6363366371).jpg","w":1200,"h":800,"t":"Süleymaniye Hamamı"},"beyoglu-night":{"a":"Jorge1767","l":"Public domain","lu":"","src":"https://commons.wikimedia.org/wiki/File:Istanblue.jpg","w":1200,"h":492,"t":"Golden Horn at night from Galata Tower"},"hodjapasha-sema":{"a":"Kemal.kubbe","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Whirling_Dervishes_at_Hodjapasha.jpg","w":1200,"h":728,"t":"Sema at Hodjapasha"},"bankalar":{"a":"Dosseman","l":"CC BY-SA 4.0","lu":"https://creativecommons.org/licenses/by-sa/4.0","src":"https://commons.wikimedia.org/wiki/File:Bankalar_Caddesi_6836.jpg","w":1200,"h":797,"t":"Generali Han, Bankalar Caddesi (Hotels)"},"balik-ekmek":{"a":"Jean-Pierre Bazard","l":"CC BY-SA 3.0","lu":"https://creativecommons.org/licenses/by-sa/3.0","src":"https://commons.wikimedia.org/wiki/File:Vendeurs_de_balik_ekmek_(1).jpg","w":1200,"h":810,"t":"Balık ekmek boats, Eminönü (Restaurants)"}};

/* ---------- Places ---------- */
var HOTEL = { name: 'The Bank Hotel', q: 'The Bank Hotel Istanbul, Bankalar Caddesi 5, Karaköy, Istanbul', ll: [41.02358, 28.97444] };
var P = {
  IST: { name: 'Istanbul Airport (IST)', q: 'Istanbul Airport', ll: [41.27487, 28.73227] },
  EWR: { name: 'Newark (EWR)', q: 'Newark Liberty International Airport', ll: [40.68906, -74.17725] },
  BLR: { name: 'Bengaluru (BLR)', q: 'Kempegowda International Airport Bengaluru', ll: [13.19760, 77.70749] }
};

var DAY_COLORS = {
  'dec-26': '#946c00', 'dec-27': '#bf4a25', 'dec-28': '#1a73c9', 'dec-29': '#0e776d',
  'dec-30': '#7b4fc0', 'dec-31': '#c2185b', 'jan-01': '#4d7c2a'
};

function gdir(o, d, mode) {
  return 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(o) +
    '&destination=' + encodeURIComponent(d) + '&travelmode=' + mode;
}

/* ---------- Days ----------
   slot types: place (photo + write-up + getting there), note (light), flight (light, airport), transfer (light + directions) */
var DAYS = [
  { id: 'dec-25', dow: 'Fri', mon: 'Dec', d: '25', title: 'Christmas + fly', tip: 'Evening departure only.',
    summary: 'Angela’s · Pack · EWR overnight',
    slots: [
      { slot: 'Morning', type: 'note', icon: 'home', title: 'Christmas at Angela’s', text: 'Christmas morning at Angela’s. No airport until after that.' },
      { slot: 'Afternoon', type: 'note', icon: 'bag', title: 'Pack, then Newark', text: 'Pack and get to EWR by early evening.' },
      { slot: 'Evening', type: 'flight', icon: 'plane', title: 'EWR → IST, overnight', text: 'No Istanbul time today.', meta: 'Flight number TBD' }
    ],
    map: { kind: 'world', routes: [['EWR', 'IST', 'You'], ['BLR', 'IST', 'Parents']] }
  },
  { id: 'dec-26', dow: 'Sat', mon: 'Dec', d: '26', title: 'Land and meet', tip: 'Whoever lands first holds the rooms.',
    summary: 'Parents land · You land · Karaköy Lokantası',
    slots: [
      { slot: 'Morning', type: 'flight', icon: 'plane', title: 'Parents land at IST', text: 'Parents fly BLR → IST overnight (about 8h on Turkish Airlines), land early and check in. You’re still in the air.', meta: 'Arrival Dec 26, possibly Dec 25 · TBD' },
      { slot: 'Afternoon', type: 'transfer', icon: 'plane', title: 'You land at IST, transfer to Karaköy', text: 'Taxi, or the Havaist airport bus plus a short taxi. Istanbul Airport is roughly 40 km from Karaköy, so traffic decides the time.',
        go: { mode: 'taxi', time: '~50–75 min', from: 'Istanbul Airport', to: 'The Bank Hotel', url: gdir('Istanbul Airport', HOTEL.q, 'driving') }, goAfter: true, ll: P.IST.ll, name: 'Istanbul Airport (IST)' },
      { slot: 'Evening', type: 'place', img: 'karakoy', name: 'Karaköy Lokantası', kicker: 'First dinner together',
        alt: 'Karaköy’s waterfront buildings below Galata Tower, seen from across the water',
        body: 'A Karaköy institution on Kemankeş Caddesi: classic Turkish home cooking at lunch, meze and rakı at dinner. The first night is about everyone being at one table. No museums today.',
        note: 'Book ahead; it fills up.',
        ll: [41.02459, 28.98003], q: 'Karaköy Lokantası, Kemankeş Caddesi 37, Istanbul',
        go: { mode: 'walk', time: '~8 min', from: 'The Bank Hotel' } }
    ]
  },
  { id: 'dec-27', dow: 'Sun', mon: 'Dec', d: '27', title: 'Sultanahmet', tip: 'First full sightseeing day.',
    summary: 'Hagia Sophia · Blue Mosque · Basilica Cistern · Hippodrome',
    slots: [
      { slot: 'Morning', type: 'place', img: 'hagia-sophia', name: 'Hagia Sophia', kicker: 'At opening',
        alt: 'Hagia Sophia’s great dome and four minarets in morning light',
        body: 'Justinian’s great church, finished in 537, has been a cathedral, a mosque, a museum and, since 2020, a working mosque again. Foreign visitors buy a ticket (€25 at last check) for the upper-gallery route, where the Byzantine mosaics and the view down into the domed nave are the reward; the ground floor is kept for worship.',
        note: 'Cover shoulders and knees; women cover their hair. Visits pause around prayer times.',
        ll: [41.00850, 28.98001], q: 'Hagia Sophia, Istanbul',
        go: { mode: 'tram', time: '~25 min', from: 'The Bank Hotel', via: 'T1 from Karaköy to Sultanahmet' } },
      { slot: 'Morning', type: 'place', img: 'blue-mosque', name: 'Blue Mosque', kicker: 'Sultan Ahmed Mosque',
        alt: 'The Sultan Ahmed Mosque’s cascading domes and six minarets at golden hour',
        body: 'Built between 1609 and 1616 for Sultan Ahmed I, it has six minarets and takes its nickname from the blue-toned İznik tiles inside, more than 20,000 of them. Entry is free, shoes come off, and it closes to visitors during the five daily prayers.',
        note: 'Look up from the center of the prayer hall; the view of the dome is the point.',
        ll: [41.00538, 28.97685], q: 'Sultan Ahmed Mosque, Istanbul',
        go: { mode: 'walk', time: '~5 min', from: 'Hagia Sophia' } },
      { slot: 'Afternoon', type: 'place', img: 'basilica-cistern', name: 'Basilica Cistern', kicker: 'Underground',
        alt: 'Rows of lit marble columns reflected in the water of the Basilica Cistern',
        body: 'A 6th-century reservoir built under Justinian: 336 columns in 12 rows, standing in shallow water beneath brick vaults. Find the two Medusa heads used as column bases in the far corner, and the “weeping” column carved with teardrop shapes.',
        note: 'Reopened in 2022 after restoration. Separate evening sessions exist.',
        ll: [41.00848, 28.97838], q: 'Basilica Cistern, Istanbul',
        go: { mode: 'walk', time: '~6 min', from: 'Blue Mosque' } },
      { slot: 'Afternoon', type: 'place', img: 'hippodrome', name: 'Hippodrome', kicker: 'Sultanahmet Square',
        alt: 'The Egyptian Obelisk of Theodosius rising above Sultanahmet Square under a cloudy sky',
        body: 'The long square traces the chariot track of Byzantine Constantinople. Three monuments stand where the central barrier ran: the Egyptian Obelisk of Theodosius (about 3,500 years old, raised here in 390), the bronze Serpent Column from Delphi, and the rough stone Walled Obelisk.',
        note: 'At the north end, the German Fountain marks Kaiser Wilhelm II’s 1898 visit.',
        ll: [41.00593, 28.97540], q: 'Obelisk of Theodosius, Sultanahmet Square, Istanbul',
        go: { mode: 'walk', time: '~5 min', from: 'Basilica Cistern' } },
      { slot: 'Evening', type: 'place', img: 't1-tram', name: 'Tram back to Karaköy, or Grace Rooftop', kicker: 'Your call',
        alt: 'A red and white T1 tram at the Sultanahmet stop',
        body: 'The T1 tram runs from Sultanahmet to Karaköy in a handful of stops, crossing the Galata Bridge; pay with an Istanbulkart. Or stay south for dinner at Grace Rooftop, a couple of minutes’ walk from the Hippodrome, and ride home afterwards.',
        ll: [41.00811, 28.97551], q: 'Sultanahmet tram stop, Istanbul',
        extra: { label: 'Walk to Grace Rooftop', url: gdir('Obelisk of Theodosius, Sultanahmet Square, Istanbul', 'Grace Rooftop Restaurant, Terzihane Sokak 15, Istanbul', 'walking') },
        go: { mode: 'tram', time: '~25 min to the hotel', from: 'Hippodrome', via: 'T1 from Sultanahmet to Karaköy', url: gdir('Obelisk of Theodosius, Sultanahmet Square, Istanbul', HOTEL.q, 'transit') },
        home: true }
    ]
  },
  { id: 'dec-28', dow: 'Mon', mon: 'Dec', d: '28', title: 'Palace and bazaars', tip: 'Monday: the bazaars are open. (The Grand Bazaar closes Sundays; Topkapı closes Tuesdays.)',
    summary: 'Topkapı + Harem · Grand Bazaar · Spice Bazaar · Eminönü at dusk',
    slots: [
      { slot: 'Morning', type: 'place', img: 'topkapi', name: 'Topkapı Palace + Harem', kicker: 'Ottoman court',
        alt: 'The Gate of Felicity with its deep painted canopy in Topkapı Palace’s second courtyard',
        body: 'Home of the Ottoman sultans for roughly four centuries, until the court moved to Dolmabahçe in 1856. It’s a sequence of courtyards and pavilions rather than one building; the Harem needs the combined ticket and is worth it.',
        note: 'Save energy for the Treasury (the Topkapı Dagger, the Spoonmaker’s Diamond) and the Sacred Relics.',
        ll: [41.01150, 28.98330], q: 'Topkapı Palace, Istanbul',
        go: { mode: 'tram', time: '~25 min', from: 'The Bank Hotel', via: 'T1 to Gülhane, then uphill on foot' } },
      { slot: 'Afternoon', type: 'place', img: 'grand-bazaar', name: 'Grand Bazaar', kicker: 'Kapalıçarşı',
        alt: 'Shoppers under the painted vaults and Turkish flags of a Grand Bazaar main street',
        body: 'Begun under Mehmed II in the 1450s and grown into one of the largest covered markets in the world: around 4,000 shops along some 60 lanes. The old Cevahir Bedesten at its core is the place for antiques and jewelry; haggle, but kindly.',
        ll: [41.01095, 28.96802], q: 'Grand Bazaar, Istanbul',
        go: { mode: 'walk', time: '~20 min', from: 'Topkapı Palace', via: 'or T1 from Gülhane to Beyazıt-Kapalıçarşı' } },
      { slot: 'Afternoon', type: 'place', img: 'spice-bazaar', name: 'Spice Bazaar', kicker: 'Mısır Çarşısı',
        alt: 'The vaulted main hall of the Spice Bazaar, lined with stalls of lokum and spices',
        body: 'Also called the Egyptian Bazaar, this L-shaped market was completed in the 1660s as part of the New Mosque complex. Come for lokum, tea and spices to take home.',
        note: 'A few minutes’ walk west, the small Rüstem Pasha Mosque is lined with İznik tiles and far quieter.',
        ll: [41.01648, 28.97054], q: 'Spice Bazaar, Istanbul',
        go: { mode: 'walk', time: '~15 min', from: 'Grand Bazaar', via: 'downhill through Mahmutpaşa’s market streets' } },
      { slot: 'Evening', type: 'place', img: 'galata-bridge', name: 'Eminönü at dusk, dinner across the Galata Bridge', kicker: 'Golden Horn',
        alt: 'Süleymaniye Mosque silhouetted against an orange sunset sky above the Golden Horn',
        body: 'The present Galata Bridge opened in 1994, with anglers along the upper deck and restaurants underneath. At dusk the domes of the New Mosque and Süleymaniye stand out against the sky; then walk over to Karaköy for dinner, a few minutes from the hotel.',
        ll: [41.02008, 28.97309], q: 'Galata Bridge, Istanbul',
        go: { mode: 'walk', time: '~5 min', from: 'Spice Bazaar' }, home: true }
    ]
  },
  { id: 'dec-29', dow: 'Tue', mon: 'Dec', d: '29', title: 'Water and Beyoğlu', tip: 'Easy jet-lag day.',
    summary: 'Bosphorus cruise · Galata Tower · İstiklal',
    slots: [
      { slot: 'Morning', type: 'place', img: 'bosphorus-ferry', name: 'Public Bosphorus cruise', kicker: 'Şehir Hatları, from Eminönü',
        alt: 'A white city ferry crossing the Bosphorus under a pink sunset sky',
        body: 'The city ferry company runs Bosphorus tours from Eminönü, passing Dolmabahçe Palace, the Ortaköy Mosque, the Bosphorus bridges and the Rumeli Hisarı fortress. In winter each tour usually runs once a day: the Long Tour leaves in the morning and takes about six hours with a stop at Anadolu Kavağı, and the roughly two-hour Short Tour leaves in the afternoon.',
        note: 'Check the current timetable. For a shorter morning, private operators run frequent ~90-minute loops from Eminönü.',
        ll: [41.01770, 28.97620], q: 'Eminönü Pier, Istanbul',
        go: { mode: 'walk', time: '~15 min', from: 'The Bank Hotel', via: 'across the Galata Bridge' } },
      { slot: 'Afternoon', type: 'place', img: 'galata-tower', name: 'Galata Tower', kicker: 'Galata square',
        alt: 'Galata Tower’s conical stone top rising above the rooftops of Beyoğlu',
        body: 'Built by the Genoese in 1348 as the high point of their walled colony, and now a museum after a restoration that reopened it in 2020. The narrow viewing balcony takes in the Golden Horn, the old city and the Bosphorus.',
        note: 'Queues are shortest early or late. The square below is good for a coffee.',
        ll: [41.02564, 28.97421], q: 'Galata Tower, Istanbul',
        go: { mode: 'walk', time: '~20 min', from: 'Eminönü pier', via: 'back over the bridge and up the hill (or T1 to Karaköy)' } },
      { slot: 'Evening', type: 'place', img: 'istiklal', name: 'İstiklal Avenue, then dinner', kicker: 'Yeni Lokanta or Asmalı Cavit',
        alt: 'A red heritage tram on İstiklal Avenue between 19th-century facades',
        body: 'Beyoğlu’s pedestrian spine runs about 1.4 km from Tünel to Taksim, past 19th-century facades, the Church of St. Anthony of Padua and the Çiçek Pasajı arcade, with the red heritage tram line down the middle. For dinner, Yeni Lokanta does modern Anatolian cooking on Kumbaracı Yokuşu; Asmalı Cavit is a classic meyhane in Asmalımescit.',
        ll: [41.03200, 28.97620], q: 'Tünel Square, Beyoğlu, Istanbul',
        go: { mode: 'walk', time: '~5 min', from: 'Galata Tower' } }
    ]
  },
  { id: 'dec-30', dow: 'Wed', mon: 'Dec', d: '30', title: 'Neighborhoods + hammam', tip: 'Book the hammam for the group.',
    summary: 'Balat & Fener, or ferry to Asia · Hammam',
    slots: [
      { slot: 'Morning', type: 'place', img: 'balat', name: 'Balat & Fener', kicker: 'Option A',
        alt: 'A row of painted wooden houses in orange, blue and yellow on a Balat street',
        body: 'Two old Golden Horn quarters, historically home to Greek Orthodox (Fener) and Jewish (Balat) communities. Climb the steep lanes of painted houses, see the Ecumenical Patriarchate’s Church of St. George and the red-brick Phanar Greek Orthodox College on the hill, and the cast-iron Bulgarian St. Stephen Church by the water.',
        ll: [41.03200, 28.94829], q: 'Balat, Fatih, Istanbul',
        go: { mode: 'taxi', time: '~15–25 min', from: 'The Bank Hotel', via: 'or the Golden Horn (Haliç) ferry from Karaköy' } },
      { slot: 'Morning', type: 'place', img: 'kadikoy', name: 'Or: ferry to Kadıköy', kicker: 'Option B · Asian side', altStop: true,
        alt: 'Kadıköy’s old ferry pier building on the water',
        body: 'The ferry from Karaköy crosses to Asia in about 20 minutes. Kadıköy’s market streets (fish, cheese, pickles, coffee) start by the pier around Güneşlibahçe Sokak, and the Moda seafront is a walk beyond.',
        ll: [40.99291, 29.02287], q: 'Kadıköy Pier, Istanbul',
        go: { mode: 'ferry', time: '~30 min', from: 'The Bank Hotel', via: 'walk to Karaköy pier, ferry to Kadıköy' } },
      { slot: 'Afternoon', type: 'note', icon: 'compass', title: 'Stay on one side of the water', text: 'Don’t try to do both. Wander wherever the morning took you.' },
      { slot: 'Evening', type: 'place', img: 'suleymaniye-hamam', name: 'Hammam, then a quiet dinner', kicker: 'Suggested: Süleymaniye Hamamı · not booked',
        alt: 'The wood-galleried reception hall of Süleymaniye Hamamı, with a marble fountain at its center',
        body: 'Mimar Sinan’s 1557 hammam in the Süleymaniye complex is one of very few historic baths that take mixed groups (couples and families), so all three of you can go together. Booking is online only, with a deposit.',
        note: 'Closer to the hotel, Kılıç Ali Paşa Hamamı is beautiful but has separate hours for women (daytime) and men (evening).',
        ll: [41.01590, 28.96566], q: 'Süleymaniye Hamamı, Mimar Sinan Caddesi 20, Istanbul',
        go: { mode: 'taxi', time: '~15 min', from: 'Balat', url: gdir('Balat, Fatih, Istanbul', 'Süleymaniye Hamamı, Mimar Sinan Caddesi 20, Istanbul', 'driving') }, home: true }
    ]
  },
  { id: 'dec-31', dow: 'Thu', mon: 'Dec', d: '31', title: 'New Year’s Eve', tip: 'Don’t cross the city at 23:00.',
    summary: 'Sleep in · Short walk · Reserved table',
    slots: [
      { slot: 'Morning', type: 'note', icon: 'moon', title: 'Sleep in', text: 'Nothing scheduled.' },
      { slot: 'Afternoon', type: 'note', icon: 'walk', title: 'One short walk', text: 'Keep it close to the hotel. Pack layers for the midnight wind.' },
      { slot: 'Evening', type: 'place', img: 'beyoglu-night', name: 'Reserved table, fireworks at midnight', kicker: 'Reservation TBD',
        alt: 'The Golden Horn and the old city lit up at night under a full moon, seen from Galata Tower',
        body: 'All three candidates sit within a few minutes’ walk of each other in Beyoğlu, uphill from the hotel: Mikla on the roof of The Marmara Pera, 360 Istanbul on top of a historic building on İstiklal, and Asmalı Cavit, a classic meyhane. Staying on this side of the water keeps you off the bridges and out of the midnight crush.',
        note: 'Check the city’s fireworks plans closer to the date.',
        ll: [41.03017, 28.97471], q: 'Asmalı Mescit, Beyoğlu, Istanbul',
        options: [
          { name: 'Mikla', ll: [41.03109, 28.97402], q: 'Mikla, Meşrutiyet Caddesi 15, Istanbul' },
          { name: '360 Istanbul', ll: [41.03274, 28.97672], q: '360 Istanbul, İstiklal Caddesi 163, Istanbul' },
          { name: 'Asmalı Cavit', ll: [41.03017, 28.97471], q: 'Asmalı Cavit, Asmalı Mescit Sokak 16, Istanbul' }
        ],
        go: { mode: 'funicular', time: '~15 min', from: 'The Bank Hotel', via: 'Tünel funicular from Karaköy, or a 15–20 min uphill walk', url: gdir(HOTEL.q, 'Asmalı Mescit, Beyoğlu, Istanbul', 'transit') }, home: true }
    ]
  },
  { id: 'jan-01', dow: 'Fri', mon: 'Jan', d: '1', title: 'Slow new year', tip: 'Hours are uneven today.',
    summary: 'Brunch · Park or ferry · Optional dervishes',
    slots: [
      { slot: 'Morning', type: 'note', icon: 'cup', title: 'Brunch', text: 'Late and long.' },
      { slot: 'Afternoon', type: 'note', icon: 'ferry', title: 'A park, or a no-agenda ferry', text: 'Gülhane Park below Topkapı, or any city ferry across and back just for the view.' },
      { slot: 'Evening', type: 'place', img: 'hodjapasha-sema', name: 'Optional: whirling dervishes, or cafés', kicker: 'Suggested: Hodjapasha, Sirkeci',
        alt: 'Mevlevi dervishes in white robes whirling on a lit stage',
        body: 'The Mevlevi sema is a religious ceremony rather than a show: about an hour of music and turning, watched in silence. Hodjapasha Culture Center, in a restored 15th-century hammam in Sirkeci, stages it on several evenings a week; the historic Galata Mevlevi House near Tünel has had its ceremonies suspended during restoration.',
        note: 'Winter schedules can thin out and Jan 1 is a Friday, so confirm the date. If not, cafés in Karaköy.',
        ll: [41.01418, 28.97565], q: 'Hodjapasha Culture Center, Hocapaşa Hamamı Sokak, Istanbul',
        go: { mode: 'tram', time: '~15 min', from: 'The Bank Hotel', via: 'T1 one stop past Eminönü to Sirkeci, or walk over the bridge' }, home: true }
    ]
  },
  { id: 'jan-02', dow: 'Sat', mon: 'Jan', d: '2', title: 'Last full day', tip: 'Pack tonight.',
    summary: 'One favorite place · Gifts · Best meal',
    slots: [
      { slot: 'Morning', type: 'note', icon: 'star', title: 'One favorite place', text: 'Go back to whichever stop everyone liked most. The map shows the whole week.' },
      { slot: 'Afternoon', type: 'note', icon: 'bag', title: 'Gifts', text: 'The Spice Bazaar for lokum and tea, the Grand Bazaar for textiles and ceramics. Both are open on Saturdays.' },
      { slot: 'Evening', type: 'note', icon: 'cup', title: 'Best meal of the week', text: 'Pick from the restaurant list below.' }
    ],
    map: { kind: 'week' }
  },
  { id: 'jan-03', dow: 'Sun', mon: 'Jan', d: '3', title: 'Split departures', tip: 'Don’t connect these tickets.',
    summary: 'IST → EWR · IST → BLR',
    slots: [
      { slot: 'Morning', type: 'transfer', icon: 'plane', title: 'You: IST → EWR. Parents: IST → BLR.', text: 'Leave generous time for the drive and for security at Istanbul Airport.',
        go: { mode: 'taxi', time: '~50–75 min', from: 'The Bank Hotel', to: 'Istanbul Airport', url: gdir(HOTEL.q, 'Istanbul Airport', 'driving') }, ll: P.IST.ll, name: 'Istanbul Airport (IST)', meta: 'Flight numbers TBD' },
      { slot: 'Afternoon', type: 'flight', icon: 'plane', title: 'Two flights, two directions', text: 'Separate tickets, so a delay on one can’t strand the other.' },
      { slot: 'Evening', type: 'flight', icon: 'plane', title: 'Landings', text: 'You land at EWR. Parents land at BLR the next morning.' }
    ],
    map: { kind: 'world', routes: [['IST', 'EWR', 'You'], ['IST', 'BLR', 'Parents']] }
  }
];

/* ---------- Helpers ---------- */
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
var MODE_LABEL = { walk: 'Walk', tram: 'Tram', ferry: 'Ferry', taxi: 'Taxi', funicular: 'Funicular' };
var MODE_GMAPS = { walk: 'walking', tram: 'transit', ferry: 'transit', taxi: 'driving', funicular: 'transit' };
var ICONS = {
  walk: '<path d="M13 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM9.8 8.9 7 22h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.3 7.3 0 0 0 19 12v-2a5.3 5.3 0 0 1-4.5-2.5l-1-1.6A2 2 0 0 0 11.8 5a2 2 0 0 0-.8.2L6 7.3V12h2V8.6z"/>',
  tram: '<path d="M8 2h8v2h-3v2h2a3 3 0 0 1 3 3v8a3 3 0 0 1-2 2.8l1.5 2.2h-2.3l-1.4-2h-3.6l-1.4 2H6.5L8 19.8A3 3 0 0 1 6 17V9a3 3 0 0 1 3-3h2V4H8zm1 6a1 1 0 0 0-1 1v3h8V9a1 1 0 0 0-1-1zm0 7.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm6 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>',
  ferry: '<path d="M10 2h4v3h3l1 5 2.5 1-2.2 6.3c-.9-.2-1.8-.6-2.3-1.1a4.5 4.5 0 0 1-6 0 4.5 4.5 0 0 1-6 0c-.5.5-1.3.9-2.2 1.1L3.5 11 6 10l1-5h3zm-1.2 5-.6 2.4L12 8l3.8 1.4-.6-2.4zM2 20c1.4 0 2.6-.5 3.5-1.3a4.8 4.8 0 0 0 6.5 0 4.8 4.8 0 0 0 6.5 0c.9.8 2.1 1.3 3.5 1.3v2c-1.3 0-2.5-.3-3.5-.9a6.8 6.8 0 0 1-6.5 0 6.8 6.8 0 0 1-6.5 0c-1 .6-2.2.9-3.5.9z"/>',
  taxi: '<path d="M9 2h6l.7 3H17a2 2 0 0 1 1.9 1.4L20.5 11H21a1 1 0 0 1 1 1v6h-2v2h-3v-2H7v2H4v-2H2v-6a1 1 0 0 1 1-1h.5l1.6-4.6A2 2 0 0 1 7 5h1.3zM7 7l-1.4 4h12.8L17 7zm-1.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm13 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>',
  funicular: '<path d="M3 21 21 7v2.6L5.6 21zM9 5h7a2 2 0 0 1 2 2v3.2L8.4 17.7A2 2 0 0 1 7 16V7a2 2 0 0 1 2-2zm0 2v4h7V7z"/>',
  plane: '<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>',
  home: '<path d="M12 3 2 11h3v9h6v-6h2v6h6v-9h3z"/>',
  bag: '<path d="M9 4a3 3 0 0 1 6 0v2h4l1 15H4L5 6h4zm2 2h2V4a1 1 0 0 0-2 0z"/>',
  moon: '<path d="M14.5 2A9.5 9.5 0 1 0 22 16.8 8 8 0 0 1 14.5 2z"/>',
  compass: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 6.5-2 5-5 2 2-5z"/>',
  cup: '<path d="M4 5h13v3h1.5a2.5 2.5 0 0 1 0 5H17a6 6 0 0 1-6 5H10a6 6 0 0 1-6-6zm13 5v1h1.5a.5.5 0 0 0 0-1zM3 20h16v2H3z"/>',
  star: '<path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7.1L12 17.3 5.8 21l1.6-7.1L2 9.2l7.1-.6z"/>',
  pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>'
};
function icon(name, cls) {
  return '<svg class="' + (cls || 'ico') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || ICONS.pin) + '</svg>';
}
function credit(key) {
  var p = PHOTOS[key];
  return '<a href="' + p.src + '" target="_blank" rel="noopener">' + esc(p.a) + ', ' + esc(p.l) + '</a>';
}
function prevQuery(day, i) {
  for (var j = i - 1; j >= 0; j--) {
    var s = day.slots[j];
    if (s.type === 'place' && !s.altStop) return s.q;
  }
  return HOTEL.q;
}

/* ---------- Render days ---------- */
function renderConnector(go, url, color) {
  var mode = go.mode;
  return '<div class="go" style="--day:' + color + '">' +
    '<span class="go-ico">' + icon(mode) + '</span>' +
    '<p class="go-text"><span class="go-from">From ' + esc(go.from) + (go.to ? ' to ' + esc(go.to) : '') + '</span>' +
    '<span class="go-how"><strong>' + MODE_LABEL[mode] + '</strong> · ' + esc(go.time) + ' <span class="approx">approx.</span>' +
    (go.via ? '<span class="go-via">' + esc(go.via) + '</span>' : '') + '</span></p>' +
    '<a class="go-link" href="' + url + '" target="_blank" rel="noopener">Directions<span class="sr-only"> from ' + esc(go.from) + ' in Google Maps (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>' +
    '</div>';
}

function renderPlace(day, s, i, n, color) {
  var p = PHOTOS[s.img];
  var url = s.go.url || gdir(prevQuery(day, s.altStop ? 0 : i), s.q, MODE_GMAPS[s.go.mode]);
  var badge = s.altStop ? 'B' : (s.options ? 'A–C' : String(n));
  var html = renderConnector(s.go, url, color);
  html += '<article class="stop' + (s.altStop ? ' stop--alt' : '') + '" style="--day:' + color + '">' +
    '<figure class="stop-fig">' +
      '<img src="images/' + s.img + '.webp" width="' + p.w + '" height="' + p.h + '" loading="lazy" decoding="async" alt="' + esc(s.alt) + '">' +
      '<span class="stop-badge" aria-hidden="true">' + badge + '</span>' +
      '<figcaption>Photo: ' + credit(s.img) + '</figcaption>' +
    '</figure>' +
    '<div class="stop-body">' +
      '<p class="stop-slot">' + esc(s.slot) + (s.kicker ? '<span class="stop-kicker"> · ' + esc(s.kicker) + '</span>' : '') + '</p>' +
      '<h4 class="stop-title">' + esc(s.name) + '</h4>' +
      '<p>' + esc(s.body) + '</p>' +
      (s.note ? '<p class="stop-note">' + esc(s.note) + '</p>' : '');
  if (s.options) {
    html += '<ul class="options">' + s.options.map(function (o, k) {
      return '<li><span class="opt-letter" aria-hidden="true">' + 'ABC'[k] + '</span><span class="opt-name">' + esc(o.name) + '</span>' +
        '<a href="' + gdir(HOTEL.q, o.q, 'walking') + '" target="_blank" rel="noopener">Walking route<span class="sr-only"> to ' + esc(o.name) + '</span> ↗</a></li>';
    }).join('') + '</ul>';
  }
  if (s.extra) html += '<p class="stop-extra"><a class="link-arrow" href="' + s.extra.url + '" target="_blank" rel="noopener">' + esc(s.extra.label) + '</a></p>';
  html += '</div></article>';
  return html;
}

function renderLight(day, s, color) {
  var h = '';
  if (s.type === 'transfer' && s.go && !s.goAfter) h += renderConnector(s.go, s.go.url, color);
  h += '<div class="light light--' + s.type + '" style="--day:' + color + '">' +
    '<span class="light-ico">' + icon(s.icon) + '</span>' +
    '<div><p class="stop-slot">' + esc(s.slot) + '</p>' +
    '<h4 class="light-title">' + esc(s.title) + '</h4>' +
    '<p>' + esc(s.text) + '</p>' +
    (s.meta ? '<p class="light-meta">' + esc(s.meta).replace('TBD', '<span class="tbd">TBD</span>') + '</p>' : '') +
    '</div></div>';
  if (s.type === 'transfer' && s.go && s.goAfter) h += renderConnector(s.go, s.go.url, color);
  return h;
}

var daysEl = document.getElementById('days');
var dayMaps = {};

DAYS.forEach(function (day, di) {
  var color = DAY_COLORS[day.id] || '#072849';
  var n = 0, stopsHtml = '';
  day.slots.forEach(function (s, i) {
    if (s.type === 'place') { if (!s.altStop && !s.options) n++; stopsHtml += renderPlace(day, s, i, s.options ? 0 : n, color); }
    else stopsHtml += renderLight(day, s, color);
  });
  var mapCaption = day.map && day.map.kind === 'world' ? 'Flight paths are drawn as great circles, for orientation only.' :
    day.map && day.map.kind === 'week' ? 'Every stop from the week, colored by day. Pick a favorite.' :
    'Numbered in order from the hotel (H). Dashed lines are legs to and from the hotel.';
  var el = document.createElement('article');
  el.className = 'day';
  el.id = 'day-' + day.id;
  el.style.setProperty('--day', color);
  el.innerHTML =
    '<h3 class="day-h">' +
      '<button class="day-btn" type="button" aria-expanded="false" aria-controls="panel-' + day.id + '" id="btn-' + day.id + '">' +
        '<span class="day-date"><span class="day-num">' + day.d + '</span><span class="day-mon">' + day.mon + ' · ' + day.dow + '</span></span>' +
        '<span class="day-titles"><span class="day-title">' + esc(day.title) + '</span><span class="day-sum">' + esc(day.summary) + '</span></span>' +
        '<span class="day-chev" aria-hidden="true"></span>' +
      '</button>' +
    '</h3>' +
    '<div class="day-panel" id="panel-' + day.id + '" role="region" aria-labelledby="btn-' + day.id + '">' +
      '<div class="day-panel-inner"><div class="day-grid">' +
        '<div class="day-stops">' + stopsHtml + '</div>' +
        '<aside class="day-side">' +
          '<div class="day-map-wrap"><div class="day-map" id="map-' + day.id + '" role="region" aria-label="Map of stops for ' + esc(day.mon + ' ' + day.d) + '"></div>' +
          '<p class="day-map-cap">' + mapCaption + '</p></div>' +
          '<div class="tip"><p class="kicker kicker--dark">Tip</p><p>' + esc(day.tip) + '</p></div>' +
        '</aside>' +
      '</div></div>' +
    '</div>';
  daysEl.appendChild(el);
});

/* ---------- Maps ---------- */
var TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
var TILE_OPTS = { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 19 };

function numIcon(label, color, cls) {
  return L.divIcon({ className: 'pin ' + (cls || ''), html: '<span style="--c:' + color + '">' + label + '</span>', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -14] });
}
function hotelIcon() {
  return L.divIcon({ className: 'pin pin--hotel', html: '<span>H</span>', iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -16] });
}
function greatCircle(a, b, steps) {
  var toR = Math.PI / 180, toD = 180 / Math.PI;
  var la1 = a[0] * toR, lo1 = a[1] * toR, la2 = b[0] * toR, lo2 = b[1] * toR;
  var d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((la2 - la1) / 2), 2) + Math.cos(la1) * Math.cos(la2) * Math.pow(Math.sin((lo2 - lo1) / 2), 2)));
  var pts = [];
  for (var i = 0; i <= steps; i++) {
    var f = i / steps, A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
    var x = A * Math.cos(la1) * Math.cos(lo1) + B * Math.cos(la2) * Math.cos(lo2);
    var y = A * Math.cos(la1) * Math.sin(lo1) + B * Math.cos(la2) * Math.sin(lo2);
    var z = A * Math.sin(la1) + B * Math.sin(la2);
    pts.push([Math.atan2(z, Math.sqrt(x * x + y * y)) * toD, Math.atan2(y, x) * toD]);
  }
  return pts;
}
function baseMap(el, opts) {
  var m = L.map(el, Object.assign({ scrollWheelZoom: false, zoomControl: true, attributionControl: true, zoomSnap: 0.25 }, opts || {}));
  L.tileLayer(TILE_URL, TILE_OPTS).addTo(m);
  return m;
}

function buildDayMap(day) {
  var el = document.getElementById('map-' + day.id);
  var color = DAY_COLORS[day.id] || '#072849';
  var m, bounds = [];
  if (day.map && day.map.kind === 'world') {
    m = baseMap(el, { worldCopyJump: false });
    var palette = ['#072849', '#946c00'];
    day.map.routes.forEach(function (r, k) {
      var a = P[r[0]], b = P[r[1]];
      L.polyline(greatCircle(a.ll, b.ll, 64), { color: palette[k], weight: 2.5, dashArray: '6 6' }).addTo(m).bindTooltip(r[2] + ': ' + r[0] + ' → ' + r[1]);
      [a, b].forEach(function (pt) { bounds.push(pt.ll); });
    });
    var seen = {};
    day.map.routes.forEach(function (r) {
      [r[0], r[1]].forEach(function (code) {
        if (seen[code]) return; seen[code] = 1;
        L.marker(P[code].ll, { icon: numIcon(code, code === 'IST' ? '#946c00' : '#072849', 'pin--code'), title: P[code].name, alt: P[code].name }).addTo(m).bindPopup('<strong>' + esc(P[code].name) + '</strong>');
      });
    });
    m.fitBounds(bounds, { padding: [24, 24] });
    return m;
  }
  m = baseMap(el);
  L.marker(HOTEL.ll, { icon: hotelIcon(), title: HOTEL.name, alt: HOTEL.name, zIndexOffset: 500 }).addTo(m).bindPopup('<strong>The Bank Hotel</strong><br>Home base, Karaköy');
  bounds.push(HOTEL.ll);
  if (day.map && day.map.kind === 'week') {
    DAYS.forEach(function (d2) {
      var c = DAY_COLORS[d2.id]; if (!c) return;
      d2.slots.forEach(function (s) {
        if (s.type !== 'place') return;
        (s.options || [s]).forEach(function (o) {
          L.circleMarker(o.ll, { radius: 7, color: '#fff', weight: 2, fillColor: c, fillOpacity: 1 }).addTo(m).bindPopup('<strong>' + esc(o.name) + '</strong><br>' + d2.mon + ' ' + d2.d);
          bounds.push(o.ll);
        });
      });
    });
    m.fitBounds(bounds, { padding: [20, 20] });
    return m;
  }
  var path = [HOTEL.ll], n = 0, prevWasHotel = true, homeLeg = false, hasAirport = false;
  day.slots.forEach(function (s) {
    if (s.type === 'transfer' && s.ll) {
      hasAirport = true;
      L.marker(s.ll, { icon: numIcon('IST', color, 'pin--code'), title: s.name, alt: s.name }).addTo(m).bindPopup('<strong>' + esc(s.name) + '</strong>');
      bounds.push(s.ll);
      L.polyline([s.ll, HOTEL.ll], { color: color, weight: 2.5, dashArray: '6 7', opacity: .9 }).addTo(m);
      return;
    }
    if (s.type !== 'place') return;
    if (s.options) {
      s.options.forEach(function (o, k) {
        L.marker(o.ll, { icon: numIcon('ABC'[k], color), title: o.name, alt: o.name }).addTo(m).bindPopup('<strong>' + esc(o.name) + '</strong><br>New Year’s Eve option');
        bounds.push(o.ll);
      });
      L.polyline([HOTEL.ll, s.ll], { color: color, weight: 2.5, dashArray: '6 7' }).addTo(m);
      return;
    }
    if (s.altStop) {
      L.marker(s.ll, { icon: numIcon('B', color, 'pin--alt'), title: s.name, alt: s.name }).addTo(m).bindPopup('<strong>Kadıköy</strong><br>Option B, instead of Balat');
      L.polyline([HOTEL.ll, s.ll], { color: color, weight: 2, dashArray: '2 7', opacity: .8 }).addTo(m);
      bounds.push(s.ll);
      return;
    }
    n++;
    L.marker(s.ll, { icon: numIcon(String(n), color), title: s.name, alt: s.name, zIndexOffset: 100 * n }).addTo(m).bindPopup('<strong>' + n + '. ' + esc(s.name) + '</strong>');
    path.push(s.ll); bounds.push(s.ll);
    if (s.home) homeLeg = true;
  });
  if (path.length > 1) {
    L.polyline(path.slice(0, 2), { color: color, weight: 2.5, dashArray: '6 7' }).addTo(m);
    if (path.length > 2) L.polyline(path.slice(1), { color: color, weight: 3.5 }).addTo(m);
    if (homeLeg && path.length > 2) L.polyline([path[path.length - 1], HOTEL.ll], { color: color, weight: 2.5, dashArray: '6 7' }).addTo(m);
  }
  /* If the day's stops are tightly clustered far from the hotel (e.g. Sultanahmet), frame the stops
     so numbered pins don't collide; the dashed leg still points toward the hotel. */
  var stopPts = bounds.filter(function (b) { return b !== HOTEL.ll; });
  if (!hasAirport && stopPts.length > 1) {
    var sb = L.latLngBounds(stopPts);
    var diag = sb.getNorthWest().distanceTo(sb.getSouthEast());
    var dh = sb.getCenter().distanceTo(L.latLng(HOTEL.ll));
    if (dh > 3 * Math.max(diag, 250)) { m.fitBounds(sb, { padding: [44, 44], maxZoom: 17 }); return m; }
  }
  m.fitBounds(bounds, { padding: hasAirport ? [30, 30] : [36, 36], maxZoom: 16 });
  return m;
}

/* ---------- Accordion ---------- */
var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var buttons = Array.prototype.slice.call(document.querySelectorAll('.day-btn'));

function setOpen(btn, open) {
  var id = btn.id.replace('btn-', '');
  var panel = document.getElementById('panel-' + id);
  btn.setAttribute('aria-expanded', String(open));
  btn.closest('.day').classList.toggle('is-open', open);
  panel.classList.toggle('open', open);
  if (open) {
    var day = DAYS.filter(function (d) { return d.id === id; })[0];
    var go = function () {
      if (!dayMaps[id]) dayMaps[id] = buildDayMap(day);
      else dayMaps[id].invalidateSize();
    };
    if (reduceMotion) go(); else setTimeout(go, 60);
    setTimeout(function () { if (dayMaps[id]) dayMaps[id].invalidateSize(); }, 520);
  }
  updateExpandAll();
}
buttons.forEach(function (btn, idx) {
  btn.addEventListener('click', function () { setOpen(btn, btn.getAttribute('aria-expanded') !== 'true'); });
  btn.addEventListener('keydown', function (e) {
    var t = null;
    if (e.key === 'ArrowDown') t = buttons[(idx + 1) % buttons.length];
    else if (e.key === 'ArrowUp') t = buttons[(idx - 1 + buttons.length) % buttons.length];
    else if (e.key === 'Home') t = buttons[0];
    else if (e.key === 'End') t = buttons[buttons.length - 1];
    if (t) { e.preventDefault(); t.focus(); }
  });
});
var expandBtn = document.getElementById('expand-all');
function updateExpandAll() {
  var allOpen = buttons.every(function (b) { return b.getAttribute('aria-expanded') === 'true'; });
  expandBtn.textContent = allOpen ? 'Close all days' : 'Open all days';
  expandBtn.setAttribute('aria-pressed', String(allOpen));
}
expandBtn.addEventListener('click', function () {
  var allOpen = buttons.every(function (b) { return b.getAttribute('aria-expanded') === 'true'; });
  buttons.forEach(function (b) { setOpen(b, !allOpen); });
});

/* Open from hash (#day-dec-27) or default to the first sightseeing day */
function openFromHash() {
  var m = location.hash.match(/^#day-([a-z]{3}-\d{2})$/);
  if (m) { var b = document.getElementById('btn-' + m[1]); if (b) { setOpen(b, true); return true; } }
  return false;
}
if (!openFromHash()) setOpen(document.getElementById('btn-dec-25'), true);
window.addEventListener('hashchange', openFromHash);

/* ---------- City map ---------- */
(function cityMap() {
  var m = baseMap('city-map', { zoomSnap: 0.25 });
  var bounds = [HOTEL.ll], legend = document.getElementById('legend-list');
  L.marker(HOTEL.ll, { icon: hotelIcon(), title: HOTEL.name, alt: HOTEL.name, zIndexOffset: 1000 }).addTo(m).bindPopup('<strong>The Bank Hotel</strong><br>Home base · Dec 26 – Jan 3');
  legend.insertAdjacentHTML('beforeend', '<li><span class="lg-dot lg-dot--hotel" aria-hidden="true">H</span>The Bank Hotel, Karaköy</li>');
  DAYS.forEach(function (d) {
    var c = DAY_COLORS[d.id]; if (!c) return;
    var count = 0;
    d.slots.forEach(function (s) {
      if (s.type !== 'place') return;
      (s.options || [s]).forEach(function (o) {
        var label = s.options ? o.name + ' (NYE option)' : s.altStop ? 'Kadıköy (option B)' : s.name;
        L.circleMarker(o.ll, { radius: 8, color: '#fff', weight: 2.5, fillColor: c, fillOpacity: 1 })
          .addTo(m).bindPopup('<strong>' + esc(label) + '</strong><br><span class="pop-day" style="color:' + c + '">' + d.mon + ' ' + d.d + ' · ' + esc(d.title) + '</span>');
        bounds.push(o.ll); count++;
      });
    });
    legend.insertAdjacentHTML('beforeend', '<li><span class="lg-dot" style="background:' + c + '" aria-hidden="true"></span><a href="#day-' + d.id + '"><strong>' + d.mon + ' ' + d.d + '</strong> ' + esc(d.title) + '</a><span class="lg-count">' + count + '</span></li>');
  });
  m.fitBounds(bounds, { padding: [28, 28] });
})();

/* ---------- Credits ---------- */
(function credits() {
  var ol = document.getElementById('credit-list');
  Object.keys(PHOTOS).forEach(function (k) {
    var p = PHOTOS[k];
    var lic = p.lu ? '<a href="' + p.lu + '" target="_blank" rel="noopener license">' + esc(p.l) + '</a>' : esc(p.l);
    ol.insertAdjacentHTML('beforeend', '<li><span class="cr-t">' + esc(p.t) + '</span><span class="cr-m">' + esc(p.a) + ' · ' + lic + ' · <a href="' + p.src + '" target="_blank" rel="noopener">Source</a></span></li>');
  });
})();

/* ---------- Nav state + reveal ---------- */
var nav = document.querySelector('.site-nav');
var onScroll = function () { nav.classList.toggle('is-solid', window.scrollY > 40); };
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
}
})();
