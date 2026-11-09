const RAW = `
H Hydrogen nonmetal
He Helium noble
Li Lithium alkali
Be Beryllium alkaline
B Boron metalloid
C Carbon nonmetal
N Nitrogen nonmetal
O Oxygen nonmetal
F Fluorine halogen
Ne Neon noble
Na Sodium alkali
Mg Magnesium alkaline
Al Aluminium post
Si Silicon metalloid
P Phosphorus nonmetal
S Sulfur nonmetal
Cl Chlorine halogen
Ar Argon noble
K Potassium alkali
Ca Calcium alkaline
Sc Scandium transition
Ti Titanium transition
V Vanadium transition
Cr Chromium transition
Mn Manganese transition
Fe Iron transition
Co Cobalt transition
Ni Nickel transition
Cu Copper transition
Zn Zinc transition
Ga Gallium post
Ge Germanium metalloid
As Arsenic metalloid
Se Selenium nonmetal
Br Bromine halogen
Kr Krypton noble
Rb Rubidium alkali
Sr Strontium alkaline
Y Yttrium transition
Zr Zirconium transition
Nb Niobium transition
Mo Molybdenum transition
Tc Technetium transition
Ru Ruthenium transition
Rh Rhodium transition
Pd Palladium transition
Ag Silver transition
Cd Cadmium transition
In Indium post
Sn Tin post
Sb Antimony metalloid
Te Tellurium metalloid
I Iodine halogen
Xe Xenon noble
Cs Caesium alkali
Ba Barium alkaline
La Lanthanum lanthanide
Ce Cerium lanthanide
Pr Praseodymium lanthanide
Nd Neodymium lanthanide
Pm Promethium lanthanide
Sm Samarium lanthanide
Eu Europium lanthanide
Gd Gadolinium lanthanide
Tb Terbium lanthanide
Dy Dysprosium lanthanide
Ho Holmium lanthanide
Er Erbium lanthanide
Tm Thulium lanthanide
Yb Ytterbium lanthanide
Lu Lutetium lanthanide
Hf Hafnium transition
Ta Tantalum transition
W Tungsten transition
Re Rhenium transition
Os Osmium transition
Ir Iridium transition
Pt Platinum transition
Au Gold transition
Hg Mercury transition
Tl Thallium post
Pb Lead post
Bi Bismuth post
Po Polonium post
At Astatine halogen
Rn Radon noble
Fr Francium alkali
Ra Radium alkaline
Ac Actinium actinide
Th Thorium actinide
Pa Protactinium actinide
U Uranium actinide
Np Neptunium actinide
Pu Plutonium actinide
Am Americium actinide
Cm Curium actinide
Bk Berkelium actinide
Cf Californium actinide
Es Einsteinium actinide
Fm Fermium actinide
Md Mendelevium actinide
No Nobelium actinide
Lr Lawrencium actinide
Rf Rutherfordium transition
Db Dubnium transition
Sg Seaborgium transition
Bh Bohrium transition
Hs Hassium transition
Mt Meitnerium unknown
Ds Darmstadtium unknown
Rg Roentgenium unknown
Cn Copernicium unknown
Nh Nihonium unknown
Fl Flerovium unknown
Mc Moscovium unknown
Lv Livermorium unknown
Ts Tennessine unknown
Og Oganesson unknown
`;

function position(n) {
    if (n === 1) return { row: 0, col: 0 };
    if (n === 2) return { row: 0, col: 17 };
    if (n <= 4) return { row: 1, col: n - 3 };
    if (n <= 10) return { row: 1, col: n + 7 };
    if (n <= 12) return { row: 2, col: n - 11 };
    if (n <= 18) return { row: 2, col: n - 1 };
    if (n <= 36) return { row: 3, col: n - 19 };
    if (n <= 54) return { row: 4, col: n - 37 };
    if (n <= 56) return { row: 5, col: n - 55 };
    if (n <= 71) return { row: 7, col: n - 55 };
    if (n <= 86) return { row: 5, col: n - 69 };
    if (n <= 88) return { row: 6, col: n - 87 };
    if (n <= 103) return { row: 8, col: n - 87 };
    return { row: 6, col: n - 101 };
}

export const ELEMENTS = RAW.trim().split('\n').map((line, i) => {
    const [symbol, name, type] = line.trim().split(' ');
    const number = i + 1;
    return { number, symbol, name, type, ...position(number) };
});

export const TYPE_COLORS = {
    nonmetal: '#7bd88f',
    noble: '#c792ea',
    alkali: '#ff7b72',
    alkaline: '#ffb454',
    transition: '#6fa8ff',
    post: '#9fb4c7',
    metalloid: '#4fd1c5',
    halogen: '#f4e04d',
    lanthanide: '#ff9ad5',
    actinide: '#d6b38a',
    unknown: '#555a6a',
};