import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VerdictBadge } from '@/components/problem/VerdictBadge';
import { Search, Calendar, Code, Clock } from 'lucide-react';
import { submissionsAPI, Submission } from '@/lib/api';

export function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<string>('all');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await submissionsAPI.getSubmissions({
          verdict: verdictFilter !== 'all' ? verdictFilter : undefined,
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [verdictFilter]);

  const filteredSubmissions = submissions.filter(submission =>
    searchTerm === '' || submission.id.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="grid gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-gradient-card border-border">
              <CardHeader>
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold">My Submissions</h1>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by submission ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-code-bg border-code-border"
            />
          </div>
          
          <Select value={verdictFilter} onValueChange={setVerdictFilter}>
            <SelectTrigger className="w-48 bg-code-bg border-code-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verdicts</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Wrong Answer">Wrong Answer</SelectItem>
              <SelectItem value="Time Limit Exceeded">Time Limit Exceeded</SelectItem>
              <SelectItem value="Compilation Error">Compilation Error</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">
                    Submission #{submission.id}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Link 
                        to={`/problems/${submission.problem}`}
                        className="text-primary hover:underline"
                      >
                        Problem #{submission.problem}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      {submission.language}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(submission.submitted_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <VerdictBadge verdict={submission.verdict} />
                  {submission.execution_time && (
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {submission.execution_time}ms
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No submissions found.</p>
        </div>
      )}
    </div>
  );
}