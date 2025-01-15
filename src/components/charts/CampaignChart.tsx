import { PieChart } from './PieChart'

const data = [
  { genre: 'AI', value: 35, color: '#FF1493' },
  { genre: 'Machine Learning', value: 25, color: '#FF69B4' },
  { genre: 'Computer vision', value: 20, color: '#FFB6C1' },
  { genre: 'Chat bot', value: 12, color: '#FFC0CB' },
  { genre: 'Other', value: 8, color: '#FFE4E1' }
]

export default function CampaignChart() {
  return (
    <div className="max-w-md mx-auto p-6 border border-[#e5e5e5] rounded-lg shadow-md">
      <h2 className="text-[24px] font-semibold text-[#1a1a1a] mb-6">
        Most Participants by Campaigns
      </h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <div className="w-[180px] h-[180px] shrink-0">
          <PieChart data={data} />
        </div>
        <div className="flex flex-wrap sm:flex-col gap-3 justify-center">
          {data.map(({ genre, color }) => (
            <div 
              key={genre} 
              className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
            >
              <div 
                className="w-4 h-4 rounded-sm" 
                style={{ backgroundColor: color }}
              />
              <span className="text-[14px] text-[#333333]">{genre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

