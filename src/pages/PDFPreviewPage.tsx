import { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { QuotationPDF } from '../components/pdf/QuotationPDF';
import type { QuotationData } from '../components/pdf/QuotationPDF';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const sampleData: QuotationData = {
  id: 'UP_MN_127',
  date: new Date().toLocaleDateString('en-IN'),
  regionalOffice: 'GORAKHPUR, UP',
  gstin: '09ABHCS9467Q1Z3',
  client: {
    name: 'Vipin Kumar (Sample)',
    phone: '+91 98765 43210',
    address: 'Gomtinagar, Lucknow, UP',
  },
  system: {
    size: '3.66 kW',
    ratePerKw: 85383.28,
    validityDays: 7,
  },
  pricing: {
    basicPrice: 312503,
    potentialSubsidy: 78000,
    stateSubsidy: 30000,
  },
  paymentTerms: {
    advancePct: 10,
    deliveryPct: 80,
    meteringPct: 10,
  },
  bankDetails: {
    accountHolder: 'ARKVEDA GREEN ENERGY PVT. LTD.',
    accountNo: '43403466497',
    ifsc: 'SBIN0063746',
    vendorCode: 'LKO2207113006',
    upiId: 'arkveda@upi',
  },
  materials: [
    { description: 'Smart Solar PV Modules', specification: 'N Type - 580 WP', qty: '18', brand: 'Waaree', warranty: '30 Years' },
    { description: 'Solar Inverter', specification: '3 Phase - 10KW', qty: '1', brand: 'KSolare', warranty: '10 Years' },
    { description: 'ACDB/DCDB', specification: 'As per MNRE Guidelines', qty: '1', brand: 'Eaton / HPL', warranty: '5 Years' },
    { description: 'Solar Structure', specification: 'Hot Dip GI with premium hardware', qty: 'Height of 2 mtr.', brand: 'Arkveda Trusted', warranty: '' },
    { description: 'MC4 Connector', specification: 'As per MNRE Guidelines', qty: '2 Set', brand: 'Dhash PV', warranty: '' },
    { description: 'Earthing Rod/Bag/Lightning Arrestor', specification: 'Copper Coated 14 mm (01 mtr)', qty: '1 Set', brand: 'iTorrent', warranty: '' },
    { description: 'PVC Pipe and Fittings', specification: '25 mm', qty: '69 mtr', brand: 'Arkveda Trusted', warranty: '' },
    { description: 'Red & Black DC Cables', specification: 'Single String', qty: '80 mtr', brand: 'Polycab/Johnson', warranty: '' },
    { description: 'AC Cable', specification: 'CU 4 Core 4 SQ MM', qty: '30 mtr.', brand: 'Polycab/Johnson', warranty: '' },
    { description: 'Earthing Cable', specification: 'CU 1 Core 6 SQ MM', qty: '70 mtr.', brand: 'Polycab/Johnson', warranty: '' },
    { description: 'LA Earthing Cable', specification: 'Al 1 Core 16 SQ MM', qty: '45 mtr.', brand: 'Genome/Johnson', warranty: '' },
    { description: 'Ladder + Walkway', specification: 'As per MNRE Guidelines', qty: 'Not Included', brand: 'Arkveda Trusted', warranty: '' },
  ],
  cables: [
    { type: 'Both Red & Black DC (Single String)', length: '40 Mtr.' },
    { type: 'AC (2 core 4 SQ MM) for Single Phase', length: '20 Mtr.' },
    { type: 'Earthing', length: '50 Mtr.' },
    { type: 'LA', length: '30 Mtr.' },
  ],
};

export default function PDFPreviewPage() {
  const [data, setData] = useState<QuotationData>(sampleData);

  const updateClientName = (name: string) => setData((d) => ({ ...d, client: { ...d.client, name } }));
  const updateBasicPrice = (val: number) => setData((d) => ({ ...d, pricing: { ...d.pricing, basicPrice: Number.isFinite(val) ? val : 0 } }));
  const updatePotentialSubsidy = (val: number) => setData((d) => ({ ...d, pricing: { ...d.pricing, potentialSubsidy: Number.isFinite(val) ? val : 0 } }));
  const updateStateSubsidy = (val: number) => setData((d) => ({ ...d, pricing: { ...d.pricing, stateSubsidy: Number.isFinite(val) ? val : 0 } }));
  const updateBankField = (field: keyof typeof data.bankDetails, value: string) => setData((d) => ({ ...d, bankDetails: { ...d.bankDetails, [field]: value } }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top Bar */}
      <div style={{
        backgroundColor: '#1E3A8A',
        padding: '14px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/quote" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '14px' }}>
            <ArrowLeft size={18} />
            Back
          </Link>
          <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700 }}>
            PDF Preview — {data.client.name}
          </span>
        </div>

        <PDFDownloadLink
          document={<QuotationPDF data={data} />}
          fileName={`Arkveda_Quotation_${data.id}.pdf`}
          style={{
            backgroundColor: '#EA580C',
            color: '#ffffff',
            padding: '8px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {({ loading }) => (
            <>
              <Download size={16} />
              {loading ? 'Generating...' : 'Download PDF'}
            </>
          )}
        </PDFDownloadLink>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, padding: '20px 30px', height: 'calc(100vh - 60px)' }}>
        {/* Editor panel (admin editable) */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'auto' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Edit Quotation</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            <label style={{ fontSize: 12, color: '#374151' }}>Client Name</label>
            <input value={data.client.name} onChange={(e) => updateClientName(e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>System Size (text)</label>
            <input value={data.system.size} onChange={(e) => setData((d) => ({ ...d, system: { ...d.system, size: e.target.value } }))} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>Basic Price (₹)</label>
            <input type="number" value={data.pricing.basicPrice} onChange={(e) => updateBasicPrice(Number(e.target.value))} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>MNRE Subsidy (₹)</label>
            <input type="number" value={data.pricing.potentialSubsidy} onChange={(e) => updatePotentialSubsidy(Number(e.target.value))} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>State Subsidy (₹)</label>
            <input type="number" value={data.pricing.stateSubsidy} onChange={(e) => updateStateSubsidy(Number(e.target.value))} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>Validity Days</label>
            <input type="number" value={data.system.validityDays} onChange={(e) => setData((d) => ({ ...d, system: { ...d.system, validityDays: Number(e.target.value) } }))} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '8px 0' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>Account Holder</label>
            <input value={data.bankDetails.accountHolder} onChange={(e) => updateBankField('accountHolder', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>Account Number</label>
            <input value={data.bankDetails.accountNo} onChange={(e) => updateBankField('accountNo', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>IFSC</label>
            <input value={data.bankDetails.ifsc} onChange={(e) => updateBankField('ifsc', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>Vendor Code (optional)</label>
            <input value={data.bankDetails.vendorCode || ''} onChange={(e) => updateBankField('vendorCode', e.target.value)} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <label style={{ fontSize: 12, color: '#374151' }}>UPI ID (for QR)</label>
            <input value={data.bankDetails.upiId || ''} onChange={(e) => updateBankField('upiId', e.target.value)} placeholder="example@upi" style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />

            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(data)); }} style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: '#111827', color: '#fff', border: 'none' }}>Copy JSON</button>
              <button onClick={() => setData(sampleData)} style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: '#F97316', color: '#fff', border: 'none' }}>Reset</button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div>
          <PDFViewer
            width="100%"
            height="100%"
            style={{ borderRadius: '12px', border: '1px solid #cbd5e1' }}
          >
            <QuotationPDF data={data} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}
