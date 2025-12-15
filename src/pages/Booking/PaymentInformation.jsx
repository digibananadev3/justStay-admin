const Money = ({ value, positive, negative }) => (
  <span className={`${positive ? 'text-emerald-600' : negative ? 'text-rose-600' : 'text-[#0A0A0A]'} font-medium`}>
    ₹{value.toLocaleString()}
  </span>
);

const Row = ({ label, children, bold }) => (
  <div className={`flex items-center justify-between ${bold ? 'font-semibold text-[#101828]' : 'text-[#4A5565]'} text-[14px] leading-5`}>
    <span>{label}</span>
    <span>{children}</span>
  </div>
);

const StatusPill = ({ status = 'paid' }) => {
  const map = {
    paid: 'bg-emerald-100 text-emerald-700',
    refunded: 'bg-indigo-100 text-indigo-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-rose-100 text-rose-700',
  };
  const cls = map[status] || map.pending;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>{status}</span>
  );
};

const Card = ({ title, children }) => (
  <div className="px-6">
    <h3 className="text-[16px] font-semibold text-[#101828] mb-3">{title}</h3>
    <div className="rounded-2xl border border-gray-200 p-4">
      {children}
    </div>
  </div>
);

const PaymentInformation = ({
  pricing = {
    base: 2500,
    discount: 250, // positive number; will render as -₹250 in green
    taxes: 202,
    platform: 75,
  },
  payment = {
    status: 'paid',
    method: 'Debit Card',
    transactionId: 'TXN001234569',
  },
}) => {
  const total = pricing.base - pricing.discount + pricing.taxes + pricing.platform;

  return (
    <>
      <Card title="Pricing Breakdown">
        <div className="space-y-1">
          <Row label="Base Price">
            <Money value={pricing.base} />
          </Row>
          <Row label="Discount">
            <Money value={-pricing.discount} positive />
          </Row>
          <Row label="Taxes & Fees">
            <Money value={pricing.taxes} />
          </Row>
          <Row label="Platform Fee">
            <Money value={pricing.platform} />
          </Row>
          <hr className="border-gray-200" />
          <Row label="Total Amount" bold>
            <Money value={total} />
          </Row>
        </div>
      </Card>

      <div className="h-4" />

      <Card title="Payment Information">
        <div className="flex justify-between items-center space-y-2">
          <p className="text-[14px] text-[#6A7282]">Payment Status</p>
          <p><StatusPill status={payment.status} /></p>
        </div>
        <div className="flex justify-between items-center space-y-2">
          <p className="text-[14px] text-[#6A7282]">Payment Method</p>
          <p className="text-[16px] font-medium text-[#0A0A0A]">{payment.method}</p>
        </div>
        <div className="flex justify-between items-center space-y-2">
          <p className="text-[14px] text-[#6A7282]">Transaction ID</p>
          <p className="text-[16px] font-medium text-[#0A0A0A]">{payment.transactionId}</p>
        </div>
      </Card>
    </>
  );
};

export default PaymentInformation;