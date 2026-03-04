import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { categoryApi } from "@/services/api/productApi";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CategoryManagement = () => {
  const { categories, loading } = useCategories();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleToggleHomepage = async (
    categoryId: string,
    currentValue: boolean,
    displayOrder: number
  ) => {
    setUpdating(categoryId);
    try {
      await categoryApi.updateHomepageVisibility(
        categoryId,
        !currentValue,
        displayOrder
      );
      toast.success("Category visibility updated");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setUpdating(null);
    }
  };

  const handleDisplayOrderChange = async (
    categoryId: string,
    showOnHome: boolean,
    newOrder: number
  ) => {
    setUpdating(categoryId);
    try {
      await categoryApi.updateHomepageVisibility(
        categoryId,
        showOnHome,
        newOrder
      );
      toast.success("Display order updated");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update display order");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
        <CardDescription>
          Manage which categories appear on the homepage and their display order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex-1">
                <h3 className="font-semibold capitalize">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`order-${category.id}`} className="text-sm">
                    Order:
                  </Label>
                  <Input
                    id={`order-${category.id}`}
                    type="number"
                    min="0"
                    value={category.displayOrder}
                    onChange={(e) =>
                      handleDisplayOrderChange(
                        category.id,
                        category.showOnHome,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-20"
                    disabled={updating === category.id}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Label htmlFor={`show-${category.id}`} className="text-sm">
                    Show on Homepage:
                  </Label>
                  <Switch
                    id={`show-${category.id}`}
                    checked={category.showOnHome}
                    onCheckedChange={() =>
                      handleToggleHomepage(
                        category.id,
                        category.showOnHome,
                        category.displayOrder
                      )
                    }
                    disabled={updating === category.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManagement;
