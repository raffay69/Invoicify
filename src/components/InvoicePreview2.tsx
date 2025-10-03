import React, { forwardRef } from "react";
import { InvoiceData } from "../types/invoice";

interface InvoicePreviewProps {
  data: InvoiceData;
  isDark: boolean;
  crr: any;
}

export const InvoicePreview2: React.FC<InvoicePreviewProps> = forwardRef(
  ({ data, isDark, crr }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    };

    const formatCurrency = (amount: number, currency: any) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
      }).format(amount);
    };

    const bgClass = isDark ? "bg-black" : "bg-white";
    const textClass = isDark ? "text-white" : "text-gray-900";
    const mutedTextClass = isDark ? "text-gray-400" : "text-gray-600";
    const borderClass = isDark ? "border-gray-700" : "border-gray-200";

    return (
      <div
        //@ts-ignore
        ref={ref}
        className={`${bgClass} ${textClass} p-6 shadow-2xl h-full overflow-y-auto no-scrollbar invoice-preview  text-[11px]`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            Invoice {data.invoiceNumber || "INV-0001"}
          </h1>
          {data.company.logo && (
            <img
              src={data.company.logo}
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
          )}
        </div>

        {/* Invoice Meta */}
        <div className={`grid grid-cols-3 border-y ${borderClass} py-3 mb-4`}>
          <div className="space-y-1 ">
            <div>
              <span className={`${mutedTextClass}`}>Serial Number</span>
              <div>{data.invoiceNumber || "0001"}</div>
            </div>
            <div>
              <span className={mutedTextClass}>Date</span>
              <div>{formatDate(data.invoiceDate)}</div>
            </div>
            {data.dueDate && (
              <div>
                <span className={mutedTextClass}>Due Date</span>
                <div>{formatDate(data.dueDate)}</div>
              </div>
            )}
          </div>
          <div>
            <span className={mutedTextClass}>Payment Terms</span>
            <div>{data.paymentInfo.terms || "-"}</div>
          </div>
        </div>

        {/* Billed By / To */}
        <div className={`grid grid-cols-2 gap-6 mb-4`}>
          <div>
            <h3 className="font-semibold mb-1">Billed By</h3>
            <div className="font-bold">
              {data.company.name || "Your Company"}
            </div>
            {data.company.address && <div>{data.company.address}</div>}
            <div className="flex flex-col mt-1">
              {data.company.phone && <span>{data.company.phone}</span>}
              {data.company.email && <span>{data.company.email}</span>}
              {data.company.website && <span>{data.company.website}</span>}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Billed To</h3>
            <div className="font-bold">
              {data.customer.name || "Customer Name"}
            </div>
            {data.customer.company && <div>{data.customer.company}</div>}
            {data.customer.address && <div>{data.customer.address}</div>}
            <div className="flex flex-col mt-1">
              {data.customer.email && <span>{data.customer.email}</span>}
              {data.customer.phone && <span>{data.customer.phone}</span>}
            </div>
          </div>
        </div>

        {/* Items */}
        <table className="w-full border-collapse mb-6 text-[11px]">
          <thead>
            <tr className={`${borderClass} border-b`}>
              <th className="py-2 text-left">Item</th>
              <th className="py-2 text-center w-16">Qty</th>
              <th className="py-2 text-right w-24">Price</th>
              <th className="py-2 text-right w-24">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr key={item.id} className={`${borderClass} border-b`}>
                <td className="py-2">
                  {item.description || `Item ${idx + 1}`}
                </td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-right">
                  {formatCurrency(item.unitPrice, crr)}
                </td>
                <td className="py-2 text-right">
                  {formatCurrency(item.total, crr)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Section */}
        <div className="grid grid-cols-2 gap-6 border-t pt-4">
          <div className="space-y-3">
            {data.paymentInfo.bankDetails && (
              <div>
                <h3 className="font-semibold">Payment Information</h3>
                <div>{data.paymentInfo.bankDetails}</div>
              </div>
            )}
            {data.paymentInfo.terms && (
              <div>
                <h3 className="font-semibold">Terms</h3>
                <div>{data.paymentInfo.terms}</div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(data.subtotal, crr)}</span>
            </div>
            {data.discountRate > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({data.discountRate}%)</span>
                <span>-{formatCurrency(data.discountAmount, crr)}</span>
              </div>
            )}
            {data.taxRate > 0 && (
              <div className="flex justify-between">
                <span>Tax ({data.taxRate}%)</span>
                <span>{formatCurrency(data.taxAmount, crr)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total</span>
              <span>{formatCurrency(data.grandTotal, crr)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 text-[10px] italic">
          Thank you for your business
        </div>
      </div>
    );
  }
);
