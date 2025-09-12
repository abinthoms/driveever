import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  onClick?: () => void;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'from-green-100 to-green-200',
  iconColor = 'text-green-600',
  trend,
  onClick,
  className = '',
}) => {
  const cardClasses = `
    bg-white rounded-2xl shadow-lg p-6 border border-gray-100 
    transition-all duration-300 transform hover:-translate-y-1
    ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
    ${className}
  `;

  const iconClasses = `w-16 h-16 bg-gradient-to-br ${iconBgColor} rounded-2xl flex items-center justify-center`;

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.value}
              </span>
              {trend.isPositive ? (
                <svg className="w-4 h-4 text-green-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
            </div>
          )}
        </div>
        <div className={iconClasses}>
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
