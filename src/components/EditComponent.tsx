import React, { useState, useEffect } from "react";
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
import { TodoType, useAppContext } from "@/app/context/userContext";
import axios from "axios";
import { FaEdit, FaSave, FaSpinner, FaUserPlus, FaTags } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditComponent = ({ todo }: { todo: TodoType }) => {

  const { fetchTodos, userData } = useAppContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    note: [] as string[],
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

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        note: todo.note || [],
        mentionedUsers: todo.mentionedUsers || [],
        priority: todo.priority || "high",
        tags: todo.tags || [],
      });
    }
  }, [todo]);

  const availableUsers = userData?.map((user) => user.displayname) || [];

  // Handle input change 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "tags" || name === "note") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle mentioned users change
  const handleMentionedUsersChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      mentionedUsers: prevData.mentionedUsers.includes(value)
        ? prevData.mentionedUsers.filter((user) => user !== value)
        : [...prevData.mentionedUsers, value],
    }));
  };

  // Handle radio button change
  const handlePriorityChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      priority: value,
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `/api/todo/edit`,
        { formData },
        {
          params: {
            todoId: todo._id,
          },
        }
      );
      console.log("Todo Updated:", response.data);
      setIsOpen(false);
      fetchTodos(todo.user);
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
          <FaEdit className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaEdit className="text-indigo-600" /> Edit Todo
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter todo title"
              value={formData.title}
              onChange={handleInputChange}
              className={`mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-red-500 text-xs">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
              className={`mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <Label htmlFor="note" className="text-sm font-medium text-gray-700">
              Note
            </Label>
            <Input
              id="note"
              name="note"
              type="text"
              placeholder="Enter notes (comma-separated)"
              value={formData.note.join(", ")}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Mention Users */}
          <div>
            <Label htmlFor="mentionedUsers" className="text-sm font-medium text-gray-700">
              Mention Users
            </Label>
            <Select onValueChange={handleMentionedUsersChange}>
              <SelectTrigger className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <div className="flex items-center gap-2">
                  <FaUserPlus className="text-gray-500" />
                  <SelectValue placeholder="Select users to mention" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto">
                {availableUsers.length > 0 ? (
                  availableUsers.map((user) => (
                    <SelectItem
                      key={user}
                      value={user}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"
                    >
                      {formData.mentionedUsers.includes(user) ? "✓ " : ""} {user}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500">No users available</div>
                )}
              </SelectContent>
            </Select>
            {formData.mentionedUsers.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.mentionedUsers.map((user) => (
                  <span
                    key={user}
                    className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {user}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaTags className="text-gray-500" /> Tags
            </Label>
            <Input
              id="tags"
              name="tags"
              type="text"
              placeholder="Enter tags (comma-separated)"
              value={formData.tags.join(", ")}
              onChange={handleInputChange}
              className={`mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.tags ? "border-red-500" : ""
              }`}
            />
            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {"#"}{tag}
                  </span>
                ))}
              </div>
            )}
            {errors.tags && (
              <p className="mt-1 text-red-500 text-xs">{errors.tags}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Priority</Label>
            <RadioGroup
              value={formData.priority}
              onValueChange={handlePriorityChange}
              className="mt-2 flex gap-4"
            >
              {["high", "medium", "low"].map((priority) => (
                <div key={priority} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={priority}
                    id={priority}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <Label
                    htmlFor={priority}
                    className="text-sm font-medium text-gray-600 capitalize hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {priority}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 flex items-center justify-center gap-2 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Updating...
              </>
            ) : (
              <>
                <FaSave /> Update Todo
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditComponent;