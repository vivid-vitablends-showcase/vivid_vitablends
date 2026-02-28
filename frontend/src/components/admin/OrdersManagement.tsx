import { Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { TableSkeleton } from "./TableSkeleton";
import { EmptyState } from "./EmptyState";

export const OrdersManagement = () => {
  const { orders, loading } = useAdminOrders();

  if (loading) {
    return <TableSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="Orders will appear here once customers place them"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>
                  {order.address}, {order.city} - {order.pincode}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {order.items.map((item, i) => (
                      <div key={item.id}>
                        {item.name} × {item.quantity}
                        {i < order.items.length - 1 && ", "}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "pending" ? "secondary" : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
