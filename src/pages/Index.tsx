import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <GraduationCap className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Course Registration System</h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Streamline your academic journey with our comprehensive course management platform
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
            className="bg-white text-primary hover:bg-white/90 shadow-lg"
          >
            Get Started
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <Card className="shadow-card">
            <CardHeader>
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Browse Courses</CardTitle>
              <CardDescription>
                Explore a wide range of courses across different departments and find the perfect fit for your academic goals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <Calendar className="w-12 h-12 text-accent mb-4" />
              <CardTitle>Easy Enrollment</CardTitle>
              <CardDescription>
                Register for courses with just a few clicks and manage your schedule efficiently throughout the semester
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <Users className="w-12 h-12 text-success mb-4" />
              <CardTitle>Admin Control</CardTitle>
              <CardDescription>
                Powerful administrative tools to manage courses, track enrollments, and support student success
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-8">
            Sign in to access your personalized dashboard and start managing your courses today
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
          >
            Sign In Now
          </Button>
        </div>
      </main>

      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Course Registration System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
