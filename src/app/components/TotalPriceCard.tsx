import React from "react";

interface TotalPriceCardProps {
  serviceTitles: string[];
  serviceCosts: { [key: string]: number };
  selectedServices: boolean[];
  totalPrice: number;
  lang: string;
}

const TotalPriceCard: React.FC<TotalPriceCardProps> = ({
  serviceTitles,
  serviceCosts,
  selectedServices,
  totalPrice,
  lang,
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-md border-2 border-black bg-white text-black p-8">
      <div>
        {/* Card Header */}
        <div className="flex flex-row justify-between">
          <h3 className="text-4xl tracking-tight">
            {lang === "en" ? "Your plan" : "Din plan"}
          </h3>
          {/* Placeholder for spots left, can be dynamic */}
          <div className="flex items-center rounded-full border border-zinc-500 bg-zinc-900 px-4 py-1 font-normal text-zinc-500">
            <p className="font-medium text-white">
              {lang === "en" ? "2 spots left" : "2 platser kvar"}
            </p>
          </div>
        </div>
        {/* Total Price */}
        <h2 className="pt-12 text-5xl tracking-tight">
          ${formatNumber(totalPrice)}/mo
        </h2>
        <p className="text-md pt-2 text-zinc-500">
          {lang === "en" ? "Pause or cancel anytime" : "Pausa eller avbryt när du vill"}
        </p>
        {/* Selected Services */}
        <div className="max-w-xs pt-1">
          {selectedServices.map((isSelected, index) => (
            isSelected && (
              <p key={index} className="text-md border-b border-zinc-300 py-2 text-zinc-500">
                <span className="font-medium">
                  ${formatNumber(serviceCosts[`service${index + 1}`])}/mo
                </span>
                {` | ${serviceTitles[index]}`}
              </p>
            )
          ))}
        </div>
      </div>
      <div className="pt-8">
        <button
          className="box-shadow rounded-full border border-white bg-black text-white px-4 py-2"
          type="button"
        >
          {lang === "en" ? "Get started with a call" : "Kom igång med ett samtal"} →
        </button>
      </div>
    </div>
  );
};

export default TotalPriceCard;
