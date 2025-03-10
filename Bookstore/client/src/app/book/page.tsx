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
  title: string;
  author: string;
  publisher: string; // You can either store the name of the publisher or an ID depending on your API response
  categories: string[]; // Array of category names or IDs
  price: string;
  stock: number; // Stock count
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
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "publisher", label: "Publisher" }, // New field
    { key: "categories", label: "Categories" }, // New field
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" }, // New field
  ];

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
        method: "DELETE",
      });
      fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (book: Book) => {
    // Implement the logic for editing the book (e.g., open a modal)
    console.log("Editing:", book);
  };

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
            <TableComp
              data={currentBooks}
              columns={columns}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
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
