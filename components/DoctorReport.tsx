import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

const DoctorReport: React.FC = () => {
  // 膠囊圖數據
  const capsuleData = [
    { label: '一', value: 72, color: 'bg-pastel-olive' },
    { label: '二', value: 45, color: 'bg-pastel-peach' },
    { label: '三', value: 77, color: 'bg-pastel-blue' },
    { label: '四', value: 69, color: 'bg-pastel-yellow' },
    { label: '五', value: 95, color: 'bg-pastel-olive' },
    { label: '六', value: 85, color: 'bg-pastel-peach' },
    { label: '日', value: 60, color: 'bg-pastel-yellow' },
  ];

  return (
    <div className="p-6 min-h-full bg-neuro-bg pb-32">
      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold text-ink-main">活躍與認知</h1>
        <p className="text-ink-sub mt-1">您的長期健康趨勢</p>
      </div>

      {/* 粉彩風險評估卡片：短期記憶分數 + 大腦活力年齡 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-pastel-blue p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between aspect-square">
          <div>
            <span className="text-blue-900/60 font-medium text-sm">短期記憶分數</span>
            <p className="text-4xl font-bold text-blue-900 mt-2 tabular-nums">26<span className="text-lg font-medium">/30</span></p>
          </div>
          <span className="text-xs bg-white/40 text-blue-900 px-2 py-1 rounded-full mt-3 inline-block font-medium self-start">狀態良好</span>
        </div>
        <div className="bg-pastel-peach p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between aspect-square">
          <div>
            <span className="text-red-900/60 font-medium text-sm">大腦活力年齡</span>
            <p className="text-4xl font-bold text-red-900 mt-2 tabular-nums">68<span className="text-lg font-medium">歲</span></p>
          </div>
          <span className="text-xs bg-white/40 text-red-900 px-2 py-1 rounded-full mt-3 inline-block font-medium self-start">比實際年輕</span>
        </div>
      </div>

      {/* 睡眠波浪圖 - 有機曲線降低數字焦慮 */}
      <SleepWaveChart />

      {/* 認知軟墊雷達圖 - 圓潤的多邊形 */}
      <CognitiveRadarChart />

      {/* 情緒泡泡月曆 - 用泡泡大小顏色代表狀態 */}
      <EmotionBubbleCalendar />

      {/* 狀態膠囊圖 */}
      <div className="bg-neuro-card p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] mb-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="font-semibold text-lg text-ink-main">綜合評估趨勢</h3>
            <p className="text-xs text-ink-muted mt-1">結合語音、測驗與活動量</p>
          </div>
          <div className="bg-neuro-surface p-1 rounded-full flex gap-1">
            <span className="text-xs bg-white text-ink-main px-3 py-1 rounded-full shadow-sm font-medium">週</span>
            <span className="text-xs text-ink-muted px-3 py-1">月</span>
          </div>
        </div>

        <div className="flex justify-between items-end h-40">
          {capsuleData.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-3 w-full group relative cursor-pointer">
              <span className="absolute -top-6 text-xs font-bold text-ink-sub opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}%
              </span>
              <div className="w-8 md:w-10 h-32 md:h-40 bg-neuro-surface rounded-full flex flex-col justify-end overflow-hidden relative group-hover:bg-gray-100 transition-colors">
                <div
                  className={`w-full rounded-full ${item.color} transition-all duration-1000 ease-out absolute bottom-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]`}
                  style={{ height: `${item.value}%` }}
                />
              </div>
              <span className="text-xs text-ink-muted font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Report Link */}
      <button className="bg-white p-6 rounded-[2rem] shadow-sm border border-neuro-surface flex items-center justify-between w-full text-left touch-manipulation">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pastel-yellow rounded-2xl flex items-center justify-center">
            <Calendar className="text-yellow-700" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-ink-main">查看詳細月報</h4>
            <p className="text-xs text-ink-muted">包含醫師專業建議</p>
          </div>
        </div>
        <ArrowUpRight className="text-ink-muted" size={20} />
      </button>
    </div>
  );
};

// 睡眠波浪圖組件
const SleepWaveChart: React.FC = () => {
  return (
    <div className="bg-neuro-card p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border-2 border-neuro-surface mb-6">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-ink-main">睡眠波浪</h3>
        <p className="text-xs text-ink-muted">平滑的有機曲線，降低對數字的焦慮感</p>
      </div>
      <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-neuro-surface flex items-end">
        <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-sm absolute bottom-0" preserveAspectRatio="none">
          {/* 淺睡波浪 */}
          <path
            d="M0,50 L0,20 C10,10 20,40 30,30 C40,20 50,10 60,25 C70,40 80,10 100,20 L100,50 Z"
            fill="#BBD0FF"
            opacity="0.6"
          />
          {/* 深睡波浪 */}
          <path
            d="M0,50 L0,35 C15,25 25,45 40,35 C55,25 65,40 80,30 C90,20 95,35 100,30 L100,50 Z"
            fill="#919E75"
            opacity="0.8"
          />
        </svg>
        <div className="absolute top-3 left-4 text-xs font-bold text-blue-900/50">深睡區間</div>
        <div className="absolute bottom-3 right-4 text-xs font-medium text-ink-muted">昨晚 7.5 小時</div>
      </div>
      <div className="flex justify-between mt-4 px-2">
        <span className="text-xs text-ink-muted">22:30 入睡</span>
        <span className="text-xs text-ink-muted">06:00 起床</span>
      </div>
    </div>
  );
};

// 認知軟墊雷達圖組件
const CognitiveRadarChart: React.FC = () => {
  return (
    <div className="bg-neuro-card p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border-2 border-neuro-surface mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg text-ink-main">認知能力雷達</h3>
          <p className="text-xs text-ink-muted">圓潤的包覆形狀，呈現各項能力</p>
        </div>
      </div>
      <div className="relative h-52 w-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-44 h-44 overflow-visible">
          {/* 背景網格 (圓形化) */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#F3F4F6" strokeWidth="1" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="#F3F4F6" strokeWidth="0.5" />

          {/* 軸線 */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2="50"
              y2="10"
              stroke="#E5E7EB"
              strokeWidth="1"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}

          {/* 數據多邊形 (圓潤轉角) */}
          <polygon
            points="50,15 85,40 70,80 30,80 20,45"
            fill="#CBE4D6"
            opacity="0.7"
            stroke="#919E75"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* 中心點 */}
          <circle cx="50" cy="50" r="4" fill="#919E75" />
        </svg>

        {/* 標籤 */}
        <span className="absolute top-0 text-xs font-bold text-ink-sub">記憶力</span>
        <span className="absolute bottom-4 left-4 text-xs font-bold text-ink-sub">邏輯</span>
        <span className="absolute bottom-4 right-4 text-xs font-bold text-ink-sub">語言</span>
        <span className="absolute top-20 -left-1 text-xs font-bold text-ink-sub">注意力</span>
        <span className="absolute top-20 -right-1 text-xs font-bold text-ink-sub">空間</span>
      </div>
    </div>
  );
};

// 情緒泡泡月曆組件
const EmotionBubbleCalendar: React.FC = () => {
  // 模擬過去兩週的情緒數據
  const emotionData = [
    { size: 'w-7 h-7', color: 'bg-pastel-green' },
    { size: 'w-5 h-5', color: 'bg-pastel-yellow' },
    { size: 'w-8 h-8', color: 'bg-pastel-green' },
    { size: 'w-4 h-4', color: 'bg-pastel-peach' },
    { size: 'w-6 h-6', color: 'bg-pastel-blue' },
    { size: 'w-7 h-7', color: 'bg-pastel-green' },
    { size: 'w-5 h-5', color: 'bg-pastel-yellow' },
    { size: 'w-8 h-8', color: 'bg-pastel-olive' },
    { size: 'w-6 h-6', color: 'bg-pastel-green' },
    { size: 'w-4 h-4', color: 'bg-neuro-surface' },
    { size: 'w-7 h-7', color: 'bg-pastel-blue' },
    { size: 'w-5 h-5', color: 'bg-pastel-yellow' },
    { size: 'w-6 h-6', color: 'bg-pastel-green' },
    { size: 'w-8 h-8', color: 'bg-pastel-olive' },
  ];

  return (
    <div className="bg-neuro-card p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border-2 border-neuro-surface mb-6">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-ink-main">情緒泡泡月曆</h3>
        <p className="text-xs text-ink-muted">泡泡的大小與顏色代表每天的綜合狀態</p>
      </div>

      {/* 星期標題 */}
      <div className="grid grid-cols-7 gap-y-3 gap-x-1 mt-4">
        {['一', '二', '三', '四', '五', '六', '日'].map(d => (
          <div key={d} className="text-center text-[10px] text-ink-muted font-medium mb-2">{d}</div>
        ))}

        {/* 泡泡格子 */}
        {emotionData.map((item, i) => (
          <div key={i} className="flex items-center justify-center h-10">
            <div
              className={`${item.size} ${item.color} rounded-full shadow-sm transition-transform hover:scale-125 cursor-pointer`}
            />
          </div>
        ))}
      </div>

      {/* 圖例 */}
      <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-neuro-surface">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pastel-green rounded-full" />
          <span className="text-[10px] text-ink-muted">良好</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pastel-yellow rounded-full" />
          <span className="text-[10px] text-ink-muted">普通</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pastel-peach rounded-full" />
          <span className="text-[10px] text-ink-muted">需關注</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorReport;
