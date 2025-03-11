"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author_id: null,
    category_id: null,
    publisher_id: null,
    price: "",
    stock: 0,
    published_date: "",
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [authorsRes, categoriesRes, publishersRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/authors/"),
          fetch("http://127.0.0.1:8000/api/categories/"),
          fetch("http://127.0.0.1:8000/api/publishers/"),
        ]);

        if (!authorsRes.ok || !categoriesRes.ok || !publishersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [authorsData, categoriesData, publishersData] = await Promise.all(
          [authorsRes.json(), categoriesRes.json(), publishersRes.json()]
        );

        setAuthors(authorsData);
        setCategories(categoriesData);
        setPublishers(publishersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author_id ? Number(formData.author_id) : null,
          publisher: formData.publisher_id
            ? Number(formData.publisher_id)
            : null,
          categories: formData.category_id
            ? [Number(formData.category_id)]
            : [],
          price: formData.price,
          stock: formData.stock,
          published_date: formData.published_date,
        }),
      });

      if (response.ok) {
        router.push("/dashboard"); // Redirect to the dashboard after success
      } else {
        const errorData = await response.json();
        console.error("Failed to add book:", errorData);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Book</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Book Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Author Dropdown */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Author
          </label>
          <select
            value={formData.author_id ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                author_id: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <select
            value={formData.category_id ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                category_id: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Publisher Dropdown */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Publisher
          </label>
          <select
            value={formData.publisher_id ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                publisher_id: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Stock
          </label>
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Published Date */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-1">
            Published Date
          </label>
          <input
            type="date"
            value={formData.published_date}
            onChange={(e) =>
              setFormData({ ...formData, published_date: e.target.value })
            }
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
