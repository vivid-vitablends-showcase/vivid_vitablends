import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Images } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { galleryApi } from "@/services/api/galleryApi";
import { EmptyState } from "./EmptyState";

export const GalleryManagement = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: galleryApi.getAll,
  });

  const addMutation = useMutation({
    mutationFn: galleryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image added to gallery");
      setTitle("");
      setDisplayOrder("");
      setImagePreview("");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to add image"),
  });

  const deleteMutation = useMutation({
    mutationFn: galleryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image removed from gallery");
      setDeleteId(null);
    },
    onError: (err: Error) =>
      toast.error(err.message || "Failed to delete image"),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!title.trim() || !imagePreview) {
      toast.error("Please provide a title and image");
      return;
    }
    addMutation.mutate({
      title: title.trim(),
      image: imagePreview,
      ...(displayOrder ? { displayOrder: parseInt(displayOrder, 10) } : {}),
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Gallery Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="gallery-title">Title</Label>
              <Input
                id="gallery-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mango Pickle"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gallery-order">Display Order (optional)</Label>
              <Input
                id="gallery-order"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="gallery-image">Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="gallery-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border border-border"
                />
              )}
            </div>
          </div>

          <Button
            onClick={handleAdd}
            disabled={addMutation.isPending}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            {addMutation.isPending ? "Uploading..." : "Add to Gallery"}
          </Button>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <Card>
        <CardHeader>
          <CardTitle>
            Gallery Images{" "}
            {images && (
              <span className="text-sm font-normal text-muted-foreground ml-1">
                ({images.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : !images || images.length === 0 ? (
            <EmptyState
              icon={Images}
              title="No gallery images yet"
              description="Add your first image using the form above"
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-muted"
                >
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex flex-col items-center justify-center gap-2">
                    <p className="text-white text-xs font-medium text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {img.title}
                    </p>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8"
                      onClick={() => setDeleteId(img.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {/* Order badge */}
                  <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    #{img.displayOrder}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Gallery Image</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the image from the gallery. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
