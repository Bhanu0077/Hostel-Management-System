"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { Protected } from "@/components/layout/Protected";
import { getRooms } from "@/services/hostel";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/tables/DataTable";

export default function HostelPage() {
  const rooms = useQuery({ queryKey: ["rooms"], queryFn: getRooms });

  return (
    <Protected>
      <AppShell>
        <section className="page-header">
          <h1 className="page-title">Hostel Management</h1>
          <p className="page-subtitle">Track inventory, occupancy, and room allocation details.</p>
        </section>
        {rooms.isLoading ? <div className="quiet-card h-32 animate-pulse" /> : null}
        {rooms.error ? <div className="quiet-card p-4 text-sm text-red-600">Failed to fetch rooms.</div> : null}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {rooms.data?.map((room) => (
            <div key={room.id} className="quiet-card p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">{room.roomNumber}</p>
                <Badge>{room.status}</Badge>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {room.occupiedBeds}/{room.capacity} beds
              </p>
            </div>
          ))}
        </section>
        <section>
          <h3 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Allocation Table</h3>
          <DataTable
            headers={["Room", "Block", "Type", "Status", "Available beds"]}
            rows={
              rooms.data?.map((r) => [
                r.roomNumber,
                r.blockName,
                r.roomType,
                r.status,
                String(r.availableBeds),
              ]) ?? []
            }
          />
        </section>
      </AppShell>
    </Protected>
  );
}
