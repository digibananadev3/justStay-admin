import { useCallback, useEffect, useState, useRef } from "react";

const InputComponent = ({
  isSearchIcon = false,
  placeholder = "",
  type = "text",
  name,
  disabled,
  className = "",
  handleValue,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const debounceTimerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Handle input change with debouncing
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      if (handleValue && typeof handleValue === 'function') {
        handleValue(value);
      }
    }, 500); // 500ms debounce delay
  }, [handleValue]);

  return (
    <div
      className={`flex items-center w-full rounded-xl bg-[#F3F3F5] px-4 py-2.5 ${className}`}
    >
      {isSearchIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      )}

      <input
        type={type}
        name={name}
        disabled={disabled}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="ml-3 w-full bg-transparent text-slate-700 placeholder-slate-400 outline-none"
        {...rest}
      />
    </div>
  );
};

export default InputComponent;