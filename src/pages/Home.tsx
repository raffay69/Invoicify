import { ArrowRight, Zap, Shield, Clock, Github } from "lucide-react";
import { ContainerTextFlip } from "../components/ui/text-flip";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { useEffect, useState } from "react";
import DarkModeSwitch from "../components/ToogleSwitch";
import { useNavigate } from "react-router-dom";
import { WobbleCard } from "../components/ui/wobble-card";
import { TextHoverEffect } from "../components/ui/text-hover-effect";

function Home() {
  const userPref = localStorage.getItem("darkMode");
  const [isDark, setIsDark] = useState(JSON.parse(userPref!) || false);
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Hero isDark={isDark} />
      <WobbleCardDemo isDark={isDark} />
      <Features isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}

export default Home;

export function Header({ isDark, setIsDark }: { isDark: any; setIsDark: any }) {
  const navigate = useNavigate();
  return (
    <header
      className={`${
        isDark ? "bg-black border-stone-800" : "bg-white border-gray-200"
      } border-b  transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-2">
            <img src="logo.png" alt="" height={50} width={50} />
            <span
              className={`text-2xl font-serif ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Invoicify
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <DarkModeSwitch isDark={isDark} setIsDark={setIsDark} />
            <button
              onClick={() => navigate("/create")}
              className={`${
                isDark
                  ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                  : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
              } px-6 py-2 rounded-lg font-medium transition-colors`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Hero({ isDark }: { isDark: any }) {
  const navigate = useNavigate();

  return (
    <>
      <section
        className={`${
          isDark
            ? "bg-[linear-gradient(to_bottom,#000000,#4a6d69)]"
            : "bg-[linear-gradient(to_bottom,#ffffff,#86efac)]"
        } py-20 transition-colors duration-300 mt-[80px] h-screen`}
      >
        <div className="absolute inset-0 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col justify-center items-center mb-5">
              <h1
                className={`text-5xl md:text-7xl font-bold ${
                  isDark ? "text-stone-100" : "text-gray-900"
                }   mb-6 leading-tight`}
              >
                Create Professional
              </h1>

              <div className="flex items-baseline text-5xl md:text-6xl font-bold">
                <span
                  className={`${
                    isDark ? "text-[#4a6d69]" : "text-green-700"
                  }   -mr-[70px] font-serif`}
                >
                  Invoices{" "}
                  <span className="inline-block text-left min-w-[12ch]">
                    <ContainerTextFlip
                      className={`${
                        isDark
                          ? "[background:linear-gradient(to_bottom,#5d817d,#3a5653)] shadow-[inset_0_-1px_#35504d,inset_0_0_0_1px_#35504d,_0_4px_8px_#2a3c3a] text-white"
                          : "[background:linear-gradient(to_bottom,#a7f3c6,#6ee7b7)] shadow-[inset_0_-1px_#34d399,inset_0_0_0_1px_#34d399,_0_4px_8px_#059669] text-black"
                      }`}
                      words={["in seconds", "for free", "effortlessly"]}
                    />
                  </span>
                </span>

                {/* Flip container */}
              </div>
            </div>

            <p className="text-xl text-gray-600 dark:text-stone-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate beautiful, professional invoices instantly. Completely
              free, no data stored, and ready in seconds. Your privacy is our
              priority.
            </p>

            <div className="flex justify-center gap-16 mt-16 mb-16">
              <button
                onClick={() => navigate("/create")}
                className={` ${
                  isDark
                    ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                    : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
                } px-4 py-2 rounded-lg font-medium text-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105`}
              >
                <span>Create Invoice For Free </span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="relative">
                <a
                  className={` ${
                    isDark
                      ? "bg-stone-800 border-black text-white hover:bg-stone-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.1)]"
                      : "bg-green-700 text-white hover:bg-green-900 shadow-[inset_0px_2.5px_0px_rgba(255,255,255,0.15)]"
                  } px-4 py-2 rounded-lg font-medium text-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105`}
                >
                  <span>
                    <Github />
                  </span>
                </a>
                <svg
                  className="text-muted-foreground/20 pointer-events-none absolute top-4 -right-[45px] size-10 rotate-[190deg]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 323.057 323.057"
                  xmlSpace="preserve"
                  fill="currentColor"
                >
                  <path d="M281.442 256.312c-47.124 59.364-139.536 44.676-160.956-29.376-1.224-3.672-1.836-7.956-2.448-11.628 49.572-11.016 97.92-47.124 102.204-90.576 3.672-39.168-36.108-50.796-62.424-28.764-31.212 26.316-53.244 64.872-55.08 105.875-31.824 4.284-63.036-4.284-80.172-35.496-28.764-52.631 9.792-123.624 61.2-144.432 5.508-1.836 3.06-10.404-2.448-8.568C10.326 33.544-26.394 132.688 21.954 191.439c18.972 22.645 49.572 29.988 81.396 26.316 4.284 41.616 36.72 74.664 75.275 87.516 44.676 14.688 85.68-6.731 111.996-41.616 4.285-5.508-4.896-12.239-9.179-7.343M144.354 132.688c9.792-13.464 22.644-28.764 39.168-34.272 15.911-5.508 21.42 16.524 22.031 26.316.612 12.24-7.956 23.256-15.912 31.824-16.523 18.971-44.063 35.496-72.215 42.839 1.836-23.868 13.464-47.123 26.928-66.707"></path>
                  <path d="M315.713 233.668c-17.136 0-34.884 1.224-51.408 5.508-6.731 1.836-3.672 11.016 3.061 9.792 13.464-2.448 27.54-1.836 41.004-1.224-.612 7.955-1.224 16.523-2.448 24.479-1.224 6.12-5.508 15.3-1.836 21.42 1.836 3.061 4.896 3.061 7.956 1.836 7.344-3.06 7.344-15.912 8.568-22.644 1.836-11.017 2.447-21.42 2.447-32.437 0-3.67-3.672-6.73-7.344-6.73"></path>
                </svg>
                <span className="text-left font-serif text-muted-foreground/20 text-[12px] absolute -top-10 -right-[190px] size-15 -rotate-[30deg]">
                  I'm unemployed
                  <br />
                  Please give me a star
                  <br />
                  Even my cat is disappointed…
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-stone-400">
                <Zap
                  className={`h-6 w-6  ${
                    isDark ? "text-[#4a6d69]" : "text-green-600"
                  }`}
                />
                <span className="font-medium">100% Free Forever</span>
              </div>

              <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-stone-400">
                <Shield
                  className={`h-6 w-6 ${
                    isDark ? "text-[#4a6d69]" : "text-green-600"
                  }`}
                />
                <span className="font-medium">Zero Data Storage</span>
              </div>

              <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-stone-400">
                <Clock
                  className={`h-6 w-6 ${
                    isDark ? "text-[#4a6d69]" : "text-green-600"
                  }`}
                />
                <span className="font-medium">Ready in Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Features({ isDark }: { isDark: any }) {
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <div
      className={`${
        isDark
          ? "bg-[linear-gradient(to_top,#000000,#4a6d69)]"
          : "bg-[linear-gradient(to_top,#ffffff,#86efac)]"
      } flex flex-col overflow-hidden `}
    >
      <ContainerScroll
        titleComponent={
          <>
            <h1
              className={`text-4xl font-semibold ${
                isDark ? "text-white" : "text-black"
              } `}
            >
              Professionally designed and visually appealing
              <br />
              <span className="text-4xl md:text-[6rem] font-serif mt-1 leading-none">
                Invoices
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`${isDark ? "/dark-create.png" : "/light-create.png"}`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl h-[100%] object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export function WobbleCardDemo({ isDark }: { isDark: any }) {
  return (
    <div className={`h-full ${isDark ? "bg-[#4a6d69]" : "bg-[#86efac]"} `}>
      <h1 className="text-7xl font-bold text-center mb-10">
        The <span className="font-serif italic"> Good </span> Stuff
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName={`col-span-1 lg:col-span-2  h-full ${
            isDark
              ? "bg-gradient-to-r from-[#064e3b] to-[#115e59]"
              : "bg-gradient-to-r from-[#10b981] to-[#14b8a6]"
          } min-h-[500px] lg:min-h-[300px]`}
          className={` ${
            isDark
              ? "bg-gradient-to-r from-[#064e3b] to-[#115e59]"
              : "bg-gradient-to-r from-[#10b981] to-[#14b8a6]"
          }`}
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white dark:text-blac">
              Gippity AI powers the entire universe
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
          <img
            src="dark-create.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-0 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard
          containerClassName={`col-span-1 min-h-[300px] ${
            isDark
              ? "bg-gradient-to-r from-[#115e59] to-[#064e3b]"
              : "bg-gradient-to-r from-[#14b8a6] to-[#10b981]"
          }`}
          className={`${
            isDark
              ? "bg-gradient-to-r from-[#115e59] to-[#064e3b]"
              : "bg-gradient-to-r from-[#14b8a6] to-[#10b981]"
          }`}
        >
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            No shirt, no shoes, no weapons.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            If someone yells “stop!”, goes limp, or taps out, the fight is over.
          </p>
        </WobbleCard>
        <WobbleCard
          containerClassName={`col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] ${
            isDark
              ? "bg-gradient-to-r from-[#064e3b] to-[#115e59]"
              : "bg-gradient-to-r from-[#10b981] to-[#14b8a6]"
          } `}
          className={` ${
            isDark
              ? "bg-gradient-to-r from-[#064e3b] to-[#115e59]"
              : "bg-gradient-to-r from-[#10b981] to-[#14b8a6]"
          }`}
        >
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Signup for blazing-fast cutting-edge state of the art Gippity AI
              wrapper today!
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
          <img
            src="/dark-create.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[0%] bottom-2 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>
  );
}

function Footer({ isDark }: { isDark: any }) {
  return (
    <div
      className={`h-[20rem] flex items-center justify-center ${
        isDark
          ? "bg-[linear-gradient(to_bottom,#000000_60%,#4a6d69_100%)]"
          : "bg-[linear-gradient(to_bottom,#ffffff_60%,#86efac_100%)]"
      }  `}
    >
      <TextHoverEffect text="INVOICIFY" />
    </div>
  );
}
