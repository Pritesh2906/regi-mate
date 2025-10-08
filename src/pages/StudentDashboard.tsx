import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, LogOut, Search, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  capacity: number;
  enrolled: number;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [availableCourses, setAvailableCourses] = useState<Course[]>([
    { id: "1", name: "Introduction to Computer Science", code: "CS101", credits: 4, capacity: 30, enrolled: 25 },
    { id: "2", name: "Data Structures and Algorithms", code: "CS201", credits: 4, capacity: 25, enrolled: 25 },
    { id: "3", name: "Database Management Systems", code: "CS301", credits: 3, capacity: 30, enrolled: 20 },
    { id: "4", name: "Web Development", code: "CS202", credits: 3, capacity: 35, enrolled: 28 },
    { id: "5", name: "Machine Learning Basics", code: "CS401", credits: 4, capacity: 20, enrolled: 15 },
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  const handleEnroll = (course: Course) => {
    if (course.enrolled >= course.capacity) {
      toast.error("Course is full!");
      return;
    }
    setEnrolledCourses([...enrolledCourses, course]);
    setAvailableCourses(availableCourses.map(c => 
      c.id === course.id ? { ...c, enrolled: c.enrolled + 1 } : c
    ));
    toast.success(`Successfully enrolled in ${course.name}`);
  };

  const handleDrop = (courseId: string) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    if (!course) return;
    
    setEnrolledCourses(enrolledCourses.filter(c => c.id !== courseId));
    setAvailableCourses(availableCourses.map(c => 
      c.id === courseId ? { ...c, enrolled: c.enrolled - 1 } : c
    ));
    toast.success(`Dropped ${course.name}`);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const filteredCourses = availableCourses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isEnrolled = (courseId: string) => enrolledCourses.some(c => c.id === courseId);
  const seatsLeft = (course: Course) => course.capacity - course.enrolled;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Student Portal</h1>
                <p className="text-sm opacity-90">Welcome back, John Doe</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* My Courses Section */}
        {enrolledCourses.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              My Courses
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{course.credits} Credits</Badge>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDrop(course.id)}
                      >
                        Drop Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Available Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Available Courses</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredCourses.map((course) => {
              const seats = seatsLeft(course);
              const enrolled = isEnrolled(course.id);
              const isFull = seats === 0;
              
              return (
                <Card key={course.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{course.name}</h3>
                          <Badge variant="outline">{course.code}</Badge>
                          <Badge variant="secondary">{course.credits} Credits</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">
                            Capacity: {course.enrolled}/{course.capacity}
                          </span>
                          {isFull ? (
                            <Badge variant="destructive">Full</Badge>
                          ) : seats <= 5 ? (
                            <Badge className="bg-warning text-warning-foreground">
                              {seats} seats left
                            </Badge>
                          ) : (
                            <Badge className="bg-success text-success-foreground">
                              {seats} seats available
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleEnroll(course)}
                        disabled={isFull || enrolled}
                        className="ml-4"
                      >
                        {enrolled ? "Enrolled" : isFull ? "Full" : "Enroll"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;