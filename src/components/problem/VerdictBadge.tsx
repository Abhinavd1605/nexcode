import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, AlertTriangle, Code } from 'lucide-react';

interface VerdictBadgeProps {
  verdict: 'Pending' | 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compilation Error';
}

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const config = {
    Pending: {
      className: 'bg-warning/20 text-warning border-warning/30',
      icon: Clock,
    },
    Accepted: {
      className: 'bg-success/20 text-success border-success/30',
      icon: Check,
    },
    'Wrong Answer': {
      className: 'bg-destructive/20 text-destructive border-destructive/30',
      icon: X,
    },
    'Time Limit Exceeded': {
      className: 'bg-warning/20 text-warning border-warning/30',
      icon: AlertTriangle,
    },
    'Compilation Error': {
      className: 'bg-destructive/20 text-destructive border-destructive/30',
      icon: Code,
    },
  };

  const { className, icon: Icon } = config[verdict];

  return (
    <Badge variant="outline" className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {verdict}
    </Badge>
  );
}