import React, { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { InvoiceData, InvoiceItem } from "../types/invoice";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
  isDark: boolean;
  setCurr: any;
  crr: any;
  temp: any;
  setTemp: any;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  data,
  onChange,
  isDark,
  crr,
  setCurr,
  temp,
  setTemp,
}) => {
  const handleCompanyChange = (
    field: keyof InvoiceData["company"],
    value: string
  ) => {
    onChange({
      ...data,
      company: {
        ...data.company,
        [field]: value,
      },
    });
  };

  const handleCustomerChange = (
    field: keyof InvoiceData["customer"],
    value: string
  ) => {
    onChange({
      ...data,
      customer: {
        ...data.customer,
        [field]: value,
      },
    });
  };

  const handleInvoiceChange = (
    field: keyof InvoiceData,
    value: string | number
  ) => {
    const updatedData = {
      ...data,
      [field]: value,
    };

    // Recalculate totals when tax or discount rates change
    if (field === "taxRate" || field === "discountRate") {
      calculateTotals(updatedData);
    } else {
      onChange(updatedData);
    }
  };

  const handlePaymentInfoChange = (
    field: keyof InvoiceData["paymentInfo"],
    value: string
  ) => {
    onChange({
      ...data,
      paymentInfo: {
        ...data.paymentInfo,
        [field]: value,
      },
    });
  };

  // Currency symbol mapper
  const getCurrencySymbol = (currency: any) => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "INR":
        return "₹";
      default:
        return "$";
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };

    onChange({
      ...data,
      items: [...data.items, newItem],
    });
  };

  const removeItem = (id: string) => {
    const updatedData = {
      ...data,
      items: data.items.filter((item) => item.id !== id),
    };
    calculateTotals(updatedData);
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = data.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "unitPrice") {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });

    const updatedData = {
      ...data,
      items: updatedItems,
    };

    calculateTotals(updatedData);
  };

  const calculateTotals = (updatedData: InvoiceData) => {
    const subtotal = updatedData.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const discountAmount = (subtotal * updatedData.discountRate) / 100;
    const discountedSubtotal = subtotal - discountAmount;
    const taxAmount = (discountedSubtotal * updatedData.taxRate) / 100;
    const grandTotal = discountedSubtotal + taxAmount;

    onChange({
      ...updatedData,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleCompanyChange("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-stone-700 focus:border-stone-700 transition-all duration-200 text-sm font-medium ${
    isDark
      ? "bg-stone-900 border-gray-700 text-white placeholder-gray-400 focus:bg-stone-800"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:bg-gray-50"
  }`;

  const labelClass = `block text-sm font-semibold mb-2 ${
    isDark ? "text-gray-200" : "text-gray-700"
  }`;
  const sectionClass = `mb-6 pl-6 pr-6 pb-6 pt-1 rounded-xl  ${
    isDark ? "bg-black  backdrop-blur-sm" : "bg-white  shadow-sm"
  }`;

  return (
    <div className="h-full overflow-y-scroll no-scrollbar pr-2">
      <div className="flex justify-between pr-2 pl-6 ">
        <p className="font-bold text-lg">Select Template</p>
        <div className="relative">
          <select
            className={`appearance-none ${
              isDark
                ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
            } py-2 px-4 pr-10  border-2 rounded-xl  focus:outline-none focus:ring-0`}
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
          >
            <option className="bg-inherit rounded-lg " value={"temp1"}>
              Template 1
            </option>
            <option className="bg-inherit rounded-lg" value={"temp2"}>
              Template 2
            </option>
          </select>

          {/* Custom arrow */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className={`w-4 h-4 text-white`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>
      {/* Company Information */}
      <div className={sectionClass}>
        <h3
          className={`text-lg font-bold mb-5 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Company Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>
              Company Logo <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className={`cursor-pointer px-4 py-2 border rounded-lg flex items-center space-x-2 hover:bg-opacity-90 transition-all duration-200 text-sm font-medium ${
                  isDark
                    ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                    : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
                }`}
              >
                <Upload size={16} />
                <span>Upload Logo</span>
              </label>
              {data.company.logo && (
                <img
                  src={data.company.logo}
                  alt="Logo"
                  className="h-10 w-10 object-contain rounded-lg"
                />
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Company Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className={inputClass}
              value={data.company.name}
              onChange={(e) => handleCompanyChange("name", e.target.value)}
              placeholder="Your Company Name"
            />
          </div>

          <div>
            <label className={labelClass}>
              Address <span className="text-red-400">*</span>
            </label>
            <textarea
              className={inputClass}
              rows={2}
              value={data.company.address}
              onChange={(e) => handleCompanyChange("address", e.target.value)}
              placeholder="Company Address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Phone{" "}
                <span className="text-stone-500 text-[10px] italic">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                className={inputClass}
                value={data.company.phone}
                onChange={(e) => handleCompanyChange("phone", e.target.value)}
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className={labelClass}>
                Email{" "}
                <span className="text-stone-500 text-[10px] italic">
                  (optional)
                </span>
              </label>
              <input
                type="email"
                className={inputClass}
                value={data.company.email}
                onChange={(e) => handleCompanyChange("email", e.target.value)}
                placeholder="email@company.com"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Website{" "}
              <span className="text-stone-500 text-[10px] italic">
                (optional)
              </span>
            </label>
            <input
              type="text"
              className={inputClass}
              value={data.company.website}
              onChange={(e) => handleCompanyChange("website", e.target.value)}
              placeholder="www.yourcompany.com"
            />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className={sectionClass}>
        <h3
          className={`text-lg font-bold mb-5 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Invoice Details
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>
              Invoice Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className={inputClass}
              value={data.invoiceNumber}
              onChange={(e) =>
                handleInvoiceChange("invoiceNumber", e.target.value)
              }
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className={labelClass}>
              Invoice Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              className={inputClass}
              value={data.invoiceDate}
              onChange={(e) =>
                handleInvoiceChange("invoiceDate", e.target.value)
              }
            />
          </div>
          <div>
            <label className={labelClass}>
              Due Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              className={inputClass}
              value={data.dueDate}
              onChange={(e) => handleInvoiceChange("dueDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className={sectionClass}>
        <h3
          className={`text-lg font-bold mb-5 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Customer Details
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Customer Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className={inputClass}
                value={data.customer.name}
                onChange={(e) => handleCustomerChange("name", e.target.value)}
                placeholder="Customer Name"
              />
            </div>
            <div>
              <label className={labelClass}>
                Company{" "}
                <span className="text-stone-500 text-[10px] italic">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                className={inputClass}
                value={data.customer.company}
                onChange={(e) =>
                  handleCustomerChange("company", e.target.value)
                }
                placeholder="Customer Company"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Billing Address <span className="text-red-400">*</span>
            </label>
            <textarea
              className={inputClass}
              rows={2}
              value={data.customer.address}
              onChange={(e) => handleCustomerChange("address", e.target.value)}
              placeholder="Customer Address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Email{" "}
                <span className="text-stone-500 text-[10px] italic">
                  (optional)
                </span>
              </label>
              <input
                type="email"
                className={inputClass}
                value={data.customer.email}
                onChange={(e) => handleCustomerChange("email", e.target.value)}
                placeholder="customer@email.com"
              />
            </div>
            <div>
              <label className={labelClass}>
                Phone{" "}
                <span className="text-stone-500 text-[10px] italic">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                className={inputClass}
                value={data.customer.phone}
                onChange={(e) => handleCustomerChange("phone", e.target.value)}
                placeholder="Customer Phone"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className={sectionClass}>
        <div className="flex justify-between items-center mb-5">
          <h3
            className={`text-lg font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Items & Services
          </h3>
          <div className="flex gap-2">
            {/* Currency Selector */}
            <select
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark
                  ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                  : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
              }`}
              value={crr}
              onChange={(e) => setCurr(e.target.value)}
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="INR">₹ INR</option>
            </select>
            <button
              onClick={addItem}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:scale-105 text-sm font-medium ${
                isDark
                  ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                  : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
              }`}
            >
              <Plus size={16} />
              <span>Add Item</span>
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-sm ${
                isDark
                  ? "border-gray-600 bg-black"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-5">
                  <label className={labelClass}>Description</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    placeholder="Product/Service description"
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Quantity</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Unit Price</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "unitPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Total</label>
                  <input
                    type="text"
                    className={`${inputClass} font-semibold`}
                    value={`${getCurrencySymbol(crr)}${item.total.toFixed(2)}`}
                    readOnly
                  />
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => removeItem(item.id)}
                    className={`p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 ${
                      isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className={sectionClass}>
        <h3
          className={`text-lg font-bold mb-5 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Totals & Taxes
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Tax Rate (%){" "}
              <span className="text-stone-500 text-[10px] italic">
                (optional)
              </span>
            </label>
            <input
              type="number"
              className={inputClass}
              value={data.taxRate}
              onChange={(e) =>
                handleInvoiceChange("taxRate", parseFloat(e.target.value) || 0)
              }
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div>
            <label className={labelClass}>
              Discount Rate (%){" "}
              <span className="text-stone-500 text-[10px] italic">
                (optional)
              </span>
            </label>
            <input
              type="number"
              className={inputClass}
              value={data.discountRate}
              onChange={(e) =>
                handleInvoiceChange(
                  "discountRate",
                  parseFloat(e.target.value) || 0
                )
              }
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className={sectionClass}>
        <h3
          className={`text-lg font-bold mb-5 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Payment Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>
              Bank Details / Payment Info{" "}
              <span className="text-stone-500 text-[10px] italic">
                (optional)
              </span>
            </label>
            <textarea
              className={inputClass}
              rows={3}
              value={data.paymentInfo.bankDetails}
              onChange={(e) =>
                handlePaymentInfoChange("bankDetails", e.target.value)
              }
              placeholder="Bank account details, UPI, PayPal link, etc."
            />
          </div>
          <div>
            <label className={labelClass}>
              Payment Terms{" "}
              <span className="text-stone-500 text-[10px] italic">
                (optional)
              </span>
            </label>
            <input
              type="text"
              className={inputClass}
              value={data.paymentInfo.terms}
              onChange={(e) => handlePaymentInfoChange("terms", e.target.value)}
              placeholder="Payment due within 30 days"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
