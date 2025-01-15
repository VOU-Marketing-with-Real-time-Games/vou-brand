interface TooltipProps {
    content: string
    x: number
    y: number
  }
  
  export function Tooltip({ content, x, y }: TooltipProps) {
    return (
      <div 
        className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full
                   bg-[#1a2234] text-white px-3 py-1.5 rounded-md text-sm font-medium
                   opacity-0 transition-opacity duration-200 ease-in-out data-[show=true]:opacity-100"
        style={{ 
          left: `${x}px`, 
          top: `${y}px` 
        }}
        data-show={Boolean(content)}
      >
        {content}
        <div 
          className="absolute left-1/2 -bottom-1 w-2 h-2 bg-[#1a2234] 
                     transform -translate-x-1/2 rotate-45"
        />
      </div>
    )
  }
  
  