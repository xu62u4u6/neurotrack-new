import React from 'react';
import { Activity, TrendingUp, Calendar, AlertCircle, ArrowUpRight } from 'lucide-react';

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

      {/* 粉彩風險評估卡片 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-pastel-blue p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between aspect-square">
          <div>
            <span className="text-blue-900/60 font-medium text-sm">短期記憶分數</span>
            <p className="text-4xl font-bold text-blue-900 mt-2">26<span className="text-lg font-medium">/30</span></p>
          </div>
          <span className="text-xs bg-white/40 text-blue-900 px-2 py-1 rounded-full mt-3 inline-block font-medium self-start">狀態良好</span>
        </div>
        <div className="bg-pastel-peach p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between aspect-square">
          <div>
            <span className="text-red-900/60 font-medium text-sm">未來三年風險</span>
            <p className="text-4xl font-bold text-red-900 mt-2">12<span className="text-lg font-medium">%</span></p>
          </div>
          <span className="text-xs bg-white/40 text-red-900 px-2 py-1 rounded-full mt-3 inline-block font-medium self-start">維持現狀</span>
        </div>
      </div>

      {/* 狀態膠囊圖 */}
      <div className="bg-neuro-card p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
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
      <div className="mt-6 bg-white p-6 rounded-[2rem] shadow-sm border border-neuro-surface flex items-center justify-between">
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
      </div>
    </div>
  );
};

export default DoctorReport;
