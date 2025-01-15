import React, { useState } from 'react';

interface VoucherCampaignData {
  name: string;
  count: number;
}

interface VoucherCampaignOverviewProps {
  data: VoucherCampaignData[];
}

const VoucherCampaignOverview: React.FC<VoucherCampaignOverviewProps> = ({ data })  => {
  const [hoveredRating, setHoveredRating] = useState<string | null>(null);
  
  // Calculate total count
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mx-5">
      <h2 className="text-[#1a2b3b] text-2xl font-semibold mb-6">Total voucher by campaigns</h2>
      <div className="relative">
        <div className="flex items-end h-32 gap-[11px] mb-2">
          {data.map((item) => (
            <div
              key={item.name}
              className="relative flex-1 group"
              onMouseEnter={() => setHoveredRating(item.name)}
              onMouseLeave={() => setHoveredRating(null)}
            >
              <div
                className={`w-full transition-all duration-300 rounded-sm ${
                  item.count > 0 ? 'bg-[#E91E63] group-hover:bg-[#FF4081]' : 'bg-transparent'
                }`}
                style={{
                  height: totalCount > 0 ? `${(item.count / totalCount)* 150}px` : '0'
                }}
              />
              
              {/* Hover tooltip */}
              {hoveredRating === item.name && item.count > 0 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a2b3b] text-white rounded-md p-3 whitespace-nowrap animate-fadeIn z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="text-sm opacity-90">{item.count} </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between px-[6px]">
          {data.map((item) => (
            <div key={item.name} className="text-sm text-gray-600">
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoucherCampaignOverview;