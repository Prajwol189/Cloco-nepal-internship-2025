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

interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:4000/books");
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  // Pagination Logic
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col space-y-6 p-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Books Details</h1>
            <p className="text-muted-foreground">Manage your books</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              className="w-full md:max-w-sm"
              placeholder="Search for books"
            />
            <Button>Search</Button>
            <Button
              variant="outline"
              className="border-dashed"
              onClick={() => setOpen(true)}
            >
              Add New Book
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6 bg-slate-100 rounded-lg shadow-sm">
            <TableComp books={currentBooks} />
            <PaginationComp
              totalItems={books.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </SidebarInset>

      <Modal open={open} setOpen={setOpen} onBookAdded={fetchBooks} />
    </SidebarProvider>
  );
}
