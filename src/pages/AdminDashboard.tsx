import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Edit, LogOut, Plus, Trash2, Users } from "lucide-react";
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

interface Student {
  id: string;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Introduction to Computer Science", code: "CS101", credits: 4, capacity: 30, enrolled: 25 },
    { id: "2", name: "Data Structures and Algorithms", code: "CS201", credits: 4, capacity: 25, enrolled: 25 },
    { id: "3", name: "Database Management Systems", code: "CS301", credits: 3, capacity: 30, enrolled: 20 },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStudentsDialogOpen, setIsStudentsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", code: "", credits: "", capacity: "" });

  const mockStudents: Student[] = [
    { id: "1", name: "John Doe", email: "john@university.edu" },
    { id: "2", name: "Jane Smith", email: "jane@university.edu" },
    { id: "3", name: "Bob Johnson", email: "bob@university.edu" },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAddCourse = () => {
    if (!formData.name || !formData.code || !formData.credits || !formData.capacity) {
      toast.error("Please fill in all fields");
      return;
    }

    const newCourse: Course = {
      id: Date.now().toString(),
      name: formData.name,
      code: formData.code,
      credits: parseInt(formData.credits),
      capacity: parseInt(formData.capacity),
      enrolled: 0,
    };

    setCourses([...courses, newCourse]);
    setIsAddDialogOpen(false);
    setFormData({ name: "", code: "", credits: "", capacity: "" });
    toast.success("Course added successfully");
  };

  const handleEditCourse = () => {
    if (!selectedCourse || !formData.name || !formData.code || !formData.credits || !formData.capacity) {
      toast.error("Please fill in all fields");
      return;
    }

    setCourses(courses.map(c => 
      c.id === selectedCourse.id
        ? { ...c, name: formData.name, code: formData.code, credits: parseInt(formData.credits), capacity: parseInt(formData.capacity) }
        : c
    ));
    setIsEditDialogOpen(false);
    setSelectedCourse(null);
    setFormData({ name: "", code: "", credits: "", capacity: "" });
    toast.success("Course updated successfully");
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    toast.success("Course deleted successfully");
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      code: course.code,
      credits: course.credits.toString(),
      capacity: course.capacity.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const openStudentsDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsStudentsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Admin Portal</h1>
                <p className="text-sm opacity-90">Course Management System</p>
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
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Manage courses and view enrolled students</CardDescription>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Course
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.capacity}</TableCell>
                    <TableCell>{course.enrolled}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openStudentsDialog(course)}
                          className="gap-1"
                        >
                          <Users className="w-4 h-4" />
                          Students
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(course)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Add Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>Enter the details for the new course</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Introduction to Programming"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., CS101"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                  placeholder="e.g., 3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="e.g., 30"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCourse}>Add Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Course Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-code">Course Code</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-credits">Credits</Label>
                <Input
                  id="edit-credits"
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacity">Capacity</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Students Dialog */}
      <Dialog open={isStudentsDialogOpen} onOpenChange={setIsStudentsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enrolled Students</DialogTitle>
            <DialogDescription>
              Students enrolled in {selectedCourse?.name}
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;