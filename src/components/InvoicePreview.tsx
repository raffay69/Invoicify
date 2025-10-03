import React, { forwardRef } from "react";
import { InvoiceData } from "../types/invoice";

interface InvoicePreviewProps {
  data: InvoiceData;
  isDark: boolean;
  crr: any;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = forwardRef(
  ({ data, isDark, crr }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const formatCurrency = (amount: number, currency: any) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);
    };

    const bgClass = isDark ? "bg-black" : "bg-white";
    const textClass = isDark ? "text-white" : "text-gray-900";
    const mutedTextClass = isDark ? "text-gray-300" : "text-gray-600";
    const borderClass = isDark ? "border-gray-700" : "border-gray-200";
    const tableBgClass = isDark ? "bg-gray-900" : "bg-gray-50";

    return (
      <div
        //@ts-ignore
        ref={ref}
        className={`${bgClass} ${textClass} p-6  shadow-2xl h-full overflow-y-auto no-scrollbar invoice-preview  text-xs`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-4">
            {data.company.logo && (
              <img
                src={data.company.logo}
                alt="Company Logo"
                className="h-12 w-12 object-contain rounded-md"
              />
            )}
            <div>
              <h1 className="text-sm font-bold">
                {data.company.name || "Your Company"}
              </h1>
              <div className={`text-[11px] ${mutedTextClass} mt-1 space-y-1`}>
                {data.company.address && <div>{data.company.address}</div>}
                <div className="flex flex-wrap gap-2">
                  {data.company.phone && <span>{data.company.phone}</span>}
                  {data.company.email && <span>{data.company.email}</span>}
                </div>
                {data.company.website && <div>{data.company.website}</div>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-sm font-bold">INVOICE</h2>
            <div className={`text-[11px] ${mutedTextClass} mt-1 space-y-1`}>
              <div className="font-medium">
                Invoice #: {data.invoiceNumber || "INV-001"}
              </div>
              <div>Date: {formatDate(data.invoiceDate)}</div>
              <div>
                {data.dueDate && `Due Date: ${formatDate(data.dueDate)}`}
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-2">
          <h3 className="text-xs font-bold mb-1">Bill To:</h3>
          <div className={`${mutedTextClass} space-y-1`}>
            <div className="font-semibold">
              {data.customer.name || "Customer Name"}
            </div>
            {data.customer.company && <div>{data.customer.company}</div>}
            {data.customer.address && (
              <div className="whitespace-pre-line leading-relaxed">
                {data.customer.address}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {data.customer.email && <span>Email: {data.customer.email}</span>}
              {data.customer.phone && <span>Phone: {data.customer.phone}</span>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-3">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className={`${tableBgClass} ${borderClass} border`}>
                <th className="px-3 py-2 text-left font-bold">Description</th>
                <th className="px-3 py-2 text-center font-bold w-16">Qty</th>
                <th className="px-3 py-2 text-right font-bold w-24">
                  Unit Price
                </th>
                <th className="px-3 py-2 text-right font-bold w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id} className={`${borderClass} border-b`}>
                  <td className="px-3 py-2">
                    {item.description || `Item ${index + 1}`}
                  </td>
                  <td className="px-3 py-2 text-center">{item.quantity}</td>
                  <td className="px-3 py-2 text-right">
                    {formatCurrency(item.unitPrice, crr)}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold">
                    {formatCurrency(item.total, crr)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-start border-t pt-4 gap-8 ">
          {/* Payment Information */}
          {(data.paymentInfo.bankDetails || data.paymentInfo.terms) && (
            <div className="w-1/2 text-[11px] space-y-2">
              <h3 className="text-xs font-bold mb-1">Payment Information</h3>
              {data.paymentInfo.bankDetails && (
                <div>
                  <div className="font-semibold mb-1">Payment Details:</div>
                  <div className="whitespace-pre-line leading-relaxed">
                    {data.paymentInfo.bankDetails}
                  </div>
                </div>
              )}
              {data.paymentInfo.terms && (
                <div>
                  <div className="font-semibold mb-1">Payment Terms:</div>
                  <div>{data.paymentInfo.terms}</div>
                </div>
              )}
            </div>
          )}

          {/* Totals */}
          <div className="w-1/3 text-xs space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">
                {formatCurrency(data.subtotal, crr)}
              </span>
            </div>
            {data.discountRate > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({data.discountRate}%):</span>
                <span>-{formatCurrency(data.discountAmount, crr)}</span>
              </div>
            )}
            {data.taxRate > 0 && (
              <div className="flex justify-between">
                <span>Tax ({data.taxRate}%):</span>
                <span>{formatCurrency(data.taxAmount, crr)}</span>
              </div>
            )}
            <div
              className={`flex justify-between font-bold border-t ${borderClass} pt-2`}
            >
              <span>Total Due:</span>
              <span>{formatCurrency(data.grandTotal, crr)}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          Thank you for your businesss
        </div>
      </div>
    );
  }
);
