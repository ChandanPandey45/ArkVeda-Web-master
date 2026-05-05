import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Circle,
  Rect,
  Line,
  Polygon,
} from '@react-pdf/renderer';

import coverImg from '../../assets/solar-rooftop.png';
import proposalImg from '../../assets/solar-proposal.png';
import logoImg from '../../assets/arkveda-logo.png';
import gpayImg from '../../assets/gpay.png';
import paytmImg from '../../assets/paytm.png';
import amazonImg from '../../assets/amazon.png';
import phonepayImg from '../../assets/phonepay.png';
import bhimImg from '../../assets/bhim.png';

// --- SCHEMA & TYPES ---
export interface QuotationMaterial {
  description: string;
  specification: string;
  qty: string;
  brand: string;
  warranty: string;
}

export interface QuotationCable {
  type: string;
  length: string;
}

export interface QuotationData {
  id: string;
  date: string;
  regionalOffice: string;
  gstin: string;
  client: {
    name: string;
    phone: string;
    address: string;
  };
  system: {
    size: string;
    ratePerKw: number;
    validityDays: number;
  };
  pricing: {
    basicPrice: number;
    potentialSubsidy: number;
    stateSubsidy: number;
  };
  paymentTerms: {
    advancePct: number;
    deliveryPct: number;
    meteringPct: number;
  };
  bankDetails: {
    accountHolder: string;
    accountNo: string;
    ifsc: string;
    vendorCode: string;
    upiId?: string;
  };
  materials: QuotationMaterial[];
  cables: QuotationCable[];
}

// --- IMPROVED COLOR PALETTE ---
// Cohesive solar energy palette: deep teal primary + warm amber accent + golden yellow
const C = {
  // Primary brand — rich teal (nature + technology)
  solarGreen: '#00796B',
  solarTeal: '#00796B',
  primaryMid: '#009688',
  primaryLight: '#4DB6AC',

  // Accent — warm solar amber (energy + warmth)
  accent: '#FF6D00',
  accentLight: '#FFE0B2',

  // Highlight yellow — warm gold (replacing harsh lime)
  solarYellow: '#FFD600',
  solarGold: '#FFC107',

  // Neutrals
  solarGray: '#37474F',
  white: '#FFFFFF',
  lightBg: '#FAFAFA',
  lightBlue: '#E0F4F1',
  lightGreen: '#E0F2F1',
  coverBg: '#FAFAFA',
  grayText: '#607D8B',
  lightGray: '#CFD8DC',
  borderGray: '#B0BEC5',
  darkText: '#263238',

  // Step colors — distinct but harmonious
  step1: '#0277BD',   // ocean blue — logistics/delivery
  step1Bg: '#E1F5FE',
  step2: '#558B2F',   // earthy green — foundation/structure
  step2Bg: '#F1F8E9',
  step3: '#6A1B9A',   // deep purple — tech/electrical
  step3Bg: '#F3E5F5',

  // Other
  navy: '#1A237E',
  orange: '#E65100',
  accentGreen: '#00796B',
};

// --- STYLES ---
const s = StyleSheet.create({
  contentPage: {
    fontFamily: 'Helvetica',
    backgroundColor: C.coverBg,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  bodyArea: { flex: 1 },

  hdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: C.solarGreen,
    paddingBottom: 8,
    marginBottom: 16,
  },
  hdrLogo: { height: 30, width: 120 },
  hdrRight: { fontSize: 9, color: C.grayText, textAlign: 'right' },

  ftr: {
    backgroundColor: C.solarGreen,
    paddingVertical: 8,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  ftrLogo: { height: 18, width: 72 },
  ftrText: { fontSize: 7, color: C.white },
  ftrTextOrange: { fontSize: 7, color: C.solarYellow, fontWeight: 'bold' },
  ftrRight: { alignItems: 'flex-end' },

  secTitle: { fontSize: 16, fontWeight: 'bold', color: C.solarGreen, marginBottom: 8, marginTop: 8 },

  body: { fontSize: 9, color: C.grayText, lineHeight: 1.6, marginBottom: 5 },

  tbl: { width: '100%', borderWidth: 1, borderColor: C.solarGreen, marginBottom: 12 },
  tblHdrRow: { flexDirection: 'row', backgroundColor: C.solarGreen },
  tblRow: { flexDirection: 'row', backgroundColor: C.lightBg, borderBottomWidth: 1, borderBottomColor: C.borderGray },
  tblRowLast: { flexDirection: 'row', backgroundColor: C.lightBg },
  tblHdrCell: { padding: 5, fontSize: 8, fontWeight: 'bold', color: C.white, borderRightWidth: 1, borderRightColor: C.borderGray },
  tblCell: { padding: 5, fontSize: 8, color: C.darkText, borderRightWidth: 1, borderRightColor: C.borderGray },

  costHdrRow: { flexDirection: 'row', backgroundColor: C.solarGreen },
  costRow: { flexDirection: 'row', backgroundColor: C.lightBg, borderBottomWidth: 1, borderBottomColor: C.borderGray },
  costRowAlt: { flexDirection: 'row', backgroundColor: C.lightGreen, borderBottomWidth: 1, borderBottomColor: C.borderGray },
  costRowTotal: { flexDirection: 'row', backgroundColor: C.solarGreen },
  costHdrCell: { width: '55%', padding: 5, fontSize: 9, fontWeight: 'bold', color: C.white },
  costHdrCellR: { width: '45%', padding: 5, fontSize: 9, fontWeight: 'bold', color: C.white, textAlign: 'right' },
  costCell: { width: '55%', padding: 5, fontSize: 9, color: C.darkText },
  costCellR: { width: '45%', padding: 5, fontSize: 9, color: C.darkText, textAlign: 'right' },
  costCellW: { color: C.white },

  termLine: { fontSize: 8, color: C.grayText, marginBottom: 3 },
  termAccent: { color: C.solarGreen, fontWeight: 'bold' },

  // --- Updated step card styles ---
  stepCard: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.borderGray,
    backgroundColor: C.white,
  },
  stepStripe: { width: 5 },
  stepTextArea: { flex: 1, padding: 10 },
  stepHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stepBadgeText: { fontSize: 15, fontWeight: 'bold', color: C.white },
  stepTitle: { fontSize: 10, fontWeight: 'bold', marginBottom: 1 },
  stepSub: { fontSize: 8, color: C.grayText },
  stepDesc: { fontSize: 8, color: C.grayText, lineHeight: 1.5 },
  stepDiagram: {
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  iconRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 14, marginBottom: 8 },
  iconBox: { alignItems: 'center', width: '18%' },
  iconCircle: {
    width: 52, height: 52, borderRadius: 26,
    borderWidth: 2, borderColor: C.solarGreen,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 6, backgroundColor: C.lightGreen,
  },
  iconLabel: { fontSize: 7, color: C.solarGreen, textAlign: 'center', fontWeight: 'bold' },
});

// ─── SVG: Step 1 — Dispatch Truck ───
const TruckDiagram = () => (
  <Svg viewBox="0 0 130 90" width="120" height="80">
    {/* Road */}
    <Rect x="0" y="76" width="130" height="14" fill="#ECEFF1" />
    <Line x1="10" y1="83" x2="30" y2="83" stroke="#B0BEC5" strokeWidth="1.5" strokeDasharray="6,4" />
    <Line x1="50" y1="83" x2="70" y2="83" stroke="#B0BEC5" strokeWidth="1.5" strokeDasharray="6,4" />
    <Line x1="90" y1="83" x2="110" y2="83" stroke="#B0BEC5" strokeWidth="1.5" strokeDasharray="6,4" />

    {/* Truck cargo box */}
    <Rect x="6" y="36" width="72" height="38" rx="3" fill="#E1F5FE" stroke={C.step1} strokeWidth="1.5" />
    {/* Cargo door lines */}
    <Line x1="42" y1="36" x2="42" y2="74" stroke={C.step1} strokeWidth="0.8" strokeDasharray="3,2" />
    <Line x1="6" y1="55" x2="78" y2="55" stroke={C.step1} strokeWidth="0.8" strokeDasharray="3,2" />

    {/* Package 1 */}
    <Rect x="14" y="42" width="22" height="16" rx="2" fill="#FFF9C4" stroke={C.solarGold} strokeWidth="1" />
    <Line x1="25" y1="42" x2="25" y2="58" stroke={C.solarGold} strokeWidth="0.8" />
    <Line x1="14" y1="50" x2="36" y2="50" stroke={C.solarGold} strokeWidth="0.8" />

    {/* Package 2 */}
    <Rect x="42" y="42" width="22" height="16" rx="2" fill="#FFF3E0" stroke={C.accent} strokeWidth="1" />
    <Line x1="53" y1="42" x2="53" y2="58" stroke={C.accent} strokeWidth="0.8" />
    <Line x1="42" y1="50" x2="64" y2="50" stroke={C.accent} strokeWidth="0.8" />

    {/* Solar panel in cargo area (small) */}
    <Rect x="14" y="60" width="50" height="10" rx="1" fill="#80DEEA" stroke="#00838F" strokeWidth="0.8" />
    <Line x1="25" y1="60" x2="25" y2="70" stroke="#00838F" strokeWidth="0.5" />
    <Line x1="36" y1="60" x2="36" y2="70" stroke="#00838F" strokeWidth="0.5" />
    <Line x1="47" y1="60" x2="47" y2="70" stroke="#00838F" strokeWidth="0.5" />
    <Line x1="14" y1="65" x2="64" y2="65" stroke="#00838F" strokeWidth="0.5" />

    {/* Truck cab */}
    <Rect x="78" y="46" width="42" height="28" rx="3" fill="#BBDEFB" stroke={C.step1} strokeWidth="1.5" />
    {/* Windshield */}
    <Rect x="82" y="50" width="20" height="14" rx="2" fill="#E3F2FD" stroke={C.step1} strokeWidth="0.8" />
    {/* Door */}
    <Rect x="104" y="51" width="12" height="18" rx="1" fill="#90CAF9" stroke={C.step1} strokeWidth="0.8" />
    {/* Door handle */}
    <Line x1="110" y1="60" x2="114" y2="60" stroke={C.step1} strokeWidth="1" />
    {/* Exhaust */}
    <Rect x="116" y="36" width="4" height="10" rx="1" fill="#90A4AE" />
    <Circle cx="118" cy="35" r="2.5" fill="#B0BEC5" opacity="0.6" />
    <Circle cx="119" cy="31" r="1.8" fill="#B0BEC5" opacity="0.4" />

    {/* Wheels */}
    <Circle cx="28" cy="76" r="8" fill="#37474F" />
    <Circle cx="28" cy="76" r="4" fill="#78909C" />
    <Circle cx="28" cy="76" r="1.5" fill="#CFD8DC" />
    <Circle cx="62" cy="76" r="8" fill="#37474F" />
    <Circle cx="62" cy="76" r="4" fill="#78909C" />
    <Circle cx="62" cy="76" r="1.5" fill="#CFD8DC" />
    <Circle cx="104" cy="76" r="8" fill="#37474F" />
    <Circle cx="104" cy="76" r="4" fill="#78909C" />
    <Circle cx="104" cy="76" r="1.5" fill="#CFD8DC" />

    {/* Sun */}
    <Circle cx="115" cy="15" r="9" fill={C.solarYellow} opacity="0.9" />
    <Line x1="115" y1="3" x2="115" y2="0" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="124" y1="6" x2="126" y2="4" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="127" y1="15" x2="130" y2="15" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="124" y1="24" x2="126" y2="26" stroke={C.solarYellow} strokeWidth="1.5" />

    {/* Motion lines */}
    <Line x1="0" y1="52" x2="6" y2="52" stroke={C.step1} strokeWidth="1.2" opacity="0.4" />
    <Line x1="0" y1="57" x2="4" y2="57" stroke={C.step1} strokeWidth="1" opacity="0.3" />
    <Line x1="0" y1="62" x2="5" y2="62" stroke={C.step1} strokeWidth="0.8" opacity="0.2" />
  </Svg>
);

// ─── SVG: Step 2 — Mounting Structure ───
const StructureDiagram = () => (
  <Svg viewBox="0 0 130 90" width="120" height="80">
    {/* Ground line */}
    <Line x1="10" y1="80" x2="120" y2="80" stroke="#A5D6A7" strokeWidth="2" />
    {/* Ground fill */}
    <Rect x="10" y="80" width="110" height="10" fill="#E8F5E9" />

    {/* Concrete bases */}
    <Rect x="20" y="74" width="14" height="6" rx="1" fill="#B0BEC5" stroke="#78909C" strokeWidth="0.8" />
    <Rect x="56" y="74" width="14" height="6" rx="1" fill="#B0BEC5" stroke="#78909C" strokeWidth="0.8" />
    <Rect x="92" y="74" width="14" height="6" rx="1" fill="#B0BEC5" stroke="#78909C" strokeWidth="0.8" />

    {/* Vertical posts */}
    <Rect x="25" y="40" width="4" height="34" rx="1" fill="#78909C" stroke="#546E7A" strokeWidth="0.8" />
    <Rect x="61" y="45" width="4" height="29" rx="1" fill="#78909C" stroke="#546E7A" strokeWidth="0.8" />
    <Rect x="97" y="50" width="4" height="24" rx="1" fill="#78909C" stroke="#546E7A" strokeWidth="0.8" />

    {/* Diagonal braces (left) */}
    <Line x1="27" y1="74" x2="18" y2="52" stroke="#607D8B" strokeWidth="1.5" />
    <Line x1="63" y1="74" x2="54" y2="56" stroke="#607D8B" strokeWidth="1.5" />
    <Line x1="99" y1="74" x2="90" y2="61" stroke="#607D8B" strokeWidth="1.5" />

    {/* Top horizontal rail — tilted */}
    <Line x1="22" y1="38" x2="94" y2="48" stroke="#546E7A" strokeWidth="3" strokeLinecap="round" />
    {/* Second rail */}
    <Line x1="24" y1="50" x2="96" y2="60" stroke="#546E7A" strokeWidth="2" strokeLinecap="round" />

    {/* Cross members on rails */}
    <Line x1="42" y1="40.5" x2="44" y2="52.5" stroke="#78909C" strokeWidth="1.2" />
    <Line x1="62" y1="43" x2="64" y2="55" stroke="#78909C" strokeWidth="1.2" />
    <Line x1="78" y1="45" x2="80" y2="57" stroke="#78909C" strokeWidth="1.2" />

    {/* Panel outline (dashed — to-be-installed) */}
    <Rect x="22" y="33" width="72" height="20" rx="2"
      fill="none" stroke={C.step2} strokeWidth="1.2" strokeDasharray="4,3" opacity="0.7" />
    <Line x1="46" y1="33" x2="47" y2="53" stroke={C.step2} strokeWidth="0.7" strokeDasharray="3,2" opacity="0.5" />
    <Line x1="70" y1="33" x2="71" y2="53" stroke={C.step2} strokeWidth="0.7" strokeDasharray="3,2" opacity="0.5" />
    <Line x1="22" y1="43" x2="94" y2="43" stroke={C.step2} strokeWidth="0.7" strokeDasharray="3,2" opacity="0.5" />

    {/* Worker figure */}
    <Circle cx="112" cy="55" r="5" fill="#FFCCBC" stroke="#E64A19" strokeWidth="0.8" />
    <Line x1="112" y1="60" x2="112" y2="74" stroke="#37474F" strokeWidth="2" />
    <Line x1="106" y1="65" x2="112" y2="63" stroke="#37474F" strokeWidth="1.5" />
    <Line x1="112" y1="63" x2="118" y2="61" stroke="#37474F" strokeWidth="1.5" />
    <Line x1="112" y1="74" x2="108" y2="80" stroke="#37474F" strokeWidth="1.5" />
    <Line x1="112" y1="74" x2="116" y2="80" stroke="#37474F" strokeWidth="1.5" />
    {/* Hard hat */}
    <Path d="M107 54 Q112 48 117 54" fill={C.solarGold} stroke={C.accent} strokeWidth="0.8" />
    {/* Tool in hand */}
    <Line x1="106" y1="65" x2="102" y2="70" stroke="#546E7A" strokeWidth="1.5" />
    <Rect x="100" y="69" width="4" height="2" rx="0.5" fill="#546E7A" />

    {/* Sun top-right */}
    <Circle cx="116" cy="14" r="8" fill={C.solarYellow} opacity="0.85" />
    <Line x1="116" y1="3" x2="116" y2="1" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="125" y1="6" x2="127" y2="4" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="127" y1="14" x2="130" y2="14" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="124" y1="22" x2="126" y2="24" stroke={C.solarYellow} strokeWidth="1.5" />
  </Svg>
);

// ─── SVG: Step 3 — Panel Installation ───
const InstallationDiagram = () => (
  <Svg viewBox="0 0 130 90" width="120" height="80">
    {/* Sky */}
    <Rect x="0" y="0" width="130" height="90" fill="#F0F8FF" opacity="0.5" />

    {/* House wall */}
    <Rect x="5" y="55" width="120" height="35" rx="2" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1" />

    {/* Roof */}
    <Polygon points="0,55 65,12 130,55" fill="#78909C" />
    <Polygon points="3,55 65,15 127,55" fill="#90A4AE" />

    {/* Solar panels on roof — left side */}
    {/* Panel row 1 */}
    <Rect x="12" y="37" width="22" height="13" rx="1"
      fill="#1A237E" stroke="#283593" strokeWidth="0.8"
      transform="rotate(-30, 23, 43)" />
    {/* Grid on panel 1 */}
    <Line x1="19" y1="33" x2="18" y2="44" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 23, 43)" opacity="0.7" />
    <Line x1="23" y1="33" x2="22" y2="44" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 23, 43)" opacity="0.7" />
    <Line x1="14" y1="40" x2="26" y2="40" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 23, 43)" opacity="0.7" />

    {/* Panel 2 */}
    <Rect x="30" y="30" width="22" height="13" rx="1"
      fill="#1A237E" stroke="#283593" strokeWidth="0.8"
      transform="rotate(-30, 41, 36)" />
    <Line x1="37" y1="26" x2="36" y2="37" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 41, 36)" opacity="0.7" />
    <Line x1="41" y1="26" x2="40" y2="37" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 41, 36)" opacity="0.7" />
    <Line x1="32" y1="33" x2="44" y2="33" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 41, 36)" opacity="0.7" />

    {/* Panel 3 */}
    <Rect x="48" y="24" width="22" height="13" rx="1"
      fill="#1A237E" stroke="#283593" strokeWidth="0.8"
      transform="rotate(-30, 59, 30)" />
    <Line x1="55" y1="20" x2="54" y2="31" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 59, 30)" opacity="0.7" />
    <Line x1="59" y1="20" x2="58" y2="31" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 59, 30)" opacity="0.7" />
    <Line x1="50" y1="27" x2="62" y2="27" stroke="#3949AB" strokeWidth="0.4"
      transform="rotate(-30, 59, 30)" opacity="0.7" />

    {/* Shine on panels */}
    <Line x1="14" y1="38" x2="18" y2="34" stroke="#7986CB" strokeWidth="0.8" opacity="0.6"
      transform="rotate(-30, 23, 43)" />
    <Line x1="32" y1="31" x2="36" y2="27" stroke="#7986CB" strokeWidth="0.8" opacity="0.6"
      transform="rotate(-30, 41, 36)" />
    <Line x1="50" y1="25" x2="54" y2="21" stroke="#7986CB" strokeWidth="0.8" opacity="0.6"
      transform="rotate(-30, 59, 30)" />

    {/* DC wire from panels going down */}
    <Path d="M55 54 Q55 60 50 64" fill="none" stroke="#EF6C00" strokeWidth="1.2" />
    <Line x1="50" y1="64" x2="50" y2="72" stroke="#EF6C00" strokeWidth="1.2" />

    {/* Inverter box on wall */}
    <Rect x="38" y="62" width="26" height="18" rx="2" fill="#E3F2FD" stroke={C.step1} strokeWidth="1.2" />
    <Text style={{ fontSize: 5, color: C.step1 }} x="40" y="69">INVERTER</Text>
    {/* Inverter display */}
    <Rect x="42" y="65" width="14" height="8" rx="1" fill="#1A237E" />
    <Line x1="44" y1="68" x2="54" y2="68" stroke="#76FF03" strokeWidth="0.8" />
    <Line x1="44" y1="70" x2="50" y2="70" stroke="#76FF03" strokeWidth="0.6" />
    {/* LED dot */}
    <Circle cx="41" cy="64" r="1.5" fill="#76FF03" />

    {/* AC wire to meter/grid */}
    <Line x1="64" y1="70" x2="82" y2="70" stroke="#1565C0" strokeWidth="1.2" />
    {/* Arrow */}
    <Polygon points="82,68 86,70 82,72" fill={C.step1} />

    {/* Meter box */}
    <Rect x="86" y="63" width="22" height="17" rx="2" fill="#FFF8E1" stroke={C.solarGold} strokeWidth="1.2" />
    <Rect x="90" y="67" width="14" height="9" rx="1" fill="#FFF3E0" stroke={C.solarGold} strokeWidth="0.8" />
    <Line x1="92" y1="71" x2="102" y2="71" stroke="#FF8F00" strokeWidth="0.8" />
    <Circle cx="88" cy="65" r="1.5" fill={C.solarGold} />

    {/* Grid pole */}
    <Rect x="116" y="30" width="4" height="60" rx="1" fill="#90A4AE" />
    <Line x1="116" y1="38" x2="125" y2="38" stroke="#78909C" strokeWidth="1" />
    <Line x1="116" y1="44" x2="125" y2="44" stroke="#78909C" strokeWidth="1" />
    {/* Wire from meter to pole */}
    <Path d="M108 70 Q112 68 116 60" fill="none" stroke="#1565C0" strokeWidth="1" strokeDasharray="3,2" />

    {/* Sun */}
    <Circle cx="108" cy="12" r="9" fill={C.solarYellow} opacity="0.9" />
    {/* Sun rays */}
    <Line x1="108" y1="0" x2="108" y2="-2" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="118" y1="4" x2="120" y2="2" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="120" y1="13" x2="122" y2="13" stroke={C.solarYellow} strokeWidth="1.5" />
    <Line x1="118" y1="22" x2="120" y2="24" stroke={C.solarYellow} strokeWidth="1.5" />
    {/* Light rays hitting panels */}
    <Line x1="100" y1="16" x2="52" y2="34" stroke={C.solarYellow} strokeWidth="0.7" opacity="0.5" strokeDasharray="3,3" />
    <Line x1="102" y1="18" x2="33" y2="40" stroke={C.solarYellow} strokeWidth="0.7" opacity="0.4" strokeDasharray="3,3" />
  </Svg>
);

// ─── Reusable step config ───
const STEPS = [
  {
    num: '1',
    title: 'Step 1: 0–2 Days',
    sub: 'Dispatch of Materials',
    desc: 'Dispatch of inverter, solar modules, mounting structure, and all C-class materials from our warehouse.',
    color: C.step1,
    bg: C.step1Bg,
    Diagram: TruckDiagram,
  },
  {
    num: '2',
    title: 'Step 2: 2–3 Days',
    sub: 'Foundation & Structure Setup',
    desc: 'Foundation casting and erection of the galvanised iron mounting structure on the rooftop.',
    color: C.step2,
    bg: C.step2Bg,
    Diagram: StructureDiagram,
  },
  {
    num: '3',
    title: 'Step 3: 4–5 Days',
    sub: 'Panel & Electrical Installation',
    desc: 'Installation of solar panels, inverter, ACDB & DCDB, wiring, earthing, and lightning arrester.',
    color: C.step3,
    bg: C.step3Bg,
    Diagram: InstallationDiagram,
  },
];

/* ─── Reusable header component (pages 3-6) ─── */
const PageHeader = ({ id, date }: { id: string; date: string }) => (
  <View style={s.hdr}>
    <Image src={logoImg} style={s.hdrLogo} />
    <Text style={s.hdrRight}>Ref: {id} | {date}{'\n'}Residential | Commercial | Warehouse | Institutes</Text>
  </View>
);

/* ─── Reusable FULL-WIDTH footer ─── */
const PageFooter = ({ pageNo }: { pageNo: number }) => (
  <View style={s.ftr}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Image src={logoImg} style={s.ftrLogo} />
      <View>
        <Text style={s.ftrTextOrange}>ARKVEDA GREEN ENERGY LIMITED</Text>
        <Text style={s.ftrText}>info@arkvedaenergy.in | www.arkvedaenergy.in</Text>
      </View>
    </View>
    <View style={s.ftrRight}>
      {/* <Text style={{ ...s.ftrText, fontWeight: 'bold', fontSize: 9 }}>TOLL FREE : 1800 2020 325</Text> */}
      <Text style={s.ftrText}>Page {pageNo} of 6</Text>
    </View>
  </View>
);

// ═══════════════════════════════════════════════════════════
export const QuotationPDF = ({ data }: { data: QuotationData }) => {
  const totalSubsidy = data.pricing.potentialSubsidy + data.pricing.stateSubsidy;
  const netPrice = data.pricing.basicPrice - totalSubsidy;
  // Build a proper UPI `pa` (payee address). If the admin entered a full VPA (contains '@'), use it as-is; otherwise append '@upi'.
  const upiPa = (() => {
    const u = data.bankDetails.upiId?.toString().trim();
    if (u && u.length > 0) {
      return u.includes('@') ? u : `${u}@upi`;
    }
    // Fallback: derive a simple vpa from account holder (remove spaces) if available
    const acc = data.bankDetails.accountHolder?.toString().trim().replace(/\s+/g, '') || '';
    return acc ? `${acc}@upi` : '';
  })();

  return (
    <Document>
      {/* ────────────── PAGE 1: COVER ────────────── */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0, backgroundColor: C.coverBg, display: 'flex', flexDirection: 'column' }}>
        <View style={{ paddingTop: 30, paddingHorizontal: 35, alignItems: 'center' }}>
          <Image src={logoImg} style={{ height: 50, width: 200, marginBottom: 20 }} />
          <View style={{ backgroundColor: C.solarGold, paddingVertical: 5, paddingHorizontal: 18, marginBottom: 8 }}>
            <Text style={{ color: C.solarGreen, fontSize: 20, fontWeight: 'bold' }}>UTTAR PRADESH'S LEADING</Text>
          </View>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: C.solarGreen, marginBottom: 10 }}>Solar Solution Provider</Text>
        </View>
        <Image src={coverImg} style={{ width: '100%', flex: 1, objectFit: 'cover' }} />
        <View style={{ backgroundColor: C.solarGreen, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image src={logoImg} style={{ height: 22, width: 88, marginRight: 10 }} />
            <View>
              <Text style={{ color: C.solarYellow, fontSize: 10, fontWeight: 'bold' }}>ARKVEDA GREEN ENERGY LIMITED</Text>
              <Text style={{ color: C.white, fontSize: 7 }}>Registered Office: {data.regionalOffice}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {/* <Text style={{ color: C.white, fontSize: 11, fontWeight: 'bold' }}>TOLL FREE : 1800 2020 325</Text> */}
            <Text style={{ color: C.white, fontSize: 7 }}>info@arkvedaenergy.in | www.arkvedaenergy.in</Text>
          </View>
        </View>
      </Page>

      {/* ────────────── PAGE 2: PROPOSAL ────────────── */}
      <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 0, backgroundColor: C.lightBg, display: 'flex', flexDirection: 'column' }}>
        <View style={{ paddingTop: 20, paddingHorizontal: 30 }}>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Image src={logoImg} style={{ height: 35, width: 140 }} />
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: C.solarGreen }}>Simplifying SOLAR</Text>
            </View> */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: C.solarGreen, marginBottom: 4 }}>PROPOSAL FOR</Text>
            <View style={{ backgroundColor: C.solarGold, paddingVertical: 4, paddingHorizontal: 12, marginBottom: 10 }}>
              <Text style={{ color: C.solarGreen, fontSize: 18, fontWeight: 'bold' }}>SOLAR RESIDENTIAL SYSTEM</Text>
            </View>
            <Text style={{ fontSize: 11, color: C.solarGreen, textAlign: 'center' }}>
              Your first step towards <Text style={{ backgroundColor: C.solarYellow, color: C.solarGreen }}> Zero* Bill </Text> with
            </Text>
            <Text style={{ fontSize: 11, color: C.solarGreen }}>India's leading Solar Solution Company</Text>
          </View>
          <View style={s.tbl}>
            {[
              ['Name', data.client.name],
              ['Project Size', data.system.size],
              ['Date', data.date],
              ['Quotation ID', data.id],
              ['Regional Office', data.regionalOffice],
              ['State/UT GSTIN', data.gstin],
            ].map(([label, value], i, arr) => (
              <View style={i < arr.length - 1 ? s.tblRow : s.tblRowLast} key={i}>
                <View style={{ ...s.tblCell, width: '30%', backgroundColor: C.lightBlue }}><Text style={{ fontWeight: 'bold' }}>{label}</Text></View>
                <View style={{ ...s.tblCell, width: '70%', backgroundColor: C.lightBg, borderRightWidth: 0 }}><Text>{value}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <Image src={proposalImg} style={{ width: '100%', height: 480, objectFit: 'cover' }} />
        <View style={{ backgroundColor: C.solarGreen, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image src={logoImg} style={{ height: 22, width: 88, marginRight: 10 }} />
            <View>
              <Text style={{ color: C.solarYellow, fontSize: 10, fontWeight: 'bold' }}>ARKVEDA GREEN ENERGY LIMITED</Text>
              <Text style={{ color: C.white, fontSize: 7 }}>Registered Office: {data.regionalOffice}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {/* <Text style={{ color: C.white, fontSize: 11, fontWeight: 'bold' }}>TOLL FREE : 1800 2020 325</Text> */}
            <Text style={{ color: C.white, fontSize: 7 }}>info@arkvedaenergy.in | www.arkvedaenergy.in</Text>
          </View>
        </View>
      </Page>

      {/* ────────────── PAGE 3: COST TO CLIENT ────────────── */}
      <Page size="A4" style={s.contentPage}>
        <View style={s.bodyArea}>
          <PageHeader id={data.id} date={data.date} />
          <Text style={s.secTitle}>Cost To Client</Text>
          <View style={{ width: '100%', marginBottom: 10 }}>
            <View style={s.costHdrRow}>
              <View style={s.costHdrCell}><Text>Particulars</Text></View>
              <View style={s.costHdrCellR}><Text>Amount</Text></View>
            </View>
            {[
              ['Particulars', data.system.size],
              ['Total Price', `₹ ${data.pricing.basicPrice.toLocaleString('en-IN')}`],
              ['MNRE Subsidy', `₹ ${data.pricing.potentialSubsidy.toLocaleString('en-IN')}`],
              ['State Subsidy', `₹ ${data.pricing.stateSubsidy.toLocaleString('en-IN')}`],
              ['Less: Total Subsidy', `₹ ${totalSubsidy.toLocaleString('en-IN')}`],
            ].map(([label, val], i) => (
              <View style={i % 2 === 0 ? s.costRow : s.costRowAlt} key={i}>
                <View style={s.costCell}><Text>{label}</Text></View>
                <View style={s.costCellR}><Text>{val}</Text></View>
              </View>
            ))}
            <View style={s.costRowTotal}>
              <View style={{ ...s.costCell, ...s.costCellW }}><Text style={{ fontWeight: 'bold' }}>Effective Price After Subsidy</Text></View>
              <View style={{ ...s.costCellR, ...s.costCellW }}><Text style={{ fontWeight: 'bold' }}>₹ {netPrice.toLocaleString('en-IN')}</Text></View>
            </View>
          </View>

          <View style={{ marginBottom: 6 }}>
            <Text style={{ ...s.termLine, fontWeight: 'bold', color: C.accent }}>This Proposal is valid only for {data.system.validityDays} days</Text>
            <Text style={s.termLine}><Text style={s.termAccent}>Net Metering:</Text> Included</Text>
            <Text style={s.termLine}><Text style={s.termAccent}>GST (8.9%):</Text> Included</Text>
            <Text style={s.termLine}><Text style={s.termAccent}>Free AMC:</Text> 5 years (included in the price)</Text>
            <Text style={s.termLine}><Text style={s.termAccent}>Armoured Cable Installation & Line Man Charges:</Text> Excluded</Text>
            <Text style={{ ...s.termLine, color: C.accent }}>(Any Surplus items will be charged accordingly if any changes are made in the BOQ by the client)</Text>
          </View>

          {/* Bank Details */}
          <View style={{ borderWidth: 1, borderColor: C.solarTeal, borderRadius: 6, marginBottom: 14, backgroundColor: C.lightBlue }}>
            <View style={{ backgroundColor: C.solarTeal, padding: 6, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
              <Text style={{ color: C.white, fontWeight: 'bold', fontSize: 12 }}>COMPANY BANK DETAILS</Text>
            </View>
            <View style={{ padding: 10 }}>
              {[
                ['Account Name', data.bankDetails.accountHolder],
                ['Account Number', `${data.bankDetails.accountNo} (Current Account)`],
                ['Bank', 'HDFC Bank Ltd'],
                ['Branch', 'Dharnidhar, Ahmedabad, GJ'],
                ['IFSC', data.bankDetails.ifsc],
                ...(data.bankDetails.vendorCode ? [['Vendor Code', data.bankDetails.vendorCode]] : []),
              ].map(([label, val], i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                  <Text style={{ width: 120, fontWeight: 'bold', color: C.solarGray, fontSize: 9 }}>{label}:</Text>
                  <Text style={{ color: C.solarGray, fontSize: 9 }}>{val}</Text>
                </View>
              ))}
            </View>
            <View style={{ backgroundColor: C.solarYellow, padding: 4, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
              <Text style={{ color: C.solarGray, fontSize: 8, fontWeight: 'bold' }}>*Only payments credited directly to the company's official bank account will be accepted and validated.</Text>
            </View>
          </View>

          {/* UPI Section */}
          <View style={{ borderWidth: 1, borderColor: C.solarTeal, borderRadius: 6, marginBottom: 14, overflow: 'hidden' }}>
            <View style={{ backgroundColor: C.solarTeal, padding: 5, alignItems: 'center' }}>
              <Text style={{ color: C.white, fontWeight: 'bold', fontSize: 10 }}>ARKVEDA GREEN ENERGY LIMITED</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ width: '65%' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <Image src={gpayImg} style={{ width: 60, height: 18 }} />
                  <Image src={paytmImg} style={{ width: 60, height: 18 }} />
                  <Image src={amazonImg} style={{ width: 60, height: 18 }} />
                  <Image src={phonepayImg} style={{ width: 60, height: 18 }} />
                  <Image src={bhimImg} style={{ width: 60, height: 18 }} />
                </View>
              </View>
              <View style={{ width: '35%', alignItems: 'center' }}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: C.solarGray, marginBottom: 4 }}>PAYMENT QR</Text>
                {/* Prefer explicit UPI id if provided, fallback to accountHolder to generate QR */}
                {upiPa ? (
                  <>
                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=${upiPa}`)}`} style={{ width: 80, height: 80 }} />
                    <Text style={{ fontSize: 8, color: C.solarGray, marginTop: 6 }}>UPI: {data.bankDetails.upiId || upiPa}</Text>
                  </>
                ) : (
                  <Text style={{ fontSize: 8, color: C.solarGray, marginTop: 6 }}>No UPI ID provided</Text>
                )}
              </View>
            </View>
          </View>

          <Text style={s.secTitle}>Payment Terms</Text>
          <Text style={{ ...s.body, fontWeight: 'bold', fontSize: 8 }}>Payment can be made via cheque drawn in favor of ARKVEDA GREEN ENERGY PVT. LTD., or through RTGS/NEFT/IMPS.</Text>
          <View style={{ marginBottom: 6 }}>
            <Text style={s.termLine}><Text style={s.termAccent}>1. {data.paymentTerms.advancePct}% Advance:</Text> Upon confirmation of order.</Text>
            <Text style={s.termLine}><Text style={s.termAccent}>2. {data.paymentTerms.deliveryPct}%:</Text> Before delivery of modules, inverters, and other materials.</Text>
            <Text style={s.termLine}><Text style={s.termAccent}>3. {data.paymentTerms.meteringPct}%:</Text> Rest Amount at the time of Net Metering</Text>
            <Text style={{ ...s.termLine, fontWeight: 'bold' }}>(Any surplus materials will be taken back by us upon completion of the plant.)</Text>
          </View>
        </View>
        <PageFooter pageNo={3} />
      </Page>

      {/* ────────────── PAGE 4: TECHNICAL SPECS ────────────── */}
      <Page size="A4" style={s.contentPage}>
        <View style={s.bodyArea}>
          <PageHeader id={data.id} date={data.date} />
          <Text style={s.secTitle}>Technical Specifications</Text>
          <View style={s.tbl}>
            <View style={s.tblHdrRow}>
              <View style={{ ...s.tblHdrCell, width: '22%' }}><Text>Description</Text></View>
              <View style={{ ...s.tblHdrCell, width: '33%' }}><Text>Specification</Text></View>
              <View style={{ ...s.tblHdrCell, width: '12%' }}><Text>Qty</Text></View>
              <View style={{ ...s.tblHdrCell, width: '18%' }}><Text>Brand</Text></View>
              <View style={{ ...s.tblHdrCell, width: '15%', borderRightWidth: 0 }}><Text>Warranty</Text></View>
            </View>
            {data.materials.map((mat, i) => (
              <View style={i < data.materials.length - 1 ? s.tblRow : s.tblRowLast} key={i}>
                <View style={{ ...s.tblCell, width: '22%' }}><Text>{mat.description}</Text></View>
                <View style={{ ...s.tblCell, width: '33%' }}><Text>{mat.specification}</Text></View>
                <View style={{ ...s.tblCell, width: '12%' }}><Text>{mat.qty}</Text></View>
                <View style={{ ...s.tblCell, width: '18%' }}><Text>{mat.brand}</Text></View>
                <View style={{ ...s.tblCell, width: '15%', borderRightWidth: 0 }}><Text>{mat.warranty}</Text></View>
              </View>
            ))}
          </View>

          {data.cables.length > 0 && (
            <>
              <Text style={{ ...s.secTitle, marginTop: 8 }}>Standard Cable Lengths</Text>
              <View style={s.tbl}>
                <View style={s.tblHdrRow}>
                  <View style={{ ...s.tblHdrCell, width: '70%' }}><Text>Cable</Text></View>
                  <View style={{ ...s.tblHdrCell, width: '30%', borderRightWidth: 0 }}><Text>Length</Text></View>
                </View>
                {data.cables.map((cable, i) => (
                  <View style={i < data.cables.length - 1 ? s.tblRow : s.tblRowLast} key={i}>
                    <View style={{ ...s.tblCell, width: '70%' }}><Text>{cable.type}</Text></View>
                    <View style={{ ...s.tblCell, width: '30%', borderRightWidth: 0 }}><Text>{cable.length}</Text></View>
                  </View>
                ))}
              </View>
              <View style={{ marginTop: 4 }}>
                <Text style={{ fontSize: 7, color: C.grayText }}>*Any Cable if required over and above the mentioned length, will be charged extra.</Text>
              </View>
            </>
          )}
        </View>
        <PageFooter pageNo={4} />
      </Page>

      {/* ────────────── PAGE 5: INSTALLATION ────────────── */}
      <Page size="A4" style={s.contentPage}>
        <View style={s.bodyArea}>
          <PageHeader id={data.id} date={data.date} />
          <Text style={s.secTitle}>Installation Steps</Text>

          {/* ── Step Cards with SVG Diagrams ── */}
          {STEPS.map((step) => (
            <View key={step.num} style={s.stepCard}>
              {/* Left color stripe */}
              <View style={{ ...s.stepStripe, backgroundColor: step.color }} />

              {/* Text content */}
              <View style={s.stepTextArea}>
                <View style={s.stepHeaderRow}>
                  <View style={{ ...s.stepBadge, backgroundColor: step.color }}>
                    <Text style={s.stepBadgeText}>{step.num}</Text>
                  </View>
                  <View>
                    <Text style={{ ...s.stepTitle, color: step.color }}>{step.title}</Text>
                    <Text style={s.stepSub}>{step.sub}</Text>
                  </View>
                </View>
                <Text style={s.stepDesc}>{step.desc}</Text>
              </View>

              {/* SVG Diagram */}
              <View style={{ ...s.stepDiagram, backgroundColor: step.bg }}>
                <step.Diagram />
              </View>
            </View>
          ))}

          {/* ── Flow connector labels ── */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}>
            {['Dispatch', '→', 'Foundation', '→', 'Installation', '→', 'Operational'].map((label, i) => (
              <Text key={i} style={{
                fontSize: i % 2 === 1 ? 10 : 7,
                color: i % 2 === 1 ? C.borderGray : C.solarGreen,
                fontWeight: i % 2 === 0 ? 'bold' : 'normal',
              }}>{label}</Text>
            ))}
          </View>

          <Text style={s.secTitle}>Net Metering</Text>
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            <View style={{ flex: 1, marginRight: 6, backgroundColor: C.lightBlue, borderRadius: 4, padding: 8, borderLeftWidth: 3, borderLeftColor: C.step1 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: C.step1, marginBottom: 2 }}>Net Meter — 01 to 05 Days</Text>
              <Text style={{ fontSize: 8, color: C.grayText }}>After plant installation, we initiate Electricity Department Approvals and share a Tracking Link with our Clients.</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: C.step2Bg, borderRadius: 4, padding: 8, borderLeftWidth: 3, borderLeftColor: C.step2 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: C.step2, marginBottom: 2 }}>Smart Meter — 10 to 15 Days</Text>
              <Text style={{ fontSize: 8, color: C.grayText }}>Smart Meter Configuration Request is sent to L&T after plant installation.</Text>
            </View>
          </View>

          <Text style={s.secTitle}>Subsidy Disbursal</Text>
          <View style={{ backgroundColor: C.step3Bg, borderRadius: 4, padding: 8, borderLeftWidth: 3, borderLeftColor: C.step3, marginBottom: 10 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: C.step3, marginBottom: 2 }}>30–60 Days</Text>
            <Text style={{ fontSize: 8, color: C.grayText }}>After submitting your bank details and completing the verification process through the National Rooftop Solar Portal, the CFA (Central Financial Assistance) will be disbursed within 60 days.</Text>
          </View>

          <Text style={s.secTitle}>Documents Required</Text>
          <View style={s.iconRow}>
            {/* Electricity Bill */}
            <View style={s.iconBox}>
              <View style={s.iconCircle}>
                <Svg viewBox="0 0 32 32" width="28" height="28">
                  <Path d="M8 28 L8 18 L12 18 L12 28" fill={C.solarTeal} opacity="0.5" />
                  <Path d="M14 28 L14 14 L18 14 L18 28" fill={C.solarTeal} opacity="0.7" />
                  <Path d="M20 28 L20 10 L24 10 L24 28" fill={C.solarTeal} />
                  <Path d="M13 4 L9 16 L13 16 L11 24 L21 12 L16 12 L19 4 Z" fill={C.solarGold} />
                </Svg>
              </View>
              <Text style={s.iconLabel}>Electricity Bill</Text>
            </View>
            {/* Aadhar */}
            <View style={s.iconBox}>
              <View style={s.iconCircle}>
                <Svg viewBox="0 0 32 32" width="28" height="28">
                  <Rect x="4" y="6" width="24" height="20" rx="2" fill="none" stroke={C.solarTeal} strokeWidth="1.5" />
                  <Circle cx="12" cy="15" r="4" fill="none" stroke={C.accent} strokeWidth="1.2" />
                  <Circle cx="12" cy="15" r="2" fill={C.accent} />
                  <Line x1="18" y1="12" x2="26" y2="12" stroke={C.solarTeal} strokeWidth="1.2" />
                  <Line x1="18" y1="15" x2="26" y2="15" stroke={C.solarTeal} strokeWidth="1.2" />
                  <Line x1="18" y1="18" x2="24" y2="18" stroke={C.solarTeal} strokeWidth="1.2" />
                </Svg>
              </View>
              <Text style={s.iconLabel}>Aadhar Card</Text>
            </View>
            {/* Property Docs */}
            <View style={s.iconBox}>
              <View style={s.iconCircle}>
                <Svg viewBox="0 0 32 32" width="28" height="28">
                  <Path d="M4 10 L4 26 L28 26 L28 12 L16 12 L14 10 Z" fill={C.solarTeal} opacity="0.3" stroke={C.solarTeal} strokeWidth="1.2" />
                  <Rect x="10" y="8" width="12" height="14" rx="1" fill="none" stroke={C.solarTeal} strokeWidth="1.2" />
                  <Line x1="13" y1="12" x2="19" y2="12" stroke={C.solarTeal} strokeWidth="1" />
                  <Line x1="13" y1="15" x2="19" y2="15" stroke={C.solarTeal} strokeWidth="1" />
                  <Line x1="13" y1="18" x2="17" y2="18" stroke={C.solarTeal} strokeWidth="1" />
                </Svg>
              </View>
              <Text style={s.iconLabel}>Property Docs</Text>
            </View>
            {/* Cancelled Cheque */}
            <View style={s.iconBox}>
              <View style={s.iconCircle}>
                <Svg viewBox="0 0 32 32" width="28" height="28">
                  <Rect x="3" y="8" width="26" height="16" rx="2" fill="none" stroke={C.solarTeal} strokeWidth="1.5" />
                  <Line x1="7" y1="13" x2="18" y2="13" stroke={C.solarTeal} strokeWidth="1" />
                  <Line x1="7" y1="16" x2="15" y2="16" stroke={C.solarTeal} strokeWidth="1" />
                  <Line x1="7" y1="20" x2="20" y2="20" stroke={C.solarTeal} strokeWidth="1.2" />
                  <Path d="M22 7 L26 11 L24 13 L20 9 Z" fill={C.solarGold} />
                  <Path d="M19.5 9.5 L21 11" stroke={C.solarTeal} strokeWidth="0.8" />
                </Svg>
              </View>
              <Text style={s.iconLabel}>Cancelled Cheque</Text>
            </View>
            {/* Geo Tagged Photos */}
            <View style={s.iconBox}>
              <View style={s.iconCircle}>
                <Svg viewBox="0 0 32 32" width="28" height="28">
                  <Rect x="9" y="4" width="14" height="24" rx="2" fill="none" stroke={C.solarTeal} strokeWidth="1.5" />
                  <Line x1="9" y1="8" x2="23" y2="8" stroke={C.solarTeal} strokeWidth="1" />
                  <Line x1="9" y1="24" x2="23" y2="24" stroke={C.solarTeal} strokeWidth="1" />
                  <Circle cx="16" cy="26" r="1" fill={C.solarTeal} />
                  <Path d="M16 12 C13 12 11 14 11 16.5 C11 20 16 23 16 23 C16 23 21 20 21 16.5 C21 14 19 12 16 12 Z" fill={C.solarGold} stroke={C.solarTeal} strokeWidth="0.8" />
                  <Circle cx="16" cy="16" r="1.5" fill={C.white} />
                </Svg>
              </View>
              <Text style={s.iconLabel}>Geo Tagged Photos</Text>
            </View>
          </View>
        </View>
        <PageFooter pageNo={5} />
      </Page>

      {/* ────────────── PAGE 6: TERMS & CONDITIONS ────────────── */}
      <Page size="A4" style={s.contentPage}>
        <View style={s.bodyArea}>
          <PageHeader id={data.id} date={data.date} />
          <Text style={s.secTitle}>Terms and Conditions</Text>
          {[
            '1. Pricing & Validity: The prices quoted in this proposal are valid for the period specified. Any delay in order confirmation may result in price revision due to raw material cost fluctuations.',
            '2. Statutory Approvals: While Arkveda Solar assists in Net Metering and Subsidy applications, the final timeline and approval depend entirely on DISCOM and government authorities.',
            '3. Civil & Structural Limitations: The mounting structure is designed for standard roofs. Any requirement for customized elevated structures or civil reinforcements to support the solar plant will be billed extra.',
            '4. Electricity Generation: The stated generation capacity is an estimate based on average solar irradiance. Actual generation may slightly vary due to weather, dust, and grid availability.',
            '5. Warranty Claims: Product warranties (Panels, Inverters, etc.) are covered directly by the respective OEMs. Arkveda covers the workmanship warranty for the installation period specified.',
            '6. Force Majeure: Delays caused by natural disasters, strikes, or regulatory changes are beyond our control and extend the delivery/installation timeline accordingly.',
            '7. Disputes: Any disputes arising out of this quotation or subsequent contract shall be subject to the exclusive jurisdiction of the courts where the Arkveda Regional Office is located.',
            '8. Cancellation Policy: Orders once confirmed cannot be cancelled. In exceptional cases, a cancellation fee of 20% of total order value may apply.',
            '9. Site Inspection: Arkveda reserves the right to conduct a site inspection before confirming the order. Any structural changes recommended must be completed by the client at their own expense.',
            '10. Insurance: The solar plant is not insured by Arkveda. Clients are advised to obtain comprehensive insurance coverage for the installed solar system.',
          ].map((term, i) => (
            <Text key={i} style={{ ...s.body, marginBottom: 7, fontSize: 8 }}>{term}</Text>
          ))}
          <View style={{ marginTop: 16, borderTopWidth: 2, borderTopColor: C.solarGreen, paddingTop: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: C.solarGreen, marginBottom: 3 }}>Thank you for choosing Arkveda Solar!</Text>
            <Text style={{ fontSize: 9, color: C.grayText }}>www.arkvedaenergy.in</Text>
          </View>
        </View>
        <PageFooter pageNo={6} />
      </Page>
    </Document>
  );
};
