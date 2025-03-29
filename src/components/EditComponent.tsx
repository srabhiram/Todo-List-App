import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TodoType, useAppContext } from '@/app/context/userContext';
import axios from 'axios';
import { Edit3, EditIcon, FileEdit } from 'lucide-react';

const EditComponent = ({ todo }: { todo: TodoType }) => {
  const { fetchTodos } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mentionedUsers: [] as string[],
    priority: "high",
    tags: [] as string[],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    mentionedUsers: "",
    tags: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Prefill form data when opening the edit dialog
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        mentionedUsers: todo.mentionedUsers || [],
        priority: todo.priority || "high",
        tags: todo.tags || [],
      });
    }
  }, [todo]);
console.log(formData.title)
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "tags" || name === "mentionedUsers") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()), // Convert comma-separated values to array
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Clear errors when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle radio button change
  const handlePriorityChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      priority: value, // Priority is now a string
    }));
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      mentionedUsers: "",
      tags: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required!";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required!";
      isValid = false;
    }
    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission (Edit Todo)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.put(`/api/todo/edit`, {formData}, {
        params: {
          todoId: todo._id,
        }
      });
      console.log("Todo Updated:", response.data);
      setIsOpen(false);
      fetchTodos(todo.user); // Refresh todos after edit
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
       <span className='hover:bg-black/10 px-2 py-1 rounded-full'><EditIcon className='w-3'/></span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter todo title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Mention Users */}
          <div>
            <Label htmlFor="mentionedUsers">Mention Users</Label>
            <Input
              id="mentionedUsers"
              name="mentionedUsers"
              type="text"
              placeholder="Enter users (comma-separated)"
              value={formData.mentionedUsers.join(", ")}
              onChange={handleInputChange}
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              type="text"
              placeholder="Enter tags (comma-separated)"
              value={formData.tags.join(", ")}
              onChange={handleInputChange}
              className={errors.tags ? "border-red-500" : ""}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <Label>Priority</Label>
            <RadioGroup
              value={formData.priority}
              onValueChange={handlePriorityChange}
              className="flex"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Updating..." : "Update Todo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditComponent;
