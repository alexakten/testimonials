import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.8125 25.6858C19.7161 25.6858 25.3125 20.0893 25.3125 13.1858C25.3125 6.28223 19.7161 0.685791 12.8125 0.685791C5.90894 0.685791 0.3125 6.28223 0.3125 13.1858C0.3125 20.0893 5.90894 25.6858 12.8125 25.6858ZM22.3848 13.9629C22.5594 13.0133 21.7605 12.2243 20.795 12.2243H12.9279L5.06075 12.2243C4.09522 12.2243 3.29641 13.0133 3.471 13.9629C3.59303 14.6267 3.78491 15.2774 4.04443 15.9039C4.52765 17.0705 5.23591 18.1305 6.12878 19.0234C7.02165 19.9162 8.08164 20.6245 9.24824 21.1077C10.4148 21.5909 11.6652 21.8397 12.9279 21.8397C14.1906 21.8397 15.4409 21.5909 16.6075 21.1077C17.7741 20.6245 18.8341 19.9162 19.727 19.0234C20.6199 18.1305 21.3281 17.0705 21.8113 15.9039C22.0709 15.2774 22.2627 14.6267 22.3848 13.9629Z"
          fill="#6054FC"
        />
      </svg>
      <div className="font-medium text-2xl text-black">
        <p className="tracking-wide">
          kindred<span className="text-purple">feel</span>
        </p>
      </div>
    </div>
  );
};

export default Logo;
