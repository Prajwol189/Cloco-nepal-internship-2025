"use client"; // Add this at the top of the file

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TableComp from "@/components/TableComp";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import PaginationComp from "@/components/pagination"; // Import the pagination component

interface Author {
  id: number;
  name: string;
  genre: string;
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAuthors();
  }, []);

  async function fetchAuthors() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/authors/");
      const data: Author[] = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "bio", label: "Bio" },
  ];

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/authors/${id}/`, {
        method: "DELETE",
      });
      fetchAuthors(); // Refresh the authors list after deletion
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const handleEdit = (author: Author) => {
    // Implement the logic for editing the author (e.g., open a modal)
    console.log("Editing:", author);
  };

  // Pagination Logic
  const indexOfLastAuthor = currentPage * itemsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - itemsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col space-y-6 p-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Authors Details
            </h1>
            <p className="text-muted-foreground">Manage your authors</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              className="w-full md:max-w-sm"
              placeholder="Search for authors"
            />
            <Button>Search</Button>
            <Button
              variant="outline"
              className="border-dashed"
              onClick={() => setOpen(true)}
            >
              Add New Author
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6 bg-slate-100 rounded-lg shadow-sm">
            <TableComp
              data={currentAuthors}
              columns={columns}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <PaginationComp
              totalItems={authors.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
