import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Trophy, Brain, Users, Zap, Shield } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Master Programming
            <br />
            with AI Guidance
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Practice coding problems, compete with developers worldwide, and improve your skills with intelligent AI assistance. Your journey to coding excellence starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="hero">
              <Link to="/register">
                <Code className="mr-2 h-5 w-5" />
                Start Coding
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link to="/problems">
                Explore Problems
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose CodeJudge?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Powered Learning</CardTitle>
                <CardDescription>
                  Get instant feedback, hints, and explanations from our intelligent AI assistant
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Trophy className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Competitive Programming</CardTitle>
                <CardDescription>
                  Participate in contests and climb the leaderboard to prove your skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-success mb-4" />
                <CardTitle>Secure Execution</CardTitle>
                <CardDescription>
                  Run your code safely in isolated Docker containers with proper resource limits
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-gradient-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Join Our Growing Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Problems</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">50K+</div>
              <div className="text-muted-foreground">Submissions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warning mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of developers who are improving their coding skills with CodeJudge
          </p>
          <Button asChild size="xl" variant="hero">
            <Link to="/register">
              <Zap className="mr-2 h-5 w-5" />
              Get Started Free
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}