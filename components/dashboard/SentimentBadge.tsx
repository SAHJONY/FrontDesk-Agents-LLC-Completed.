import { Badge, Tooltip } from '@tremor/react';
import { Smile, Meho, Frown, AlertCircle } from 'lucide-react';

interface SentimentProps {
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: number;
}

export const SentimentBadge = ({ sentiment, urgency }: SentimentProps) => {
  const config = {
    positive: { color: 'emerald', icon: Smile, text: 'Satisfied' },
    neutral: { color: 'zinc', icon: Meho, text: 'Neutral' },
    negative: { color: 'rose', icon: Frown, text: 'Frustrated' },
  };

  const { color, icon: Icon, text } = config[sentiment] || config.neutral;

  return (
    <div className="flex items-center gap-2">
      <Badge color={color as any} icon={Icon}>
        {text.toUpperCase()}
      </Badge>
      
      {urgency >= 4 && (
        <Tooltip text={`High Urgency: Level ${urgency}`}>
          <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />
        </Tooltip>
      )}
    </div>
  );
};
