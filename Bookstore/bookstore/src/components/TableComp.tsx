import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react"; // Use horizontal dots instead

// Icon for 3 dots

interface Book {
  id: string;
  name: string;
  author: string;
  price: string;
}

interface TableProps {
  books: Book[];
}

export default function TableComp({ books }: TableProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    console.log("Editing:", book);
    // Open edit modal here
  };

  const handleDelete = (id: string) => {
    console.log("Deleting book with ID:", id);
    // Add API call to delete the book
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Author</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell className="font-medium">{book.id}</TableCell>
            <TableCell>{book.name}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell className="text-right">{book.price}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(book)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(book.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-medium text-center">
            Showing {books.length} books
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
