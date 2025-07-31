import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { leaderboardAPI } from '@/lib/api';

interface LeaderboardEntry {
  rank: number;
  user: {
    id: number;
    username: string;
  };
  solved_problems: number;
  total_submissions: number;
  acceptance_rate: number;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await leaderboardAPI.getLeaderboard();
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-warning" />;
      case 2:
        return <Trophy className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-600" />;
      default:
        return <Award className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/30';
      default:
        return 'bg-gradient-card border-border';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="grid gap-4">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="bg-gradient-card border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
        <p className="text-muted-foreground">Top performers on CodeJudge</p>
      </div>

      <div className="grid gap-4">
        {leaderboard.map((entry) => (
          <Card key={entry.user.id} className={`${getRankColor(entry.rank)} hover:shadow-glow transition-all duration-300`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(entry.rank)}
                    <span className="text-2xl font-bold">#{entry.rank}</span>
                  </div>
                  
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                      {entry.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <CardTitle className="text-xl">{entry.user.username}</CardTitle>
                    <p className="text-muted-foreground">
                      {entry.solved_problems} problems solved
                    </p>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      {entry.total_submissions} submissions
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={
                        entry.acceptance_rate >= 80 
                          ? 'border-success text-success' 
                          : entry.acceptance_rate >= 60 
                          ? 'border-warning text-warning'
                          : 'border-destructive text-destructive'
                      }
                    >
                      {entry.acceptance_rate.toFixed(1)}% accuracy
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {leaderboard.length === 0 && !loading && (
        <div className="text-center py-12">
          <Trophy className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No leaderboard data available yet.</p>
        </div>
      )}
    </div>
  );
}