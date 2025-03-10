"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onBookAdded: () => void; // Callback to refresh books in Page.tsx
}

export default function Modal({ open, setOpen, onBookAdded }: ModalProps) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  async function handleSave() {
    if (!name || !author || !price) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, author, price }),
      });

      if (!response.ok) throw new Error("Failed to add book");

      setName("");
      setAuthor("");
      setPrice("");
      setOpen(false); // Close modal after saving
      onBookAdded(); // Refresh books in the table
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>Enter book details below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Book Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
