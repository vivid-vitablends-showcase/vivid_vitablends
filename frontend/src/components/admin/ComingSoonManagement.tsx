import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  getComingSoonProducts,
  addOrRemoveComingSoon,
} from "@/services/api/comingSoonApi";
import { Skeleton } from "@/components/ui/skeleton";

export const ComingSoonManagement = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["comingSoon"],
    queryFn: getComingSoonProducts,
  });

  const addMutation = useMutation({
    mutationFn: addOrRemoveComingSoon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comingSoon"] });
      toast.success("Product added successfully");
      setName("");
      setImagePreview("");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add product");
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => addOrRemoveComingSoon({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comingSoon"] });
      toast.success("Product removed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove product");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    if (!name || !imagePreview) {
      toast.error("Please provide name and image");
      return;
    }
    addMutation.mutate({ name, image: imagePreview });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Coming Soon Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label htmlFor="image">Product Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
            </div>
          </div>
          <Button
            onClick={handleAdd}
            disabled={addMutation.isPending}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            {addMutation.isPending ? "Adding..." : "Add Product"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Coming Soon Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative group border rounded-lg overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMutation.mutate(product.id)}
                    disabled={removeMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No coming soon products yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
