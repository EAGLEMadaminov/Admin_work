import stars from 'src/assets/stars.png';
import location from 'src/assets/location.svg';
import home from 'src/assets/home.svg';
import wifi from 'src/assets/wifi.svg';
import Agency from 'src/assets/agency.png';
let posts = [
  {
    id: 1,
    img: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/07/30/2209446-1801517276.png?itok=uVwPSOT9',
    price: '540',
    title: 'A Stylish Apt, 5 min walk to Queen Victoria Market',
    description: 'Entire apartment rental in Collingwood',
    createdAt: '15.03.2024',
    options: [
      { id: 1, name: 'Collingwood VIC', icon: location },
      { id: 2, name: '1 bed', icon: home },
      { id: 3, name: 'WIFI', icon: wifi },
    ],
  },
  {
    id: 2,
    img: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/07/30/2209446-1801517276.png?itok=uVwPSOT9',
    price: '620',
    title: 'A Stylish Apt, 5 min walk to Queen Victoria Market',
    description: 'Entire apartment rental in Collingwood',
    createdAt: '15.03.2024',
    options: [
      { id: 1, name: 'Collingwood VIC', icon: location },
      { id: 2, name: '1 bed', icon: home },
      { id: 3, name: 'WIFI', icon: wifi },
    ],
  },
  {
    id: 3,
    img: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/07/30/2209446-1801517276.png?itok=uVwPSOT9',
    price: '490',
    title: 'A Stylish Apt, 5 min walk to Queen Victoria Market',
    description: 'Entire apartment rental in Collingwood',
    createdAt: '15.03.2024',
    options: [
      { id: 1, name: 'Collingwood VIC', icon: location },
      { id: 2, name: '1 bed', icon: home },
      { id: 3, name: 'WIFI', icon: wifi },
    ],
  },
  {
    id: 4,
    img: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/07/30/2209446-1801517276.png?itok=uVwPSOT9',
    price: '600',
    title: 'A Stylish Apt, 5 min walk to Queen Victoria Market',
    description: 'Entire apartment rental in Collingwood',
    createdAt: '15.03.2024',
    options: [
      { id: 1, name: 'Collingwood VIC', icon: location },
      { id: 2, name: '1 bed', icon: home },
      { id: 3, name: 'WIFI', icon: wifi },
    ],
  },
  {
    id: 5,
    img: 'https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2020/07/30/2209446-1801517276.png?itok=uVwPSOT9',
    price: '700',
    title: 'A Stylish Apt, 5 min walk to Queen Victoria Market',
    description: 'Entire apartment rental in Collingwood',
    createdAt: '15.03.2024',
    options: [
      { id: 1, name: 'Collingwood VIC', icon: location },
      { id: 2, name: '1 bed', icon: home },
      { id: 3, name: 'WIFI', icon: wifi },
    ],
  },
];

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City (Holy See)',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];
const agencies = [
  {
    id: 1,
    name: 'Mascan',
    createdAt: '28.02.2024',
    period: '21.03.2024',
    flyCity: 'Tashkent',
    visitCity: 'Анталья',
    isActive: false,
    siteLink: 'mascantravel.uz',
    image: Agency,
  },
  {
    id: 2,
    name: 'Safiya',
    createdAt: '28.02.2024',
    period: '21.04.2024',
    flyCity: 'Tashkent',
    visitCity: 'Mecca',
    isActive: true,
    siteLink: 'safiyaravel.uz',
    image: Agency,
  },
  {
    id: 3,
    name: 'Muslim',
    createdAt: '28.02.2024',
    period: '21.03.2024',
    flyCity: 'Tashkent',
    visitCity: 'Анталья',
    isActive: true,
    siteLink: 'mascantravel.uz',
    image: Agency,
  },
  {
    id: 4,
    name: 'Mascan',
    createdAt: '28.02.2024',
    period: '21.03.2024',
    flyCity: 'Tashkent',
    visitCity: 'Анталья',
    isActive: true,
    siteLink: 'mascantravel.uz',
    image: Agency,
  },
  {
    id: 5,
    name: 'Mascan',
    createdAt: '28.02.2024',
    period: '21.03.2024',
    flyCity: 'Tashkent',
    visitCity: 'Анталья',
    isActive: true,
    siteLink: 'mascantravel.uz',
    image: Agency,
  },
  {
    id: 6,
    name: 'Mascan',
    createdAt: '28.02.2024',
    period: '21.03.2024',
    flyCity: 'Tashkent',
    visitCity: 'Анталья',
    isActive: true,
    siteLink: 'mascantravel.uz',
    image: Agency,
  },
];

const Facilities = [
  {
    id: 1,
    text: 'Бассейн',
    label: 'swim',
  },
  {
    id: 2,
    text: 'Спа',
    label: 'spa',
  },
  {
    id: 3,
    text: 'Вид на океан',
    label: 'sea',
  },
  {
    id: 4,
    text: 'Гидромассажная ванна',
    label: 'masage',
  },
  {
    id: 5,
    text: 'Возможно размещение с домашними животными',
    label: 'pet',
  },
  {
    id: 6,
    text: 'Трансфер от /до аэропорта включен в стоимость',
    label: 'transfer',
  },
  {
    id: 7,
    text: 'Тренажерный зал',
    label: 'train',
  },
  {
    id: 8,
    text: 'Аквапарк',
    label: 'akvapark',
  },
  {
    id: 9,
    text: 'Wi-Fi включен',
    label: 'wifi',
  },
  {
    id: 10,
    text: 'Стиральная машина и сушилка',
    label: 'washmachine',
  },
  {
    id: 11,
    text: 'Парковка',
    label: 'avtopark',
  },
  {
    id: 12,
    text: 'Открытая площадка',
    label: 'avtopark',
  },
  {
    id: 13,
    text: 'Ресторан',
    label: 'restoran',
  },
];

const LineChartData = {
  labels: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  datasets: [
    {
      label: 'Станбул',
      data: [
        3000, 4000, 6000, 6500, 7000, 8000, 4000, 5000, 9000, 2000, 12000,
        15000,
      ],
      borderColor: '#95A4FC',
    },
    {
      label: 'Дубай',
      data: [
        5000, 6000, 3000, 8500, 12000, 23000, 6000, 2000, 9000, 12000, 5000,
        17000,
      ],
      borderColor: '#FFBB55',
    },
    {
      label: 'Париж',
      data: [
        1000, 3000, 7000, 8500, 12000, 3000, 23000, 25000, 9000, 12000, 20000,
        17000,
      ],
      borderColor: '#A1E3CB',
    },
  ],
};
const barChartData = {
  labels: ['Станбул', 'Дубай', 'Анталия', 'Париж', 'Мекка'],
  datasets: [
    {
      label: 'Продано',
      data: [1000, 400, 550, 600, 1000],
      backgroundColor: '#5488CF',
    },
    {
      label: 'Просмотрено',
      data: [700, 500, 450, 400, 1000],
      backgroundColor: '#00BEF3',
    },
  ],
};
const popularCities = {
  labels: ['Станбул', 'Дубай', 'Анталия', 'Париж', 'Мекка'],
  datasets: [
    {
      label: 'Продано',
      data: [1000, 400, 550, 600, 1000],
      backgroundColor: '#5488CF',
    },
  ],
};
export {
  posts,
  countries,
  agencies,
  Facilities,
  LineChartData,
  barChartData,
  popularCities,
};
