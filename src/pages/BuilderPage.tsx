import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { InvoiceData } from "../types/invoice";
import DarkModeSwitch from "../components/ToogleSwitch";
import { InvoiceForm } from "../components/InvoiceForm";
import { InvoicePreview } from "../components/InvoicePreview";
import { InvoicePreview2 } from "../components/InvoicePreview2";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function BuilderPage() {
  const userPref = localStorage.getItem("darkMode");
  const [isDark, setIsDark] = useState(JSON.parse(userPref!) || false);
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  const [temp, setTemp] = useState("temp1");
  const isLoggedIn = false;
  const loginRef = useRef();

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    company: {
      name: "",
      logo: "",
      address: "",
      phone: "",
      email: "",
      website: "",
    },
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    customer: {
      name: "",
      company: "",
      address: "",
      email: "",
      phone: "",
    },
    items: [
      {
        id: "1",
        description: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discountRate: 0,
    discountAmount: 0,
    grandTotal: 0,
    paymentInfo: {
      bankDetails: "",
      terms: "Payment due within 30 days",
    },
  });

  const [crr, setCurr] = useState("INR");

  const handleExport = async () => {
    const input = invoiceRef.current;

    if (input) {
      const canvas = await html2canvas(input, {
        allowTaint: true,
        scale: 2,
        useCORS: true,
        logging: false,
        height: window.outerHeight + window.innerHeight,
        windowHeight: window.outerHeight + window.innerHeight,
      });

      const imgData = canvas.toDataURL();
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    }
  };

  useEffect(() => {
    if (isLoggedIn) return;
    if (!loginRef.current) return;
    const driverObj = driver({
      overlayColor: "black",
      stagePadding: 5,
      popoverClass: isDark ? "driverjs-theme-dark" : "driverjs-theme-light",
    });

    driverObj.highlight({
      element: loginRef.current,
      popover: {
        title: "Hold up! Log in first",
        description:
          "We’d love to hand over your invoice, but first you gotta sign in. No login, no download 😉",
      },
    });
  }, []);

  const bgClass = isDark ? "bg-black" : "bg-gray-50";
  const containerBgClass = isDark ? "bg-black" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-900";

  return (
    <div
      className={`min-h-screen ${bgClass} ${textClass} transition-all duration-300`}
    >
      {/* Header */}
      <div
        className={`${containerBgClass} border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        } transition-all duration-300 shadow-sm h-[70px]`}
      >
        <div className="max-w-full  px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="logo.png" alt="" height={50} width={50} />
              <div>
                <h1 className="text-xl font-serif tracking-tight">Invoicify</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={handleExport}
                  className={`px-3 py-2 text-sm rounded-xl flex items-center space-x-3 transition-all duration-200 hover:scale-105 font-medium ${
                    isDark
                      ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                      : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
                  }`}
                >
                  <Download size={18} />
                  <span>Export PDF</span>
                </button>
              ) : (
                <button
                  //   onClick={handleExport}
                  //@ts-ignore
                  ref={loginRef}
                  className={`px-3 py-2 text-sm rounded-xl flex items-center space-x-3 transition-all duration-200 hover:scale-105 font-medium ${
                    isDark
                      ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                      : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
                  }`}
                >
                  <Download size={18} />
                  <span>Login to Download</span>
                </button>
              )}

              <DarkModeSwitch isDark={isDark} setIsDark={setIsDark} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-70px)]">
        {/* Form Section */}
        <div className="w-1/2 p-8 overflow-hidden">
          <div
            className={`h-full ${containerBgClass} rounded-2xl ${
              isDark ? "shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "shadow-xl"
            } p-8 transition-all duration-300`}
          >
            <h2
              className={`text-xl font-bold mb-4 mt-[-10px] ${textClass} tracking-tight`}
            >
              Invoice Details
            </h2>
            <InvoiceForm
              temp={temp}
              setTemp={setTemp}
              crr={crr}
              setCurr={setCurr}
              data={invoiceData}
              onChange={setInvoiceData}
              isDark={isDark}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 p-8 overflow-hidden ">
          <div
            className={`h-full ${
              isDark ? "shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "shadow-xl"
            }`}
          >
            {temp === "temp1" ? (
              <InvoicePreview
                //@ts-ignore
                ref={invoiceRef}
                crr={crr}
                data={invoiceData}
                isDark={isDark}
              />
            ) : (
              <InvoicePreview2
                //@ts-ignore
                ref={invoiceRef}
                crr={crr}
                data={invoiceData}
                isDark={isDark}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
