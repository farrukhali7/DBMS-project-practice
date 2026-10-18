
import PageHeader from "@/components/PageHeader";

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <PageHeader
        title="Appointment Management"
        description="Schedule and manage veterinary visits."
      />

      <div className="rounded-xl bg-white p-6 shadow-sm">
        Appointment scheduling will be built here.
      </div>
    </main>
  );
}