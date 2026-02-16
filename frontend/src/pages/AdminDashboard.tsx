import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("adminAuth")) {
      navigate("/sys-admin-portal");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-cream))] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[hsl(var(--primary))]">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-[var(--card-shadow)]">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[hsl(var(--primary))]">0</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-[var(--card-shadow)]">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[hsl(var(--primary))]">0</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-[var(--card-shadow)]">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[hsl(var(--primary))]">0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
