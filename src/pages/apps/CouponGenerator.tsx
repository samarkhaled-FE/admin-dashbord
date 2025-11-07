import { FormEvent, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

// 💡 Suggestion: consider moving these constants outside the component file if reused elsewhere (e.g., utils/coupon.ts)
const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const CouponGenerator = () => {
  // use an object for settings to simplify state management and avoid repetitive setters
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  // Good use of async clipboard API
  const copyText = async (coupon: string) => {
    try {
      await navigator.clipboard.writeText(coupon);
      setIsCopied(true);
    } catch (err) {
      console.error("Clipboard copy failed", err); // 💡 Suggestion: handle clipboard error gracefully
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // show a toast or inline message instead of blocking alert()
    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please select at least one character type");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    // validate that prefix isn't longer than size
    if (loopLength <= 0) {
      return alert("Prefix is longer than or equal to total size");
    }

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      // Defensive check in case no character sets selected (shouldn’t happen, but safe)
      if (!entireString) return;

      const randomNum: number = Math.floor(Math.random() * entireString.length); // ✅ Prefer Math.floor over bitwise truncation for clarity
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  // smart reset of “Copied” indicator when coupon changes
  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="admin_container">
      <Sidebar />
      <main className="dashboard_app_container">
        <h1>Coupon</h1>
        <section>
          <form className="coupon_form" onSubmit={submitHandler}>
            {/*  add labels for accessibility instead of only placeholders */}
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            {/* debounce or validate input to avoid negative or NaN size */}
            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset>
              <legend>Include</legend>

              {/* wrap checkbox + label in a <label> element for better click targets */}
              <label>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers((prev) => !prev)}
                />
                Numbers
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={includeCharacters}
                  onChange={() => setIncludeCharacters((prev) => !prev)}
                />
                Characters
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols((prev) => !prev)}
                />
                Symbols
              </label>
            </fieldset>

            {/* add loading state or animation if generation ever becomes async */}
            <button type="submit">Generate</button>
          </form>

          {coupon && (
            <code>
              {coupon}{" "}
              {/* make copy button a real <button> for accessibility */}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => copyText(coupon)}
              >
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default CouponGenerator;
              
